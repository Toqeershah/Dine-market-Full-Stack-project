import React from 'react'
import { Button } from './ui/button'

function NewsLetter() {
  return (
    <div className='pt-12 pb-14 text-center mb-16'>
        <h2 className='font-bold text-4xl mt-20'>Subscribe our Newsletter</h2>
        <h3 className='text-lg pt-4 pb-4'>Get the latest information and promo offers directly</h3>
        <form className=''>
          <input className= 'border-b-[1px] border-black p-2 w-64 bg-slate-200' type="email"placeholder="Your Email" />
          <Button className="text-white bg-black rounded-lg ml-10 text-xs mt-6">
            Get Started
          </Button>
        </form>
    </div>
  )
}

export default NewsLetter;