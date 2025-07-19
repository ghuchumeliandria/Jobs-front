import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    return (
        <div>
            <ul className="flex gap-10 max-[768px]:hidden items-center">
                <li className="group relative  cursor-pointer ">
                    <Link href="/andria" className='cursor-pointer'>
                        <button className="text-[15px] text-black group-hover:text-purple-600 transition cursor-pointer ">
                            ვაკანსიები
                        </button>
                        <span className="absolute left-0 bottom-[-30px] not-first:h-[3px] w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </li>

                <li className="group relative  cursor-pointer" >
                    <Link href="/dsa" className='cursor-pointer'>
                        <button className="text-black group-hover:text-purple-600 transition cursor-pointer">
                            კომპანიები
                        </button>
                        <span className="absolute  left-0 bottom-[-30px] h-[3px] w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </li>

                <li className="group relative  cursor-pointer">
                    <Link href="/dsa" className='cursor-pointer'>
                        <button className="text-black group-hover:text-purple-600 transition cursor-pointer">
                            ჩვენს შესახებ
                        </button>
                        <span className="absolute left-0 bottom-[-30px] h-[3px] w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
