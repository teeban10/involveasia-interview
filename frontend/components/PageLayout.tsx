import React, { ReactNode } from 'react'
import Image from 'next/image'
import { BannerCarousel } from './BannerCarousel'
import TopRightBanners from './TopRightBanners'

export const PageLayout = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div className='flex flex-col h-screen'>
      {/* Top Banner Section - Full width, scrolls away */}
      <div className='grid grid-cols-[70%_30%] gap-0 h-70 bg-white shrink-0'>
        <div className='text-white pr-2 pl-2.5'>
          <BannerCarousel />
        </div>
        <div className=' text-white py-4 pr-4'>
          <TopRightBanners />
        </div>
      </div>

      {/* Main Content Section with Sticky Sidebars */}
      <div className='flex flex-1'>
        {/* Left Sidebar - Sticky */}
        <aside className='w-52 sticky top-0 pt-3 px-4 h-[500px]'>
          <Image
            src='/Verts.jpg'
            alt='Vertical-Image 1'
            width={208}
            height={500}
            className='object-fill h-full'
          />
        </aside>
        {/* Main Content Area */}
        <main className='flex-1 bg-white'>{children}</main>

        {/* Right Sidebar - Sticky */}
        <aside className='w-[400px] h-[500px] pt-3 sticky top-0 px-4'>
          <Image
            src='/Pika.jpg'
            alt='Vertical-Image 1'
            width={400}
            height={500}
            className='object-cover object-center h-full w-full'
          />
        </aside>
      </div>
    </div>
  )
}
