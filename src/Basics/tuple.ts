import type { Args } from "./function"

export const tuple = <A extends Args>(...args: A): A => args

/** @deprecated */
export const tuple0 = []
/** @deprecated */
export const tuple1: <A>(a: A) => [A] = tuple
/** @deprecated */
export const tuple2: <A, B>(a: A, b: B) => [A, B] = tuple
/** @deprecated */
export const tuple3: <A, B, C>(a: A, b: B, c: C) => [A, B, C] = tuple
/** @deprecated */
export const tuple4: <A, B, C, D>(
  a: A,
  b: B,
  c: C,
  d: D
) => [A, B, C, D] = tuple
/** @deprecated */
export const tuple5: <A, B, C, D, E>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E
) => [A, B, C, D, E] = tuple
/** @deprecated */
export const tuple6: <A, B, C, D, E, F>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F
) => [A, B, C, D, E, F] = tuple
/** @deprecated */
export const tuple7: <A, B, C, D, E, F, G>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G
) => [A, B, C, D, E, F, G] = tuple
/** @deprecated */
export const tuple8: <A, B, C, D, E, F, G, H>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H
) => [A, B, C, D, E, F, G, H] = tuple
