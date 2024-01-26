import { SearchProps } from './Search.props';

const Search = ({ color, size, filled }: SearchProps) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.66667 16.3333C13.3486 16.3333 16.3333 13.3486 16.3333 9.66667C16.3333 5.98477 13.3486 3 9.66667 3C5.98477 3 3 5.98477 3 9.66667C3 13.3486 5.98477 16.3333 9.66667 16.3333Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 18L14.375 14.375" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default Search;