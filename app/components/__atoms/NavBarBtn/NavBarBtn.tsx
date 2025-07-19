import React from 'react'
import Link from 'next/link'
type Btn = {
    text: string
}
export default function NavBarBtn({ text }: Btn) {
    return (
        <li className="   cursor-pointer w-full  hover:bg-[#9b979723] pb-1">
            <Link href="/andria" className='cursor-pointer'>
                <button className="text-[15px] text-black  cursor-pointer ">
                    {text}
                </button>
            </Link>
        </li>
    )
}
