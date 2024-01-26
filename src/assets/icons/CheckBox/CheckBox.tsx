const CheckBox = () => {
  return (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_7139_5122)">
      <rect x="5" y="1" width="18" height="18" rx="1" stroke="#25A7DB" stroke-width="2" shape-rendering="crispEdges"/>
    </g>
    <defs>
      <filter id="filter0_d_7139_5122" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7139_5122"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7139_5122" result="shape"/>
      </filter>
    </defs>
  </svg>
  )
}

export default CheckBox;