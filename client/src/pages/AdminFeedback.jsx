import React from 'react'
import FeedbackCard from '../components/FeedbackCard'

export default function Feedback() {
  return (
    <div className='flex justify-between items-center bg-cute p-4 '>

    

    <div className="card card-compact w-5/12 h-fit bg-base-100 shadow-2xl ml-auto mr-20 mb-10">
  {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
  <div className="card-body flex justify-center items-center"><br></br>
  <FeedbackCard dets={'The mess food is consistently delicious, and the variety of cuisines keeps mealtime exciting.'}/>
  <FeedbackCard dets={'The food quality is decent, but improvements in cleanliness would enhance the overall experience'}/>
  <FeedbackCard dets={'The mess food is consistently delicious, and the variety of cuisines keeps mealtime exciting.'}/>
  <FeedbackCard dets={'The mess food is consistently delicious, and the variety of cuisines keeps mealtime exciting.'}/>
  </div>
</div>
</div>
  )
}
