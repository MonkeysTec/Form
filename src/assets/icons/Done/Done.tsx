import { DoneProps } from './Done.props';

const Done = ({ color, width }: DoneProps) => {
  return (
    <svg width={width ? width : 15} height={width ? width : 15} viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7.87695L11.0625 0.783203L12 1.7207L4 9.7207L0.28125 6.00195L1.1875 5.06445L4 7.87695Z" fill={color}/>
    </svg>
  )
}

export default Done;