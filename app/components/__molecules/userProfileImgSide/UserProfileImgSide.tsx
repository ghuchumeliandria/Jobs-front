import { User } from '@/app/types/types'
import Image from 'next/image'
import React from 'react'

export default function UserProfileImgSide({ user }: { user: User }) {
    return (
        <div>
            <div className="bg-white p-4 rounded-[20px] w-full max-w-[400px] flex flex-col items-center gap-3">
                <div className="w-full flex justify-center">

                    {user.avatar &&
                        <Image src={user.avatar} alt='profile-picture' width={140} height={80} />
                    }
                </div>
                <div className="">
                    <h1 className="text-3xl text-center sm:text-4xl font-bold text-gray-800 tracking-tight leading-snug mb-4">
                        {user.fullName}
                    </h1>
                    <button className="bg-violet-600 cursor-pointer hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-xl shadow-md transition duration-200">
                        პროფილის რედაქტირება
                    </button>   </div>
            </div>
        </div>
    )
}
