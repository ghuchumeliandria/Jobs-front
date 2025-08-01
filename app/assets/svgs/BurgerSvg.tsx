import React from 'react'

export default function BurgerSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none" >
            <rect width="24" height="2" rx="1" fill="#090909" className='cursor-pointer' />
            <rect y="8" width="24" height="2" rx="1" fill="#090909" className='cursor-pointer' />
            <rect y="16" width="24" height="2" rx="1" fill="#090909" className='cursor-pointer' />
        </svg>
    )
}
