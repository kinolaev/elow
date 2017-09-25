// @flow
import type { F1 } from "../../Basics"
import {
  compose2,
  compose3,
  compose4,
  compose5,
  compose6,
  compose7,
  compose8
} from "../../Basics"
import result, { err, ok } from "../../Result"
import type { Decoder } from "../Decode"
import { succeed } from "../Decode"

export const flowMap = <A, B, C>(
  f: A => B,
  flowed: F1<Decoder<F1<A, B>>, Decoder<C>>
): Decoder<C> => flowed(succeed(f))

export const flow = <A, R>(
  dA: Decoder<A>
): F1<Decoder<F1<A, R>>, Decoder<R>> => decoder => value =>
  result.match(decoder(value), {
    err: err,
    ok: f1 =>
      result.match(dA(value), {
        err: err,
        ok: a => ok(f1(a))
      })
  })

export const flow2 = <A, L, R>(
  dA: Decoder<A>,
  others: F1<Decoder<L>, Decoder<R>>
): F1<Decoder<F1<A, L>>, Decoder<R>> => compose2(others, flow(dA))

export const flow3 = <A, B, L, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  others: F1<Decoder<L>, Decoder<R>>
): F1<Decoder<F1<A, F1<B, L>>>, Decoder<R>> =>
  compose3(others, flow(dB), flow(dA))

export const flow4 = <A, B, C, L, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  others: F1<Decoder<L>, Decoder<R>>
): F1<Decoder<F1<A, F1<B, F1<C, L>>>>, Decoder<R>> =>
  compose4(others, flow(dC), flow(dB), flow(dA))

export const flow5 = <A, B, C, D, L, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  others: F1<Decoder<L>, Decoder<R>>
): F1<Decoder<F1<A, F1<B, F1<C, F1<D, L>>>>>, Decoder<R>> =>
  compose5(others, flow(dD), flow(dC), flow(dB), flow(dA))

export const flow6 = <A, B, C, D, E, L, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  others: F1<Decoder<L>, Decoder<R>>
): F1<Decoder<F1<A, F1<B, F1<C, F1<D, F1<E, L>>>>>>, Decoder<R>> =>
  compose6(others, flow(dE), flow(dD), flow(dC), flow(dB), flow(dA))

export const flow7 = <A, B, C, D, E, F, L, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  others: F1<Decoder<L>, Decoder<R>>
): F1<Decoder<F1<A, F1<B, F1<C, F1<D, F1<E, F1<F, L>>>>>>>, Decoder<R>> =>
  compose7(others, flow(dF), flow(dE), flow(dD), flow(dC), flow(dB), flow(dA))

export const flow8 = <A, B, C, D, E, F, G, L, R>(
  dA: Decoder<A>,
  dB: Decoder<B>,
  dC: Decoder<C>,
  dD: Decoder<D>,
  dE: Decoder<E>,
  dF: Decoder<F>,
  dG: Decoder<G>,
  others: F1<Decoder<L>, Decoder<R>>
): F1<
  Decoder<F1<A, F1<B, F1<C, F1<D, F1<E, F1<F, F1<G, L>>>>>>>>,
  Decoder<R>
> =>
  compose8(
    others,
    flow(dG),
    flow(dF),
    flow(dE),
    flow(dD),
    flow(dC),
    flow(dB),
    flow(dA)
  )
