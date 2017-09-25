// @flow
import * as Json from "elow/lib/Json/Decode"
import { flowMap, flow, flow2, flow3 } from "elow/lib/Json/Decode/FlowMap"

type Card = {| Acct: number, Title: string, Name: string, CVV: number |}

const card = (Acct: number) => (Title: string) => (Name: string) => (
  CVV: number
): Card => ({
  Acct,
  Title,
  Name,
  CVV
})

const cardFlowDecoder = flowMap(
  card,
  flow3(Json.number, Json.string, flow2(Json.string, flow(Json.number)))
)
