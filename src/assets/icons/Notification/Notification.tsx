import { NotificationProps } from "./Notification.props"

export const Notification = ({ size }: NotificationProps) => {

    const ratio = 134 / 50;

    const width = size * ratio;

    return (
        <svg width={width} height={width} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2868_6516)">
                <rect x="4" width="15" height="15" rx="7.5" fill="#FD645F"/>
            </g>
            <path d="M10.9144 12V4.32L11.7544 5.16H9.23439V3.6H12.8584V12H10.9144Z" fill="#F5F5F5"/>
            <defs>
                <filter id="filter0_d_2868_6516" x="0" y="0" width="23" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2868_6516"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2868_6516" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}


