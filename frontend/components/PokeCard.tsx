import Image from 'next/image';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function PokeCard ({ name, image, types }: { name: string; image: { front: string; back: string }; types: string[] }) {
  return (
    <Card className='w-full max-w-[500px] py-0'>
      <div className='flex'>
        <div className='poke-image'>
          <Image src={image.front || `/who.gif`} className='p-4' width={90} height={90} alt={name} />
        </div>
        <div className='space-y-2 flex flex-col justify-center'>
          <div className='text-base font-semibold'>{name}</div>
          <div className='flex space-x-2'>
            {types.length > 0 && types.map((type) => (
              <span className='bg-gray-200 rounded-sm text-slate-500 px-1 py-0.5 text-xs' key={type}>{type}</span>
              // <Badge variant='secondary' key={type}>{type}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}