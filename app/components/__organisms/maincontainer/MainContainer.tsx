import React from 'react'
import Header from '../header/Header'
import Search from '../../__molecules/searchBar/Search'
import Daviti from '../../../assets/images/BTNDAVITI_pixian_ai.png'
import Image from 'next/image'
import PlaySvg from '@/app/assets/svgs/PlaySvg'
import Link from 'next/link'
import office from '../../../assets/images/office-building_4300059.png'
import Companies from '../../__molecules/getAllCompanies/Companies'
import VacancyImg from '../../../assets/images/job-vacancy_17929782.png'
import Arrow from '../../../assets/images/right-arrow_8066415.png'
import Vacancies from '../vacancies/Vacancies'
export default function MainContainer() {
    return (
        <div className='w-full'>
            <Header />
            <div className="w-full max-w-[1440px] py-20 z-20 min-h-[200vh] px-[100px] mx-auto  max-[1058px]:px-[70px] max-[900px]:px-5 max-[450px]:px-3 transition-all duration-300 ">
                <Search />

                <div className="w-full px-16 py-9 flex flex-col gap-[82px] rounded-2xl relative mt-[100px] z-10 max-[800px]:hidden" style={{
                    background: "linear-gradient(270deg, rgb(52, 111, 206) 0%, rgb(161, 85, 185) 100%)",
                }} >
                    <h1 className='text-[32px] text-white font-bold max-[1000px]:text-[26px]'>გამოსცადე ახალი შესაძლებლობები</h1>
                    <div className="flex gap-4">
                        <Link href={'/sign-up'}>
                            <button className='px-6 py-3 bg-white cursor-pointer rounded-full font-semibold '>ანგარიშის შექმნა</button>
                        </Link>

                        <button className='px-5 py-2 border-[2px] border-white text-white font-semibold rounded-full  h-full flex gap-2 cursor-pointer '>ინსტრუქცია <PlaySvg /></button>
                    </div>
                    <Image src={Daviti} alt="daviti" width={220} height={140} className='absolute right-[120px] bottom-0 max-[1130px]:right-[10px]  transition-all duration-300 ' />
                </div>


                <div className="mt-28">
                    <div className="flex justify-between items-center  mb-[30px]">
                        <h1 className='text-[28px] mb-[30px] text-black font-semibold flex gap-3 items-center '><Image src={office} alt='office' width={40} height={40} />კომპანიები</h1>
                        <Link href='companies' className=' hover:underline hover:text-purple-500 flex gap-2 mb-5' >ყველა  <Image src={Arrow} alt='arrow' width={20} height={20} /></Link>
                    </div>
                    <Companies />
                </div>

                <div className="mt-28">
                    <div className="flex justify-between items-center mb-[30px]">
                        <h1 className='text-[28px] text-black font-semibold flex gap-3 items-center '><Image src={VacancyImg} alt='office' width={40} height={40} />ვაკანსიები</h1>
                        <Link href='/vacancies' className=' hover:underline hover:text-purple-500 flex gap-2' >ყველა <Image src={Arrow} alt='arrow' width={20} height={20} /></Link>
                    </div>
                    <Vacancies />
                </div>
            </div>
        </div>
    )
}
