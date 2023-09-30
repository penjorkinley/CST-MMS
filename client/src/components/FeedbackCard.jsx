import React from 'react'

function FeedbackCard({dets}) {
  return (
    <div className="card card-compact w-96 h-20 bg-base-100 shadow-2xl mr-2 p-4 ">
    <p>{dets}</p>
  </div>
  )
}

export default FeedbackCard