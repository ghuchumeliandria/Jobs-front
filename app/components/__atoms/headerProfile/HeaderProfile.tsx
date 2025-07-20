import { Company, User } from '@/app/types/types'
import Image from 'next/image'
import React from 'react'

type Props = {
    user: User | Company
}

export default function HeaderProfile({ user }: Props) {
    return (
        <div className="flex items-center gap-2 max-[768px]:hidden" >
            <p className='font-semibold'>{user.fullName.split(" ")[0]}</p>
            <Image src={user.avatar!} alt='user profile' className='rounded-full shadow-[#A155B9] shadow-2xl' width={40} height={40} />
        </div >
    )
}
