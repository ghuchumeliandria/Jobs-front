'use client'
import { axiosInstance } from '@/app/lib/axios-instance'
import { SignUpSchema, SignUpType } from '@/app/validations/SignUp-shchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SignUp() {
    const router = useRouter()
    const [isCompany, setIsCompany] = useState<Boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(SignUpSchema)
    })
    const onSubmit = async ({ fullName, email, password, confirmPassword, role, description }: SignUpType) => {
        try {
            const resp = await axiosInstance.post('/auth/sign-up', {
                fullName, email, password, confirmPassword, role, description
            })
            if (resp.status === 201) {
                console.log('successfully register')
                router.push('/sign-in')
            }


        } catch (error) {
            console.log(error)
        }
    }
    console.log(errors)


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
                <h2 className="text-3xl font-bold text-center text-[#A155B9] mb-6 max-[450px] text-[22px]">
                    ანგარიშის შექმნა
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">შექმენი ანგარიში როგორც : </label>
                        <select
                            {...register('role', {

                                onChange: (e) => {
                                    setIsCompany(e.target.value === 'COMPANY');
                                }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
                        >
                            <option value="">აირჩიე როლი</option>
                            <option value="USER" >მომხმარებელი</option>
                            <option value="COMPANY" >კომპანია</option>
                        </select>
                        {errors.role && (
                            <p className='text-red-500 text-[14px]'>{errors.role.message}</p>
                        )}

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">სრული სახელი</label>
                        <input
                            {...register('fullName')}
                            type="text"
                            name="fullName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
                            placeholder="მაგ: გიორგი ბერიძე"

                        />
                        {errors.fullName && (
                            <p className='text-red-500 text-[14px]'>{errors.fullName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ელ-ფოსტა</label>
                        <input
                            {...register('email')}
                            type="email"
                            name="email"
                            id='email'
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
                            placeholder="მაგ: example@gmail.com"

                        />

                        {errors.email && (
                            <p className='text-red-500 text-[14px]'>{errors.email.message}</p>
                        )}
                       
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">პაროლი</label>
                        <input
                            {...register('password')}
                            type="password"
                            name="password"
                            id='password'
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
                            placeholder="შეიყვანე პაროლი"

                        />
                        {errors.password && (
                            <p className='text-red-500 text-[14px]'>{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">გაიმეორე პაროლი</label>
                        <input
                            {...register('confirmPassword')}
                            type="password"
                            name="confirmPassword"
                            id='confirmPassword'
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
                            placeholder="გაიმეორე პაროლი"

                        />
                        {errors.confirmPassword && (
                            <p className='text-red-500 text-[14px]'>{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {isCompany ? <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">აღწერა</label>
                        <textarea
                            {...register('description')}
                            name="description"
                            id="description"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9] resize-none"
                            placeholder="მიუთითე შენი კომპანიის შესახებ ან სხვა დამატებითი ინფორმაცია..."
                        />
                        {errors.description && (
                            <p className='text-red-500 text-[14px]'>{errors.description.message}</p>
                        )}
                    </div> : null}

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#A155B9] text-white font-semibold rounded-lg hover:bg-[#8f44a4] transition duration-300"
                    >
                        შექმენი ანგარიში
                    </button>
                </form>
            </div >
        </div >
    )
}
