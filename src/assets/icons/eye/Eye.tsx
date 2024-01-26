import { EyeProps } from './Eye.props';

const Eye = ({ color, open }: EyeProps) => {
  if (open) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    )
  } else {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_73_6771)">
          <path d="M14.9502 14.9502C13.5257 16.036 11.7911 16.6376 10.0002 16.6668C4.16683 16.6668 0.833496 10.0002 0.833496 10.0002C1.87007 8.06843 3.30778 6.38069 5.05016 5.05018M8.25016 3.53352C8.82377 3.39925 9.41105 3.33213 10.0002 3.33352C15.8335 3.33352 19.1668 10.0002 19.1668 10.0002C18.661 10.9465 18.0577 11.8375 17.3668 12.6585M11.7668 11.7668C11.538 12.0125 11.262 12.2095 10.9553 12.3461C10.6486 12.4828 10.3176 12.5562 9.98191 12.5622C9.64623 12.5681 9.3128 12.5063 9.0015 12.3806C8.69021 12.2549 8.40743 12.0677 8.17004 11.8303C7.93264 11.5929 7.74549 11.3101 7.61975 10.9988C7.49402 10.6875 7.43227 10.3541 7.43819 10.0184C7.44411 9.68277 7.51759 9.35172 7.65423 9.04506C7.79087 8.73839 7.98787 8.46239 8.2335 8.23352" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M0.833496 0.833496L19.1668 19.1668" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_73_6771">
            <rect width="24" height="24" fill={color} />
          </clipPath>
        </defs>
      </svg>
    )
  }
}

export default Eye;