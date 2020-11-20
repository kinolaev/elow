import { Validator } from "./Decode"
import { Err, Ok } from "../Result"

export const min = (minValue: number): Validator<number> => (value) =>
  value < minValue ? Err("MIN") : Ok(value)

export const max = (maxValue: number): Validator<number> => (value) =>
  value > maxValue ? Err("MAX") : Ok(value)

export const minLength = (minValue: number): Validator<string> => (value) =>
  value.length < minValue ? Err("MIN_LENGTH") : Ok(value)

export const maxLength = (maxValue: number): Validator<string> => (value) =>
  value.length > maxValue ? Err("MAX_LENGTH") : Ok(value)

export const email: Validator<string> = (value) =>
  emailRegExp.test(value) ? Ok(value) : Err("EMAIL")

const emailRegExp = new RegExp(
  "^[^\\.\\s@][^\\s@]*(?!\\.)@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*$"
)

export const equal = <T>(model: T): Validator<T> => (value) =>
  model === value ? Ok(value) : Err("EQUAL")
