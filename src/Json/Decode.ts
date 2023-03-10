import { Args, F1, F2, F3, F4, F5, F6, F7, F8, tuple } from "../Basics"
import { Maybe } from "../Maybe"
import { Nothing, Just } from "../Maybe"
import { Result } from "../Result"
import result, { ERR, OK, Err, Ok } from "../Result"

export type Value =
  | null
  | boolean
  | number
  | string
  | Array<Value>
  | { [key: string]: Value }

export type Decoder<A> = (value: Value) => Decoded<A>
export type Decoded<A> = Result<DecodeError, A>

export type DecodeError = {
  path: Array<string>
  expected: string
  value: Value
  message: string
}
const DecodeError = (
  expected: string,
  value: Value,
  path: Array<string>,
  message: string
): DecodeError => ({ expected, value, path, message })

const addDecodeErrorPath = (
  path: Array<string>,
  error: DecodeError
): DecodeError => ({ ...error, path: path.concat(error.path) })

const getErrorMessage = (error: DecodeError): string =>
  error.message ||
  `expected: ${error.expected}, actual: ${stringify(error.value)}`

const stringify = (value: Value) =>
  typeof value === "string" ? '"' + value + '"' : JSON.stringify(value)

const isJsonObject = (value: Value): value is { [key: string]: Value } =>
  typeof value === "object" && value !== null

export const string: Decoder<string> = (value) =>
  typeof value === "string"
    ? Ok(value)
    : Err(DecodeError("string", value, [], ""))

export const boolean: Decoder<boolean> = (value) =>
  typeof value === "boolean"
    ? Ok(value)
    : Err(DecodeError("boolean", value, [], ""))

export const number: Decoder<number> = (value) =>
  typeof value === "number"
    ? Ok(value)
    : Err(DecodeError("number", value, [], ""))

export const date: Decoder<Date> = (value) =>
  value instanceof Date ? Ok(value) : Err(DecodeError("date", value, [], ""))

export const nullable = <A>(decoder: Decoder<A>): Decoder<Maybe<A>> => (
  value
) =>
  value === null || value === undefined
    ? Ok(Nothing)
    : result.match(decoder(value), {
        Err: Err,
        Ok: (value) => Ok(Just(value)),
      })

export const list = <A>(decoder: Decoder<A>): Decoder<Array<A>> => (value) => {
  if (Array.isArray(value)) {
    let i = value.length
    const result: Array<A> = new Array(i)
    while (i--) {
      const decoded = decoder(value[i])
      if (decoded.type === ERR) {
        return Err(addDecodeErrorPath([String(i)], decoded.data[0]))
      }
      result[i] = decoded.data[0]
    }
    return Ok(result)
  }
  return Err(DecodeError("array", value, [], ""))
}

export const dict = <A>(decoder: Decoder<A>): Decoder<{ [key: string]: A }> => (
  value
) => {
  if (isJsonObject(value)) {
    const keys = Object.keys(value)
    let i = keys.length
    const result: { [key: string]: A } = {}
    while (i--) {
      const key = keys[i]
      const decoded = decoder(value[key])
      if (decoded.type === ERR) {
        return Err(addDecodeErrorPath([key], decoded.data[0]))
      }
      result[key] = decoded.data[0]
    }
    return Ok(result)
  }
  return Err(DecodeError("object", value, [], ""))
}

export const keyValuePairs = <A>(
  decoder: Decoder<A>
): Decoder<Array<[string, A]>> => (value) => {
  if (isJsonObject(value)) {
    const keys = Object.keys(value)
    let i = keys.length
    const result = new Array(i)
    while (i--) {
      const key = keys[i]
      const decoded = decoder(value[key])
      if (decoded.type === ERR) {
        return Err(addDecodeErrorPath([key], decoded.data[0]))
      }
      result[i] = [key, decoded.data[0]]
    }
    return Ok(result)
  }
  return Err(DecodeError("object", value, [], ""))
}

export const field = <A>(key: string, decoder: Decoder<A>): Decoder<A> => (
  value
) =>
  isJsonObject(value) && value.hasOwnProperty(key)
    ? result.match(decoder(value[key]), {
        Err: (error) => Err(addDecodeErrorPath([key], error)),
        Ok: (value) => Ok(value),
      })
    : Err(DecodeError("object." + key, value, [], ""))

export const at = <A>(path: Array<string>, decoder: Decoder<A>): Decoder<A> => (
  obj
) => {
  const prevPath: Array<string> = []
  let value = obj
  for (let i = 0, l = path.length; i < l; i++) {
    let key = path[i]
    if (isJsonObject(value) && value.hasOwnProperty(key)) {
      prevPath.push(key)
      value = value[key]
    } else {
      return Err(DecodeError("object." + key, value, prevPath, ""))
    }
  }
  return result.match(decoder(value), {
    Err: (error) => Err(addDecodeErrorPath(prevPath, error)),
    Ok: (value) => Ok(value),
  })
}

