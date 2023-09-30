import React from 'react'

function Loader() {
  return (
    <div className='flex justify-center items-center h-screen w-screen absolute z-99999 bg-white'>
      <div className="loader"></div>
    </div>
  )
}

export default Loader