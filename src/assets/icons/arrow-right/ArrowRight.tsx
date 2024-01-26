import { RightArrowProps } from './ArrowRight.props';

const ArrowRight = ({ color, size, filled }: RightArrowProps) => {
  return (
    <svg width="26" height="26" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.25 22.5L18.75 15L11.25 7.5" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default ArrowRight;