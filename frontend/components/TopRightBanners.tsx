"use client"
import Image from 'next/image'

export default function TopRightBanners() {
  return (
    <div className="max-w-xl h-60 flex flex-col space-y-4.5">
      <Image src='/StaticBanner1.jpg' width={640} height={120} className='w-full h-1/2 object-cover' alt='Banner1'/>
      <Image src='/StaticBanner1.jpg' width={640} height={120} className='w-full h-1/2 object-cover' alt='Banner2'/>
    </div>
  )
}