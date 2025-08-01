"use client"
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import CopmanyProfile from '@/app/components/__organisms/companyProfile/CopmanyProfile'
import UserProfile from '@/app/components/__organisms/userProfile/UserProfile'
import { useGetCurrentUserOrCompany } from '@/app/lib/getCurrentUserOrCompany'
import { Company, User } from '@/app/types/types'
import { getCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [profile, setProfile] = useState<Company | User>()
    const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany()
    const token = getCookie("token")

    if (!token) return redirect('/')

    useEffect(() => {
        if (token) getCurrentUserOrCompany({ token, setUser: setProfile })
    }, [])

    if (!profile) return <LoadingOverlay />
    console.log(profile.role)
    return (
        <div>
            {
                profile.role === "COMPANY" ?
                    <CopmanyProfile /> : <UserProfile user={profile as User} />
            }
        </div>
    )
}
