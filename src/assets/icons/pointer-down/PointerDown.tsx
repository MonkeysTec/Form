import { PointerDownProps } from './PointerDown.props';

const PointerDown = ({ color, size, filled }: PointerDownProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" fill="#D9D9D9"/>
      <g id="Home" clip-path="url(#clip0_769_2770)">
      <rect width="1920" height="1080" transform="translate(-1208 -911)" fill="url(#paint0_linear_769_2770)"/>
      <g id="Frame 2458">
      <g id="Card &#195;&#186;ltims Movimenta&#195;&#167;&#195;&#181;es">
      <rect x="-16" y="-66" width="369" height="256" rx="8" fill="white"/>
      <g id="Info">
      <g id="Frame 2442">
      <g id="arrow-down">
      <path id="Vector" d="M12 5V19" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="Vector_2" d="M19 12L12 19L5 12" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </g>
      </g>
      </g>
      </g>
      </g>
      <defs>
        <linearGradient id="paint0_linear_769_2770" x1="838.667" y1="-400.859" x2="1938.66" y2="214.309" gradientUnits="userSpaceOnUse">
          <stop stop-color="#293953"/>
          <stop offset="1" stop-color="#374D73"/>
        </linearGradient>
        <clipPath id="clip0_769_2770">
          <rect width="1920" height="1080" fill="white" transform="translate(-1208 -911)"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default PointerDown;