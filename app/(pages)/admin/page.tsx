"use client"
import LoadingOverlay from '@/app/components/__atoms/loading/LoadingOverlay'
import AdminDashboard from '@/app/components/__molecules/adminDashboard/AdminDashboard'
import AdminHeader from '@/app/components/__molecules/adminheader/AdminHeader'
import React, { useEffect, useState } from 'react'

export default function AdminPage() {

    return (


        <div className="flex">
            <AdminHeader />
            <AdminDashboard />
        </div>

    )
}
