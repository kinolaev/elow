// @flow
import * as Json from "elow/lib/Json/Decode"

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

const cardDecoder = Json.map2(
  ([a, b], [c, d]) => card(a, b, c, d),
  Json.mapTuple2(Json.number, Json.string),
  Json.mapTuple2(Json.string, Json.number)
)
