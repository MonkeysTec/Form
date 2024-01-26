import { FixedIncomeProps } from "./FixedIncome.props";

const FixedIncome = ({color }: FixedIncomeProps) => {
  return (
    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.7633 23.125H14.4053V34.6967H18.7633V23.125Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26.7533 24.5718H22.3953V34.697H26.7533V24.5718Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M34.7431 18.7856H30.385V34.6967H34.7431V18.7856Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M28.2058 13H31.1112V15.8929" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.4053 18.7859H20.216L22.7582 21.3172L31.1112 13" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.5 34.6968H37.6484" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default FixedIncome;