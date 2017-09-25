import { F1 } from "./Basics"

export const ERR = "Err"
export const OK = "Ok"

export type Result<A, B> =
  | { type: "Err", data: [A] }
  | { type: "Ok", data: [B] }
export const Err = <A, B>(a: A): Result<A, B> => ({ type: ERR, data: [a] })
export const Ok = <A, B>(b: B): Result<A, B> => ({ type: OK, data: [b] })

type Cases<A, B, R> = { Err: F1<A, R>, Ok: F1<B, R> }
export const match = <A, B, R>(v: Result<A, B>, c: Cases<A, B, R>): R => {
  switch (v.type) {
    case ERR:
      return c.Err(v.data[0])
    case OK:
      return c.Ok(v.data[0])
    default:
      throw 0
  }
}
export const caseOf = <A, B, R>(c: Cases<A, B, R>): F1<Result<A, B>, R> => v =>
  match(v, c)

export default {
  ERR,
  OK,
  Err,
  Ok,
  match,
  caseOf
}
