// @flow
import type { F1 } from "../../Basics"
import { pipe, identity } from "../../Basics"
import result from "../../Result"
import type { Decoder, Value } from "../Decode"
import * as Decode from "../Decode"

type Pipeline<A, B> = F1<Decoder<F1<A, B>>, Decoder<B>>

export const required = <A, B>(
  key: string,
  valDecoder: Decoder<A>
): Pipeline<A, B> => decoder => custom(Decode.field(key, valDecoder), decoder)

export const requiredAt = <A, B>(
  path: Array<string>,
  valDecoder: Decoder<A>
): Pipeline<A, B> => decoder => custom(Decode.at(path, valDecoder), decoder)

export const optional = <A, B>(
  key: string,
  valDecoder: Decoder<A>,
  fallback: A
): Pipeline<A, B> => decoder =>
  custom(
    Decode.oneOf(Decode.field(key, valDecoder), Decode.succeed(fallback)),
    decoder
  )

export const optionalAt = <A, B>(
  path: Array<string>,
  valDecoder: Decoder<A>,
  fallback: A
): Pipeline<A, B> => decoder =>
  custom(
    Decode.oneOf(Decode.at(path, valDecoder), Decode.succeed(fallback)),
    decoder
  )

export const hardcoded = <A, B>(a: A): Pipeline<A, B> => decoder =>
  custom(Decode.succeed(a), decoder)

export const custom = <A, B>(
  decoderA: Decoder<A>,
  decoderAB: Decoder<F1<A, B>>
): Decoder<B> => Decode.map2(pipe, decoderA, decoderAB)

export const resolve = <A>(decoder: Decoder<Decoder<A>>): Decoder<A> =>
  Decode.andThen(identity, decoder)

export const decode = Decode.succeed
