"use client"
import { axiosInstance } from '@/app/lib/axios-instance'
import { SearchSchema, SearchType } from '@/app/validations/search-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence } from 'framer-motion'

export default function Search() {

    const [modal, setModal] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (modal) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [modal])

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(SearchSchema)
    })

    const onSubmit = async ({ name, category, location, maxSallery, minSallery }: SearchType) => {
        try {
            const response = await axiosInstance.get('/vacancies', {
                params: {
                    name: name || undefined,
                    category: category || undefined,
                    location: location || undefined,
                    minSallery: minSallery || undefined,
                    maxSallery: maxSallery || undefined
                },
            })

            const query = new URLSearchParams()


            if (name) query.append('name', name)
            if (category) query.append('category', category)
            if (location) query.append('location', location)
            if (minSallery) query.append('minSallery', String(minSallery))
            if (maxSallery) query.append('maxSallery', String(maxSallery))



            console.log("ვაკანსიები:", response.data)
            if (response.status === 200) {
                router.push(`/vacancies?${query.toString()}`)
            }

        } catch (error) {
            console.error("შეცდომა ვაკანსიების წამოღებისას", error)
        }
    }

    return (
        <div className="w-full   max-w-[1032px] mx-auto mt-[105px]  bg-transparent h-[70px] py-2 rounded-full border-[1px] pl-8 pr-2 flex items-center border-[#a155b9]">

            <form className='w-full flex justify-between relative' onSubmit={handleSubmit(onSubmit)} >
                <div className="flex gap-2  items-center">
                    <label htmlFor="search">
                        <Image src="https://myjobs.ge/images/work_outline_purple.svg" alt='bag' width={25} height={20} />
                    </label>
                    <input {...register('name')} type="text" name='name' id='name' placeholder='ძებნა' className='outline-none cursor-pointer text-[14px] w-full max-w-[240px] pr-4 ' />
                </div>
                <div className="flex gap-2  items-center pl-3 border-l-[1px]  border-[#e5e7eb]">
                    <label htmlFor="category">
                        <Image src="https://myjobs.ge/images/workspaces.svg" alt='bag' width={25} height={20} />
                    </label>
                    <input {...register('category')} type="text" name='category' id='category' placeholder='კატეგორია' className='outline-none cursor-pointer text-[14px] w-full max-w-[240px] ' />
                </div>
                <div className="flex gap-2  items-center border-l-[1px]  pl-3 border-[#e5e7eb]">

                    <Image src="https://myjobs.ge/images/place.svg" alt='bag' width={25} height={20} />

                    <div className="space-y-2">
                        <select
                            {...register('location')}
                            className="w-full px-4 py-2  rounded-lg outline-none text-[14px] text-[#606060fa]  focus:ring-purple-400"
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
                </div>
                <div className="flex items-center gap-2">
                    <button type='button' onClick={() => setModal(true)} className='p-[9px] bg-[#eeeeee] rounded-full cursor-pointer'><Image src="https://myjobs.ge/images/tune.svg" alt='search' width={22} height={22} /></button>
                    <button type='submit' className='p-4 bg-[#a155b9] rounded-full cursor-pointer'><Image src="https://myjobs.ge/images/search.svg" alt='search' width={18} height={18} /></button>
                </div>

                {modal &&
                    <div className="p-4 fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll bg-[#9f9b9ba6] z-[10000] ">
                        <AnimatePresence>
                            <motion.div
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "100%", opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <div className="flex w-full justify-center h-[90vh] items-center ">

                                    <div className=" mb-6 border-b max-w-[350px] w-full mt-[10px] rounded-[20px] px-8 py-4  overfolow-hidden bg-white border-neutral-200">

                                        <div className=" w-full flex justify-between">

                                            <h4 className="font-bold text-secondary-100 text-2xl mb-6">
                                                ხელფასის დიაპაზონი
                                            </h4>

                                            <button onClick={() => setModal(false)} className="text-[32px] cursor-pointer"><Image src={'https://myjobs.ge/images/close.svg'} alt="close icon" width={30} height={30} /></button>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex flex-col">
                                                <label htmlFor="minSallery" className="mb-1 text-sm text-gray-700">მინიმუმი</label>
                                                <input
                                                    {...register('minSallery')}
                                                    type="number"
                                                    id="minSallery"
                                                    className="outline-none cursor-pointer text-[14px] w-full max-w-[240px] pr-4 border border-gray-300 p-3 rounded-[20px] focus:border-primary-100"
                                                    placeholder="მაგ: 1000"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label htmlFor="maxSallery" className="mb-1 text-sm text-gray-700">მაქსიმუმი</label>
                                                <input
                                                    {...register('maxSallery')}
                                                    type="number"
                                                    id="maxSallery"
                                                    className="outline-none cursor-pointer text-[14px] w-full max-w-[240px] pr-4 border border-gray-300 p-3 rounded-[20px] focus:border-primary-100"
                                                    placeholder="მაგ: 3000"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full text-center">

                                            <button type='submit' className='p-4 bg-[#c75fe7] mt-2  rounded-full cursor-pointer text-white font-semibold'>ძებნა</button>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                }
            </form>
        </div>
    )
}


