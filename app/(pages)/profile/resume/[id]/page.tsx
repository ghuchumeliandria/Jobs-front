'use client'
import { useEffect, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { axiosInstance } from '@/app/lib/axios-instance'
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import { Resume } from '@/app/types/types'
import { getCookie } from 'cookies-next'

export default function ResumePage() {
    const pathname = usePathname()
    const token = getCookie("token")
    const { id } = useParams()
    const [fileId, setFileId] = useState("")
    const [base64, setBase64] = useState('')

    const getResume = async () => {
        try {
            const resp = await axiosInstance.get(`/resume/${id}`)
            if (resp.status === 200) {
                setFileId(resp.data.fileId)

            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (id) getResume()
    }, [id])


    const ravi = async () => {
        try {
            const resp = await axiosInstance.post(
                '/vacancies/get-file',
                { fileId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            )
            if (resp.status === 201) {
                setBase64(resp.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (fileId) ravi()
    }, [fileId])

    if (base64 === "") return <LoadingOverlay />

    return (
        <div className="p-8">
            <h1 className="text-2xl">რეზიუმე</h1>
            {base64 !== "" &&
                <embed src={base64} className='w-full min-h-[90vh]' />
            }
        </div>
    )
}