export const index = <A>(i: number, decoder: Decoder<A>): Decoder<A> => (
  value
) =>
  Array.isArray(value) && i < value.length
    ? result.match(decoder(value[i]), {
        Err: (error) => Err(addDecodeErrorPath([String(i)], error)),
        Ok: (value) => Ok(value),
      })
    : Err(DecodeError("array[" + String(i) + "]", value, [], ""))

export const maybe = <A>(decoder: Decoder<A>): Decoder<Maybe<A>> => (value) =>
  result.match(decoder(value), {
    Err: (_) => Ok(Nothing),
    Ok: (value) => Ok(Just(value)),
  })

export const oneOf = <A>(...decoders: Array<Decoder<A>>): Decoder<A> => (
  value
) => {
  let lastDecodeError = DecodeError("Value", value, [], "no one")
  for (let i = 0, l = decoders.length; i < l; i++) {
    const decoded = decoders[i](value)
    if (decoded.type === OK) {
      return decoded
    }
    lastDecodeError = decoded.data[0]
  }
  return Err(lastDecodeError)
}

export const decodeValue = <A>(value: Value, decoder: Decoder<A>): Decoded<A> =>
  decoder(value)

export const decodeString = <A>(
  json: string,
  decoder: Decoder<A>
): Decoded<A> =>
  result.match(parse(json), {
    Err: (error) => Err(DecodeError("Value", json, [], error)),
    Ok: (value) => decodeValue(value, decoder),
  })

export const decodeErrorToString = (error: DecodeError): string =>
  `[${error.path.join(".")}] ${getErrorMessage(error)}`

export const parse = (json: string): Result<string, Value> => {
  try {
    return Ok(JSON.parse(json))
  } catch (e) {
    return Err(e.message)
  }
}

export const map = <A extends Args, R>(
  f: (...args: A) => R,
  ...decoders: { [I in keyof A]: Decoder<A[I]> }
): Decoder<R> => (value) => {
  const l = decoders.length
  const args = new Array<unknown>(l)
  for (let i = 0; i < l; i++) {
    const decoded = decoders[i](value)
    if (decoded.type === ERR) {
      return decoded
    }
    args[i] = decoded.data[0]
  }
  // @ts-ignore
  return Ok(f(...args))
}

export const mapR = <A, R>(dA: Decoder<A>, f: F1<A, R>): Decoder<R> =>
  map(f, dA)

/** @deprecated */
export const map2: <A, B, R>(
  f2: F2<A, B, R>,
  dA: Decoder<A>,
  dB: Decoder<B>
) => Decoder<R> = map
/** @deprecated */
export const map3: <A, B, C, R>(
  f3: F3<A, B, C, R>,
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>
) => Decoder<R> = map
/** @deprecated */
export const map4: <A, B, C, D, R>(
  f4: F4<A, B, C, D, R>,
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>
) => Decoder<R> = map
/** @deprecated */
export const map5: <A, B, C, D, E, R>(
  f5: F5<A, B, C, D, E, R>,
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>
) => Decoder<R> = map
/** @deprecated */
export const map6: <A, B, C, D, E, F, R>(
  f6: F6<A, B, C, D, E, F, R>,
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>
) => Decoder<R> = map
/** @deprecated */
export const map7: <A, B, C, D, E, F, G, R>(
  f7: F7<A, B, C, D, E, F, G, R>,
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  dG: Decoder<G>
) => Decoder<R> = map
/** @deprecated */
export const map8: <A, B, C, D, E, F, G, H, R>(
  f8: F8<A, B, C, D, E, F, G, H, R>,
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  dG: Decoder<G>,
  dH: Decoder<H>
) => Decoder<R> = map

export const lazy = <A>(thunk: () => Decoder<A>): Decoder<A> =>
  andThen(thunk, succeed(undefined))

export const value: Decoder<Value> = (value) => Ok(value)

export const null_ = <A>(okValue: A): Decoder<A> => (value) =>
  value === null || value === undefined
    ? Ok(okValue)
    : Err(DecodeError("null", value, [], ""))

export const succeed = <A>(value: A): Decoder<A> => (_) => Ok(value)

export const fail = <A>(message: string): Decoder<A> => (value) =>
  Err(DecodeError("", value, [], message))

export const andThen = <A, B>(
  f: F1<A, Decoder<B>>,
  decoder: Decoder<A>
): Decoder<B> => (value) =>
  result.match(decoder(value), {
    Err: (error) => Err(error),
    Ok: (data) => f(data)(value),
  })

