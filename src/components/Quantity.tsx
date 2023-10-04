"use client"
import React, {useState} from 'react'
import { Button } from './ui/button';

function Quantity() {
    const [num, setNum] = useState(1)
  return (
    <div className='flex'>

        <button className='border h-6 w-6 rounded-full center'
        onClick={() => {
            setNum(num <= 1 ? 1 : num - 1);
        }}>-</button>

        <div className='border h-6 w-6 rounded-full center'>
            <span className='text-sm'>{num}</span>
        </div>

        <button className='border h-6 w-6 rounded-full center'
        onClick={() => {
            setNum(num + 1);
        }}
        >+</button>
    </div>
  )
}

export default Quantity;