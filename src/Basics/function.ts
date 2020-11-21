export type Args = ReadonlyArray<unknown>

export type F0<R> = () => R
export type F1<A, R> = (a: A) => R
export type F2<A, B, R> = (a: A, b: B) => R
export type F3<A, B, C, R> = (a: A, b: B, c: C) => R
export type F4<A, B, C, D, R> = (a: A, b: B, c: C, d: D) => R
export type F5<A, B, C, D, E, R> = (a: A, b: B, c: C, d: D, e: E) => R
export type F6<A, B, C, D, E, F, R> = (a: A, b: B, c: C, d: D, e: E, f: F) => R
export type F7<A, B, C, D, E, F, G, R> = (
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G
) => R
export type F8<A, B, C, D, E, F, G, H, R> = (
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H
) => R
export type F9<A, B, C, D, E, F, G, H, I, R> = (
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I
) => R

export const a = <A extends Args, B extends Args, R>(
  fn: (...args: [...A, ...B]) => R,
  ...head: A
): ((...tail: B) => R) => (...tail) => fn(...head, ...tail)

export const a1: <A, Rest extends Args, R>(
  fn: (a: A, ...rest: Rest) => R,
  a: A
) => (...args: Rest) => R = a

export const a2: <A, B, Rest extends Args, R>(
  fn: (a: A, b: B, ...rest: Rest) => R,
  a: A,
  b: B
) => (...args: Rest) => R = a

export const a3: <A, B, C, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, ...rest: Rest) => R,
  a: A,
  b: B,
  c: C
) => (...args: Rest) => R = a

export const a4: <A, B, C, D, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, ...rest: Rest) => R,
  a: A,
  b: B,
  c: C,
  d: D
) => (...args: Rest) => R = a

export const a5: <A, B, C, D, E, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, ...rest: Rest) => R,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E
) => (...args: Rest) => R = a

export const a6: <A, B, C, D, E, F, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, ...rest: Rest) => R,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F
) => (...args: Rest) => R = a

export const a7: <A, B, C, D, E, F, G, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, ...rest: Rest) => R,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G
) => (...args: Rest) => R = a

export const a8: <A, B, C, D, E, F, G, H, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, ...rest: Rest) => R,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H
) => (...args: Rest) => R = a

export const a9: <A, B, C, D, E, F, G, H, I, Rest extends Args, R>(
  fn: (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i: I,
    ...rest: Rest
  ) => R,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I
) => (...args: Rest) => R = a

export const f = <A extends Args, B extends Args, R>(
  fn: (...args: [...A, ...B]) => R
): ((...head: A) => (...tail: B) => R) => (...head) => a(fn, ...head)

export const f1: <A, Rest extends Args, R>(
  fn: (a: A, ...rest: Rest) => R
) => (a: A) => (...args: Rest) => R = f

export const f2: <A, B, Rest extends Args, R>(
  fn: (a: A, b: B, ...rest: Rest) => R
) => (a: A, b: B) => (...args: Rest) => R = f

export const f3: <A, B, C, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, ...rest: Rest) => R
) => (a: A, b: B, c: C) => (...args: Rest) => R = f

export const f4: <A, B, C, D, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, ...rest: Rest) => R
) => (a: A, b: B, c: C, d: D) => (...args: Rest) => R = f

export const f5: <A, B, C, D, E, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, ...rest: Rest) => R
) => (a: A, b: B, c: C, d: D, e: E) => (...args: Rest) => R = f

export const f6: <A, B, C, D, E, F, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, ...rest: Rest) => R
) => (a: A, b: B, c: C, d: D, e: E, f: F) => (...args: Rest) => R = f

export const f7: <A, B, C, D, E, F, G, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, ...rest: Rest) => R
) => (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => (...args: Rest) => R = f

export const f8: <A, B, C, D, E, F, G, H, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, ...rest: Rest) => R
) => (
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H
) => (...args: Rest) => R = f

export const f9: <A, B, C, D, E, F, G, H, I, Rest extends Args, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, ...rest: Rest) => R
) => (
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I
) => (...args: Rest) => R = f

export const new_ = <A extends Args, T>(
  Class: new (...args: A) => T,
  ...args: A
): T => new Class(...args)
