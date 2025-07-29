import { User, Vacancy } from '@/app/types/types'
import Image from 'next/image'
import React from 'react'

export default function UserDescription({ user }: { user: User }) {
    console.log(user.applies)
    return (
        <div className='bg-white w-full max-w-[900px] p-6 rounded-[20px] min-h-[82vh] overflow-y-scroll'>
            <h1 className='font-semibold text-[20px]'>ზოგადი ინფორმაცია</h1>
            <div className="">
                <h2 className='text-[14px] text-[#909090]'>შექმნის თარიღი {user.createdAt.split('T')[0]}</h2>
                <h1 className='font-semibold text-[20px]'>გაგზავნილი რეზიუმეები {user.applies.length}</h1>
            </div>
            <div className="space-y-4 mt-3">
                {(user.applies as unknown as Vacancy[]).map((el, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow mb-3">
                        <div className="flex gap-3">

                            {el.company.avatar &&
                                <Image src={el.company.avatar} alt='company picture' width={60} height={20} />
                            }
                            <div className="">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {el.name || "ვაკანსიის დასახელება"}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {el.company.fullName || "კომპანიის სახელი"}
                                </p>
                                <p className='text-[#909090] text-[14px]'>გააგზავნა {el.resumes.length} მა იუზერმა</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
