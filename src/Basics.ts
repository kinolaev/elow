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

export type CF2<A, B, R> = F1<A, F1<B, R>> & F2<A, B, R>
export type CF3<A, B, C, R> = F1<A, CF2<B, C, R>> &
  F2<A, B, F1<C, R>> &
  F3<A, B, C, R>
export type CF4<A, B, C, D, R> = F1<A, CF3<B, C, D, R>> &
  F2<A, B, CF2<C, D, R>> &
  F3<A, B, C, F1<D, R>> &
  F4<A, B, C, D, R>
export type CF5<A, B, C, D, E, R> = F1<A, CF4<B, C, D, E, R>> &
  F2<A, B, CF3<C, D, E, R>> &
  F3<A, B, C, CF2<D, E, R>> &
  F4<A, B, C, D, F1<E, R>> &
  F5<A, B, C, D, E, R>
export type CF6<A, B, C, D, E, F, R> = F1<A, CF5<B, C, D, E, F, R>> &
  F2<A, B, CF4<C, D, E, F, R>> &
  F3<A, B, C, CF3<D, E, F, R>> &
  F4<A, B, C, D, CF2<E, F, R>> &
  F5<A, B, C, D, E, F1<F, R>> &
  F6<A, B, C, D, E, F, R>
export type CF7<A, B, C, D, E, F, G, R> = F1<A, CF6<B, C, D, E, F, G, R>> &
  F2<A, B, CF5<C, D, E, F, G, R>> &
  F3<A, B, C, CF4<D, E, F, G, R>> &
  F4<A, B, C, D, CF3<E, F, G, R>> &
  F5<A, B, C, D, E, CF2<F, G, R>> &
  F6<A, B, C, D, E, F, F1<G, R>> &
  F7<A, B, C, D, E, F, G, R>
export type CF8<A, B, C, D, E, F, G, H, R> = F1<
  A,
  CF7<B, C, D, E, F, G, H, R>
> &
  F2<A, B, CF6<C, D, E, F, G, H, R>> &
  F3<A, B, C, CF5<D, E, F, G, H, R>> &
  F4<A, B, C, D, CF4<E, F, G, H, R>> &
  F5<A, B, C, D, E, CF3<F, G, H, R>> &
  F6<A, B, C, D, E, F, CF2<G, H, R>> &
  F7<A, B, C, D, E, F, G, F1<H, R>> &
  F8<A, B, C, D, E, F, G, H, R>

const curryN = (l: number) => (f: Function): any => curryNHelper(l, f, [])
const curryNHelper = (l: number, f: Function, args: Array<any>) =>
  args.length === 0
    ? (...next: Array<any>) => curryNHelper(l, f, next)
    : args.length < l
    ? (...next: Array<any>) => curryNHelper(l, f, args.concat(next))
    : args.length > l
    ? f(...args.slice(0, l))
    : f(...args)
export const curry2: <A, B, R>(f2: F2<A, B, R>) => CF2<A, B, R> = curryN(2)
export const curry3: <A, B, C, R>(
  f3: F3<A, B, C, R>
) => CF3<A, B, C, R> = curryN(3)
export const curry4: <A, B, C, D, R>(
  f4: F4<A, B, C, D, R>
) => CF4<A, B, C, D, R> = curryN(4)
export const curry5: <A, B, C, D, E, R>(
  f5: F5<A, B, C, D, E, R>
) => CF5<A, B, C, D, E, R> = curryN(5)
export const curry6: <A, B, C, D, E, F, R>(
  f6: F6<A, B, C, D, E, F, R>
) => CF6<A, B, C, D, E, F, R> = curryN(6)
export const curry7: <A, B, C, D, E, F, G, R>(
  f7: F7<A, B, C, D, E, F, G, R>
) => CF7<A, B, C, D, E, F, G, R> = curryN(7)
export const curry8: <A, B, C, D, E, F, G, H, R>(
  f8: F8<A, B, C, D, E, F, G, H, R>
) => CF8<A, B, C, D, E, F, G, H, R> = curryN(8)

const composeN = (...fns: Array<any>): any => (a: any) =>
  fns.reduceRight((result, f) => f(result), a)
export const compose2: <A, B, C>(
  bc: F1<B, C>,
  ab: F1<A, B>
) => F1<A, C> = composeN
export const compose3: <A, B, C, D>(
  cd: F1<C, D>,
  bc: F1<B, C>,
  ab: F1<A, B>
) => F1<A, D> = composeN
export const compose4: <A, B, C, D, E>(
  de: F1<D, E>,
  cd: F1<C, D>,
  bc: F1<B, C>,
  ab: F1<A, B>
) => F1<A, E> = composeN
export const compose5: <A, B, C, D, E, F>(
  ef: F1<E, F>,
  de: F1<D, E>,
  cd: F1<C, D>,
  bc: F1<B, C>,
  ab: F1<A, B>
) => F1<A, F> = composeN
export const compose6: <A, B, C, D, E, F, G>(
  fg: F1<F, G>,
  ef: F1<E, F>,
  de: F1<D, E>,
  cd: F1<C, D>,
  bc: F1<B, C>,
  ab: F1<A, B>
) => F1<A, G> = composeN
export const compose7: <A, B, C, D, E, F, G, H>(
  gh: F1<G, H>,
  fg: F1<F, G>,
  ef: F1<E, F>,
  de: F1<D, E>,
  cd: F1<C, D>,
  bc: F1<B, C>,
  ab: F1<A, B>
) => F1<A, H> = composeN
export const compose8: <A, B, C, D, E, F, G, H, I>(
  hi: F1<H, I>,
  gh: F1<G, H>,
  fg: F1<F, G>,
  ef: F1<E, F>,
  de: F1<D, E>,
  cd: F1<C, D>,
  bc: F1<B, C>,
  ab: F1<A, B>
) => F1<A, I> = composeN

