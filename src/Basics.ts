export * from "./Basics/expression"
export * from "./Basics/function"
export * from "./Basics/tuple"

export const composeL = <A, B, C>(
  g: (b: B) => C,
  f: (a: A) => B
): ((a: A) => C) => (x) => g(f(x))

export const composeR = <A, B, C>(
  f: (a: A) => B,
  g: (b: B) => C
): ((a: A) => C) => (x) => g(f(x))

export const identity = <A>(a: A): A => a

export type Never = { type: "JustOneMore"; data: [Never] }
export const never = <A>(x: Never): A => {
  throw new Error("never")
}
