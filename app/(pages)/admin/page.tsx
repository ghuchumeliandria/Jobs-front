"use client"
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import AdminDashboard from '@/app/components/__molecules/adminDashboard/AdminDashboard'
import AdminHeader from '@/app/components/__molecules/adminheader/AdminHeader'
import IsAdminGuard from '@/app/guard/IsAdmin.guard'
import { useGetCurrentUserOrCompany } from '@/app/lib/getCurrentUserOrCompany'
import { Company, User } from '@/app/types/types'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function AdminPage() {
    IsAdminGuard()
    if (!IsAdminGuard) return <LoadingOverlay />

    return (
        <div className="flex">
            <AdminHeader />
            <AdminDashboard />
        </div>
    )
}
