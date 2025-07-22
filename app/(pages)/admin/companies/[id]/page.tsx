"use client"
import { axiosInstance } from '@/app/lib/axios-instance'
import { Company, Token, User } from '@/app/types/types'
import { CompanyApprovalSchema, CompanyApprovalType } from '@/app/validations/companyApproval-shema'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCookie } from 'cookies-next'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CompanyApproval() {
    const [company, setCompany] = useState<Company | User>()
    const token = getCookie("token")
    const { id } = useParams()

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(CompanyApprovalSchema)
    })


    console.log(id)
    const getCompany = async ({ token }: Token,) => {
        const resp = await axiosInstance.get(`admin/company/${id}`, {
            headers: {
                'Authorization': `Bearer ${token} `
            }
        }
        )
        if (resp.status === 200) setCompany(resp.data)

    }

    useEffect(() => {
        if (token)
            getCompany({ token })
    }, [])



    const onSubmit = async ({ status }: CompanyApprovalType) => {
        console.log(status)
        const resp = await axiosInstance.patch(`/admin/company-approval/${id}`, {
            status
        }, {
            headers: {
                "authorization": ` Bearer ${token}`
            },
        })

        if (resp.status === 201) {
            alert("statusi warmatebit sheicvala")
            await getCompany({ token })
        }

    }
    return (
        <div>
            <div className="">
                <h1>{company?.fullName}</h1>
                <h1>{company?.avatar}</h1>
                <h1>{company?.email}</h1>
                <h1>{company?.status}</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">შეცვალე სტატუსი</label>

                <select defaultValue={company?.status} {...register("status")} id="status" className="w- max-w-[300px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]">
                    <option value="rejected">Reject</option>
                    <option value="approved">Approve</option>
                </select>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}
