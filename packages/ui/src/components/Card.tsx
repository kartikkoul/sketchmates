import React, { ReactNode } from 'react'

const Card = ({children} : {children: ReactNode}) => {
  return (
    <div className='border overflow-hidden p-10 bg-red-500'>
      {children}
    </div>
  )
}

export default Card