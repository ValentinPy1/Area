import React from 'react';

export default function ProfileIcon() {
    return (
        <svg width="100%" height="100%" viewBox="-2 -2 20 20" xmlns="http://www.w3.org/2000/svg"
            style={{
                fill: '#000000',
                cursor: 'pointer',
                transition: 'fill 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.fill = 'rgb(96, 165, 250)'}
            onMouseOut={(e) => e.currentTarget.style.fill = '#000000'}>
            <path d="M14.5625,16 L1.43817,16 C0.73178,16 0.210153,15.303 0.476581,14.662 C1.71277,11.698 4.61693,9.99998 7.99985,9.99998 C11.3838,9.99998 14.2879,11.698 15.5241,14.662 C15.7906,15.303 15.2689,16 14.5625,16 M3.91666,4 C3.91666,1.794 5.74899,0 7.99985,0 C10.2517,0 12.083,1.794 12.083,4 C12.083,6.206 10.2517,8 7.99985,8 C5.74899,8 3.91666,6.206 3.91666,4 M17.9557,15.636 C17.2136,12.277 14.8923,9.79798 11.837,8.67298 C13.456,7.39598 14.4002,5.33098 14.0532,3.06998 C13.651,0.44698 11.4236,-1.65202 8.73482,-1.95802 C5.02321,-2.38102 1.87507,0.44898 1.87507,4 C1.87507,5.89 2.76929,7.57398 4.1637,8.67298 C1.10743,9.79798 -1.21284,12.277 -1.95597,15.636 C-2.22546,16.857 -1.221,18 -0.94603,18 L15.9457,18 C17.2217,18 18.2262,16.857 17.9557,15.636" />
        </svg>
    );
}
