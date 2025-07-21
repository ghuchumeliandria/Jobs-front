import AdminDashboard from '@/app/components/__molecules/adminDashboard/AdminDashboard'
import AdminHeader from '@/app/components/__molecules/adminheader/AdminHeader'
import React from 'react'

export default function AdminPage() {
    return (
        <div className="">
            <AdminHeader />
            <AdminDashboard />
        </div>
    )
}
