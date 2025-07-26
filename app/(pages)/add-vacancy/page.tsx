"use client"
import Header from '@/app/components/__organisms/header/Header'
import { axiosInstance } from '@/app/lib/axios-instance'
import { AddVacancySchema, AddVacancyType } from '@/app/validations/AddVacancy-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import success from '../../assets/images/success_7518748.png'

export default function AddVacancy() {
    const token = getCookie("token")
    const router = useRouter()
    const [modal, setModal] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(AddVacancySchema)
    })

    const onSubmit = async ({ name, sallery, location, description }: AddVacancyType) => {
        console.log("shemovida")
        try {
            const resp = await axiosInstance.post('/company/add-vacancy', {
                name, sallery, location, description
            }, {

                headers: {
                    "Authorization": `Bearer ${token}`
                }

            })

            if (resp.status === 201) {
                setModal(true)
                setTimeout(() => {
                    router.push('/')
                    setModal(false)
                }, 3000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(errors)
    return (
        <div>

            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#9a949475] bg-opacity-40 px-4">
                    <div className="bg-white p-6 rounded-2xl  shadow-2xl w-full  max-w-md animate-fade-in">
                        <div className="flex flex-col sm:flex-row items-center gap-4">

                            <h1 className="text-center text-sm sm:text-base font-medium text-gray-800">
                                თქვენი ვაკანსია წარმატებით გაიგზავნა და ელოდება დამტკიცებას
                            </h1>
                            <Image
                                src={success}
                                alt="success-icon"
                                width={32}
                                height={32}
                                className="min-w-[32px]"
                            />
                        </div>

                        <div className="w-4 h-4 mx-auto mt-3 border-2 border-t-transparent border-purple-500 rounded-full animate-spin" />
                    </div>
                </div>
            )}


            <Header />
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto  p-6 bg-white shadow-[0_0_100px_rgba(0,0,0,0.08)] rounded-[20px]  space-y-4 mt-[220px]">
                <h2 className="text-2xl font-bold text-center text-gray-800">დაამატე ვაკანსია</h2>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">ვაკანსიის სახელი</label>
                    <input
                        {...register('name')}
                        type="text"
                        name="name"
                        id='name'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="ვებ დეველოპერი"
                    />
                    {errors.name && (
                        <p className='text-red-500 text-[14px]'>{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">ანაზღაურება ($)</label>
                    <input
                        {...register('sallery')}
                        type="number"
                        name="sallery"
                        id='sallery'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="მაგ. 1000"
                    />
                    {errors.sallery && (
                        <p className='text-red-500 text-[14px]'>{errors.sallery.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">მდებარეობა</label>
                    <select
                        {...register('location')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none  focus:ring-purple-400"
                    >
                        <option value="">აირჩიეთ მდებარეობა</option>
                        <option value="გლდანი">გლდანი</option>
                        <option value="დიღომი">დიღომი</option>
                        <option value="ვაკე">ვაკე</option>
                        <option value="საბურთალო">საბურთალო</option>
                        <option value="ისანი">ისანი</option>
                        <option value="სამგორი">სამგორი</option>
                        <option value="ნაძალადევი">ნაძალადევი</option>
                        <option value="ჩუღურეთი">ჩუღურეთი</option>
                        <option value="კრწანისი">კრწანისი</option>
                        <option value="მთაწმინდა">მთაწმინდა</option>
                    </select>
                    {errors.location && (
                        <p className='text-red-500 text-[14px]'>{errors.location.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">აღწერა</label>
                    <textarea
                        {...register('description')}
                        name="description"
                        id='description'
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="ვაკანსიის აღწერა..."
                    ></textarea>
                    {errors.description && (
                        <p className='text-red-500 text-[14px]'>{errors.description.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-60 cursor-pointer bg-purple-700 text-white font-semibold rounded-lg"
                >
                    დაამატე ვაკანსია
                </button>
            </form>
        </div>
    )
}