const flowN = (...fns: Array<any>): any => (a: any) =>
  fns.reduce((result, f) => f(result), a)
export const flow2: <A, B, C>(ab: F1<A, B>, bc: F1<B, C>) => F1<A, C> = flowN
export const flow3: <A, B, C, D>(
  ab: F1<A, B>,
  bc: F1<B, C>,
  cd: F1<C, D>
) => F1<A, D> = flowN
export const flow4: <A, B, C, D, E>(
  ab: F1<A, B>,
  bc: F1<B, C>,
  cd: F1<C, D>,
  de: F1<D, E>
) => F1<A, E> = flowN
export const flow5: <A, B, C, D, E, F>(
  ab: F1<A, B>,
  bc: F1<B, C>,
  cd: F1<C, D>,
  de: F1<D, E>,
  ef: F1<E, F>
) => F1<A, F> = flowN
export const flow6: <A, B, C, D, E, F, G>(
  ab: F1<A, B>,
  bc: F1<B, C>,
  cd: F1<C, D>,
  de: F1<D, E>,
  ef: F1<E, F>,
  fg: F1<F, G>
) => F1<A, G> = flowN
export const flow7: <A, B, C, D, E, F, G, H>(
  ab: F1<A, B>,
  bc: F1<B, C>,
  cd: F1<C, D>,
  de: F1<D, E>,
  ef: F1<E, F>,
  fg: F1<F, G>,
  gh: F1<G, H>
) => F1<A, H> = flowN
export const flow8: <A, B, C, D, E, F, G, H, I>(
  ab: F1<A, B>,
  bc: F1<B, C>,
  cd: F1<C, D>,
  de: F1<D, E>,
  ef: F1<E, F>,
  fg: F1<F, G>,
  gh: F1<G, H>,
  hi: F1<H, I>
) => F1<A, I> = flowN

const pipeN = (...args: Array<any>): any => pipeNHelper(args.length - 1, args)
const pipeNHelper = (n: number, args: Array<any>): any =>
  args[n](...args.slice(0, n))
export const pipe: <A, R>(a: A, f1: F1<A, R>) => R = pipeN
export const pipe2: <A, B, R>(a: A, b: B, f2: F2<A, B, R>) => R = pipeN
export const pipe3: <A, B, C, R>(
  a: A,
  b: B,
  c: C,
  f3: F3<A, B, C, R>
) => R = pipeN
export const pipe4: <A, B, C, D, R>(
  a: A,
  b: B,
  c: C,
  d: D,
  f4: F4<A, B, C, D, R>
) => R = pipeN
export const pipe5: <A, B, C, D, E, R>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f5: F5<A, B, C, D, E, R>
) => R = pipeN
export const pipe6: <A, B, C, D, E, F, R>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  f6: F6<A, B, C, D, E, F, R>
) => R = pipeN
export const pipe7: <A, B, C, D, E, F, G, R>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  f7: F7<A, B, C, D, E, F, G, R>
) => R = pipeN
export const pipe8: <A, B, C, D, E, F, G, H, R>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  f8: F8<A, B, C, D, E, F, G, H, R>
) => R = pipeN

const callN = (f: Function, ...args: Array<any>): any => f(...args)
export const call: <A, R>(f1: F1<A, R>, a: A) => R = callN
export const call2: <A, B, R>(f2: F2<A, B, R>, a: A, b: B) => R = callN
export const call3: <A, B, C, R>(
  f3: F3<A, B, C, R>,
  a: A,
  b: B,
  c: C
) => R = callN
export const call4: <A, B, C, D, R>(
  f4: F4<A, B, C, D, R>,
  a: A,
  b: B,
  c: C,
  d: D
) => R = callN
export const call5: <A, B, C, D, E, R>(
  f5: F5<A, B, C, D, E, R>,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E
) => R = callN
export const call6: <A, B, C, D, E, F, R>(
  f6: F6<A, B, C, D, E, F, R>,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F
) => R = callN
export const call7: <A, B, C, D, E, F, G, R>(
  f7: F7<A, B, C, D, E, F, G, R>,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G
) => R = callN
export const call8: <A, B, C, D, E, F, G, H, R>(
  f8: F8<A, B, C, D, E, F, G, H, R>,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H
) => R = callN

export const identity = <A>(a: A): A => a

const tupleN = (...args: Array<any>): any => args
export const tuple0 = []
export const tuple1: <A>(a: A) => [A] = tupleN
export const tuple2: <A, B>(a: A, b: B) => [A, B] = tupleN
export const tuple3: <A, B, C>(a: A, b: B, c: C) => [A, B, C] = tupleN
export const tuple4: <A, B, C, D>(
  a: A,
  b: B,
  c: C,
  d: D
) => [A, B, C, D] = tupleN
export const tuple5: <A, B, C, D, E>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E
) => [A, B, C, D, E] = tupleN
export const tuple6: <A, B, C, D, E, F>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F
) => [A, B, C, D, E, F] = tupleN
export const tuple7: <A, B, C, D, E, F, G>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G
) => [A, B, C, D, E, F, G] = tupleN
export const tuple8: <A, B, C, D, E, F, G, H>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H
) => [A, B, C, D, E, F, G, H] = tupleN

export type Never = true & false
export const never = <A>(x: Never): A => {
  throw new Error("never")
}
