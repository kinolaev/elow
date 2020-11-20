import { F0, F1 } from "./Basics"
import { identity, compose2 } from "./Basics"

export type Maybe<A> = null | A
export const Nothing: Maybe<any> = null
export const Just = <A>(a: A): Maybe<A> => a

type Cases<A, R> = { Nothing: F0<R>; Just: F1<A, R> }
export const match = <A, R>(v: Maybe<A>, c: Cases<A, R>): R =>
  v === null ? c.Nothing() : c.Just(v)

export const caseOf = <A, R>(c: Cases<A, R>): F1<Maybe<A>, R> => (v) =>
  match(v, c)

export const nothingThunk = (): Maybe<any> => Nothing

export const withDefault = <A>(fallback: A, v: Maybe<A>): A =>
  match(v, { Nothing: () => fallback, Just: identity })

export const map = <A, B>(f: F1<A, B>, v: Maybe<A>): Maybe<B> =>
  match(v, { Nothing: nothingThunk, Just: compose2(Just, f) })

export const andThen = <A, B>(f: F1<A, Maybe<B>>, v: Maybe<A>): Maybe<B> =>
  match(v, { Nothing: nothingThunk, Just: f })

export default {
  Nothing,
  Just,
  match,
  caseOf,
  nothingThunk,
  withDefault,
  map,
  andThen,
}
