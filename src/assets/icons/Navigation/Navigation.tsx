import { NavigationProps } from './Navigation.props'

export const NavigationIcon = ({ color, size }: NavigationProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 13.75L27.5 2.5L16.25 26.25L13.75 16.25L3.75 13.75Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}


