import { OrderProps } from "./Order.props";

export const Order = ({ color }: OrderProps) => {

    return (
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 9.5L6 15.5L12 9.5" fill="#293953"/>
            <path d="M12 6.5L6 0.5L0 6.5" fill="#293953"/>
        </svg>
    )
}


