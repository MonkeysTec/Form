import { DetailsProps } from './Details.props';

const Details = ({ color, open }: DetailsProps) => {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.65625 0.408203H11.3438V1.7207H0.65625V0.408203ZM0.65625 7.06445V5.7207H11.3438V7.06445H0.65625ZM11.3438 3.06445V4.4082H0.65625V3.06445H11.3438ZM7.34375 8.4082V9.7207H0.65625V8.4082H7.34375Z" fill="white"/>
    </svg>
  )
}

export default Details;