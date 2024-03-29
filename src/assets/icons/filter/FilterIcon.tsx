import { FilterIconProps } from './FilterIcon.props';

const FilterIcon = ({ color, open }: FilterIconProps) => {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.3334 3H1.66675L8.33342 10.8833V16.3333L11.6667 18V10.8833L18.3334 3Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default FilterIcon;