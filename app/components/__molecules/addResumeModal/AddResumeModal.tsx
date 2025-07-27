import { axiosInstance } from '@/app/lib/axios-instance'
import { getCookie } from 'cookies-next'
import React, { useState } from 'react'

type Props = {
    vacancyId: string | undefined,
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddResumeModal({ vacancyId, setModal }: Props) {
    const token = getCookie('token')
    const [file, setFile] = useState<File | null>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files[0].name.split('.')[1] !== "pdf") {
            alert("ფაილი აუცილებლად უნდა იყოს pdf")
            return
        }

        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0])
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async () => {
        if (!file) return alert("აირჩიე pdf ფაილი")

        const formData = new FormData()
        formData.append("file", file)

        try {
            const resp = await axiosInstance.post(`/vacancies/${vacancyId}/apply`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
                withCredentials: true,
            })

            if (resp.status === 201) {
                alert("რეზიუმე გაგზავნილია")
                setModal(false)
            }
        } catch (error) {
            console.log(error, 'eroria')
        }
    }
    return (
        <div>
            <div className="space-y-4 absolute top-0  left-0 right-0 bottom-0 bg-[#cecece69]">
                <div className="w-full flex justify-center items-center   h-screen">
                    <div className="bg-white p-5 rounded-[10px]">

                        <input type="file" accept="application/pdf" onChange={handleChange}
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            გაგზავნა
                        </button>
                        <button onClick={() => setModal(false)}>X</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
