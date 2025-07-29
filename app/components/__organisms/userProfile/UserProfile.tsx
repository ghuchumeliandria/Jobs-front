import { User } from '@/app/types/types'
import React, { useState } from 'react'
import Header from '../header/Header'
import UserProfileImgSide from '../../__molecules/userProfileImgSide/UserProfileImgSide'
import UserDescription from '../../__molecules/userProfileDescription/UserDescription'

export default function UserProfile({ user }: { user: User }) {

    return (
        <div>
            <Header />
            <div className="mt-20 py-8 w-full max-w-[1440px] flex justify-between px-[100px] bg-[#e5e7eb] mx-auto">
                <UserProfileImgSide user={user as User} />
                <UserDescription user={user as User} />
            </div>
        </div>
    )
}
