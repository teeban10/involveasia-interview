"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

export function BannerCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, })
  )
  const banners = [
    '/Poke1.png',
    '/Poke2.png',
    '/Poke3.png',
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        loop: true
      }}
      className="max-w-[2000px] shadow-none"
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className='w-full justify-self-center -ml-5'>
        {banners.map((_, index) => (
          <CarouselItem key={index} className='w-full'>
            <div className="py-1">
              <Card className='pt-3 pb-1 shadow-none border-none h-full'>
                <CardContent className="p-0">
                  <div className='relative w-full h-[258px]'>
                    <Image src={_} alt="Pokemon" width={2000} height={258} className='object-cover w-full h-full' />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
