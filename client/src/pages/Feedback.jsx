import React from 'react'
import pic from '../assets/KSI.png'

export default function Feedback() {
  return (
    <div className='flex justify-between items-center ml-40'>
    <pic className="bg-cute p-4">
          <div>
          <img src={pic}
          className="h-150 w-150 object-cover"
          alt="FeedbackPic"
        /> 
          </div>
    </pic>

    <div className="card card-compact w-96 h-80 bg-base-100 shadow-xl mr-40">
  {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
  <div className="card-body">
    <h2 className="card-title">Rate Your Experience!!!</h2>
    <h4>How happy are you with our meal?</h4>
    <div className="rating">
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
    </div >
    <h4>How could we improve?</h4>
    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Submit</button>
    </div>
  </div>
</div>
</div>
  )
}
