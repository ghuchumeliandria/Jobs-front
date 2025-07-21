import Link from 'next/link'
import React from 'react'

export default function AdminNavBar() {
    const navBarArr = [{ text: "ვაკანსიები", link: "/ravi" }, { text: "კომპანიები", link: "/ravi" }, { text: "ჩვენს შესახებ", link: "/ravi" },]

    return (
        <div>
            <ul className="flex gap-10 max-[768px]:hidden items-center">
                {navBarArr.map((el, index) => (
                    <li className="group relative  cursor-pointer " key={index}>
                        <Link href={el.link} className='cursor-pointer'>
                            <h1 className="text-[14px] text-black group-hover:text-purple-600 transition cursor-pointer ">
                                {el.text}
                            </h1>
                            <span className="absolute left-0 bottom-[-30px] not-first:h-[3px] w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                ))}

            </ul>
        </div>
    )
}
