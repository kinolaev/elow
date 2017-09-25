// @flow
import * as Json from "elow/lib/Json/Decode"
import { pipe, pipeMap3 } from "elow/lib/Json/Decode/PipeMap"

type Card = {| Acct: number, Title: string, Name: string, CVV: number |}
const card = (
  Acct: number,
  Title: string,
  Name: string,
  CVV: number
): Card => ({
  Acct,
  Title,
  Name,
  CVV
})

const cardPipeDecoder = pipe(Json.number, a =>
  pipeMap3(Json.string, Json.string, Json.number, (b, c, d) => card(a, b, c, d))
)
