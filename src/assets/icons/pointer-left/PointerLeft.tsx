import { PointerLeftProps } from './PointerLeft.props';

const PointerLeft = ({ color, size = 24, filled }: PointerLeftProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 16" fill="none">
      <g filter="url(#filter0_d_2704_7963)">
        <path d="M19 7.5H5M5 7.5L11.2308 1M5 7.5L11.2308 14" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
  )
}

export default PointerLeft;