/** @deprecated */
export const mapTuple = <A extends Args>(
  ...decoders: { [I in keyof A]: Decoder<A[I]> }
): Decoder<A> => map<A, A>(tuple, ...decoders)
/** @deprecated */
export const mapTuple2: <A, B>(
  dA: Decoder<A>,
  dB: Decoder<B>
) => Decoder<[A, B]> = mapTuple
/** @deprecated */
export const mapTuple3: <A, B, C>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>
) => Decoder<[A, B, C]> = mapTuple
/** @deprecated */
export const mapTuple4: <A, B, C, D>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>
) => Decoder<[A, B, C, D]> = mapTuple
/** @deprecated */
export const mapTuple5: <A, B, C, D, E>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>
) => Decoder<[A, B, C, D, E]> = mapTuple
/** @deprecated */
export const mapTuple6: <A, B, C, D, E, F>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>
) => Decoder<[A, B, C, D, E, F]> = mapTuple
/** @deprecated */
export const mapTuple7: <A, B, C, D, E, F, G>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  dG: Decoder<G>
) => Decoder<[A, B, C, D, E, F, G]> = mapTuple
/** @deprecated */
export const mapTuple8: <A, B, C, D, E, F, G, H>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  dG: Decoder<G>,
  dH: Decoder<H>
) => Decoder<[A, B, C, D, E, F, G, H]> = mapTuple

export type Transformer<A, B> = F1<A, Result<string, B>>
export type Validator<A> = Transformer<A, A>

export const transform = <A, R>(
  decoder: Decoder<A>,
  tA: Transformer<A, R>
): Decoder<R> => transformN(decoder, [tA])

export const transform2 = <A, B, R>(
  decoder: Decoder<A>,
  tA: Transformer<A, B>,
  tB: Transformer<B, R>
): Decoder<R> => transformN(decoder, [tA, tB])

export const transform3 = <A, B, C, R>(
  decoder: Decoder<A>,
  tA: Transformer<A, B>,
  tB: Transformer<B, C>,
  tC: Transformer<C, R>
): Decoder<R> => transformN(decoder, [tA, tB, tC])

export const transform4 = <A, B, C, D, R>(
  decoder: Decoder<A>,
  tA: Transformer<A, B>,
  tB: Transformer<B, C>,
  tC: Transformer<C, D>,
  tD: Transformer<D, R>
): Decoder<R> => transformN(decoder, [tA, tB, tC, tD])

export const transform5 = <A, B, C, D, E, R>(
  decoder: Decoder<A>,
  tA: Transformer<A, B>,
  tB: Transformer<B, C>,
  tC: Transformer<C, D>,
  tD: Transformer<D, E>,
  tE: Transformer<E, R>
): Decoder<R> => transformN(decoder, [tA, tB, tC, tD, tE])

export const transform6 = <A, B, C, D, E, F, R>(
  decoder: Decoder<A>,
  tA: Transformer<A, B>,
  tB: Transformer<B, C>,
  tC: Transformer<C, D>,
  tD: Transformer<D, E>,
  tE: Transformer<E, F>,
  tF: Transformer<F, R>
): Decoder<R> => transformN(decoder, [tA, tB, tC, tD, tE, tF])

export const transform7 = <A, B, C, D, E, F, G, R>(
  decoder: Decoder<A>,
  tA: Transformer<A, B>,
  tB: Transformer<B, C>,
  tC: Transformer<C, D>,
  tD: Transformer<D, E>,
  tE: Transformer<E, F>,
  tF: Transformer<F, G>,
  tG: Transformer<G, R>
): Decoder<R> => transformN(decoder, [tA, tB, tC, tD, tE, tF, tG])

export const transform8 = <A, B, C, D, E, F, G, H, R>(
  decoder: Decoder<A>,
  tA: Transformer<A, B>,
  tB: Transformer<B, C>,
  tC: Transformer<C, D>,
  tD: Transformer<D, E>,
  tE: Transformer<E, F>,
  tF: Transformer<F, G>,
  tG: Transformer<G, H>,
  tH: Transformer<H, R>
): Decoder<R> => transformN(decoder, [tA, tB, tC, tD, tE, tF, tG, tH])

const transformN = (
  decoder: Decoder<any>,
  transformers: Array<Transformer<any, any>>
): Decoder<any> =>
  andThen((value: any) => transformHelp(transformers, value), decoder)

const transformHelp = (
  transformers: Array<Transformer<any, any>>,
  value: any
): Decoder<any> =>
  transformers.length === 0
    ? succeed(value)
    : result.match(transformers[0](value), {
        Err: (message) => fail(message),
        Ok: (value) => transformHelp(transformers.slice(1), value),
      })

export const validate = <A>(
  decoder: Decoder<A>,
  ...validators: Array<Validator<A>>
): Decoder<A> => transformN(decoder, validators)

export default {
  string,
  boolean,
  number,
  nullable,
  list,
  dict,
  keyValuePairs,
  field,
  at,
  index,
  maybe,
  oneOf,
  parse,
  decodeString,
  decodeValue,
  decodeErrorToString,
  map,
  map2,
  map3,
  map4,
  map5,
  map6,
  map7,
  map8,
  mapTuple,
  mapTuple2,
  mapTuple3,
  mapTuple4,
  mapTuple5,
  mapTuple6,
  mapTuple7,
  mapTuple8,
  lazy,
  value,
  null_,
  succeed,
  fail,
  andThen,
  transform,
  transform2,
  transform3,
  transform4,
  transform5,
  transform6,
  transform7,
  transform8,
  validate,
}
