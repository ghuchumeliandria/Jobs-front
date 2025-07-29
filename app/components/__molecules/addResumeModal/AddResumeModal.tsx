import { axiosInstance } from '@/app/lib/axios-instance'
import { getCookie } from 'cookies-next'
import { p } from 'framer-motion/client';
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
        <div className="fixed inset-0 bg-[#9e9b9bad] bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative space-y-5 text-center">

                <button
                    onClick={() => setModal(false)}
                    className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                    ×
                </button>

                <img
                    src="https://cdn-icons-png.flaticon.com/512/4139/4139961.png"
                    alt="upload"
                    className="w-20 mx-auto"
                />

                <h2 className="text-xl font-semibold">რეზიუმეს ატვირთვა</h2>
                <p className="text-sm text-gray-500">ატვირთე შენი რეზიუმე PDF ფორმატში და გაგუგზავნე კომპანიას</p>

                <div className="flex flex-col items-center space-y-4">

                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleChange}
                        id="resume-upload"
                        className="hidden"
                    />

                    <label
                        htmlFor="resume-upload"
                        className="cursor-pointer bg-violet-100 text-violet-700 font-semibold px-4 py-2 rounded-lg hover:bg-violet-200 transition duration-200"
                    >
                        ფაილის არჩევა
                    </label>

                    {file !== null ? <p className='text-green-400'>! ფაილი არჩეულია</p> : null}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full cursor-pointer bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    გაგზავნა
                </button>
            </div>
        </div>
    )
}
