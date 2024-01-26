import { NEUTRAL_COLORS } from "../../constants/styleConstants"
import { Text } from "../Text"

export const TextContinueRegister = () => {
  const textHeader = () =>  <>
Se você 
<strong style={{
  fontWeight:600
}}
> já iniciou </strong>
seu
<strong style={{
  fontWeight:600
}}> cadastro</strong>, <a style={{fontWeight:600, color:'inherit'}} href="/personal"> continue aqui.</a>
</>
return  <Text
fs={16}
fw={400}
mt={12}
color={NEUTRAL_COLORS.DARK}
value={ textHeader()}
/>
}