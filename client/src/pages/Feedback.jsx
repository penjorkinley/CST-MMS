import React from 'react'
import pic from '../assets/KSI.png'

export default function Feedback() {
  return (
    <nav className="bg-transparent p-4">
          <div>
          <img src={pic}
          className="h-150 w-150 object-cover"
          alt="FeedbackPic"
        /> 
          </div>
    </nav>
  )
}
