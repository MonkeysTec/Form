import { ListProps } from './List.props';

const List = ({ color, open }: ListProps) => {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.66675 5.5H17.5001" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.66675 10.5H17.5001" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.66675 15.5H17.5001" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.5 5.5H2.50833" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.5 10.5H2.50833" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.5 15.5H2.50833" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default List;