import { DownPointerProps } from './DownPointer.props';

const DownPointer = ({ color , size = 24 }: DownPointerProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.75 13.125L17.5 21.875L26.25 13.125" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export default DownPointer;