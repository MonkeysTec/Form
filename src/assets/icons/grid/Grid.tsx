import { GridProps } from './Grid.props';

const Grid = ({ color, open }: GridProps) => {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33333 3H2.5V8.83333H8.33333V3Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17.5001 3H11.6667V8.83333H17.5001V3Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17.5001 12.1665H11.6667V17.9998H17.5001V12.1665Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.33333 12.1665H2.5V17.9998H8.33333V12.1665Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default Grid;