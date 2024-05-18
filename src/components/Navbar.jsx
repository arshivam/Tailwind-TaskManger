import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between items-center bg-violet-900 text-white'>
        <div className='text-whie font-bold p-2'>Task Planner</div>
        <ul className='flex  gap-4 mx-9'>
            <li className='px-2 hover:font-bold transition-all'>Home</li>
            <li className='px-2 hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar