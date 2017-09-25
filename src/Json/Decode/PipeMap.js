// @flow
import type { F1, F2, F3, F4, F5, F6, F7, F8 } from "../../Basics"
import result, { ERR, OK, err, ok } from "../../Result"
import type { Value, Decoder, Decoded } from "../Decode"

const pipeHelper = (args: Array<any>, value: Value): Decoded<any> => {
  let i = args.length - 1
  const f: Function = args[i]
  const params = new Array(i)
  while (i--) {
    const decoded = args[i](value)
    if (decoded.type === ERR) {
      return decoded
    }
    params[i] = decoded.data[0]
  }
  return ok(f(...params))
}

const pipeN = (...args: Array<any>): Decoder<any> => value =>
  result.match(pipeHelper(args, value), {
    err: err,
    ok: decoder => decoder(value)
  })

export const pipe: <A, R>(
  dA: Decoder<A>,
  f1: F1<A, Decoder<R>>
) => Decoder<R> = pipeN
export const pipe2: <A, B, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  f2: F2<A, B, Decoder<R>>
) => Decoder<R> = pipeN
export const pipe3: <A, B, C, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  f3: F3<A, B, C, Decoder<R>>
) => Decoder<R> = pipeN
export const pipe4: <A, B, C, D, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  f4: F4<A, B, C, D, Decoder<R>>
) => Decoder<R> = pipeN
export const pipe5: <A, B, C, D, E, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  f5: F5<A, B, C, D, E, Decoder<R>>
) => Decoder<R> = pipeN
export const pipe6: <A, B, C, D, E, F, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  f6: F6<A, B, C, D, E, F, Decoder<R>>
) => Decoder<R> = pipeN
export const pipe7: <A, B, C, D, E, F, G, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  dG: Decoder<G>,
  f7: F7<A, B, C, D, E, F, G, Decoder<R>>
) => Decoder<R> = pipeN
export const pipe8: <A, B, C, D, E, F, G, H, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  dG: Decoder<G>,
  dH: Decoder<H>,
  f8: F8<A, B, C, D, E, F, G, H, Decoder<R>>
) => Decoder<R> = pipeN

const pipeMapN = (...args: Array<any>): Decoder<any> => value =>
  pipeHelper(args, value)

export const pipeMap: <A, R>(
  dA: Decoder<A>,
  f1: F1<A, R>
) => Decoder<R> = pipeMapN
export const pipeMap2: <A, B, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  f2: F2<A, B, R>
) => Decoder<R> = pipeMapN
export const pipeMap3: <A, B, C, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  f3: F3<A, B, C, R>
) => Decoder<R> = pipeMapN
export const pipeMap4: <A, B, C, D, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  f4: F4<A, B, C, D, R>
) => Decoder<R> = pipeMapN
export const pipeMap5: <A, B, C, D, E, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  f5: F5<A, B, C, D, E, R>
) => Decoder<R> = pipeMapN
export const pipeMap6: <A, B, C, D, E, F, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  f6: F6<A, B, C, D, E, F, R>
) => Decoder<R> = pipeMapN
export const pipeMap7: <A, B, C, D, E, F, G, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  dG: Decoder<G>,
  f7: F7<A, B, C, D, E, F, G, R>
) => Decoder<R> = pipeMapN
export const pipeMap8: <A, B, C, D, E, F, G, H, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  dG: Decoder<G>,
  dH: Decoder<H>,
  f8: F8<A, B, C, D, E, F, G, H, R>
) => Decoder<R> = pipeMapN
