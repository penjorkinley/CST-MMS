import React from 'react'


export default function Feedback() {
  return (
    <div className='flex justify-between items-center bg-cute p-4 '>

    

    <div className="card card-compact w-4/12 h-4/12 bg-base-100 shadow-2xl mr-24 mb-10">
  {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
  <div className="card-body "><br></br>
    <h2 className="card-title font-semibold text-black text-2xl italic">Rate Your Experience!!!</h2><br></br>
    <h4 className="text-xl font-semibold text-black">How happy are you with our meal?</h4>
    <div className="rating rating-lg">
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 "checked />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
    </div ><br></br>
    <h4 className="text-xl font-semibold text-black">How could we improve?</h4>
    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-s" /><br></br>
    <div className="card-actions justify-end pb-10">
      <button className="btn bg-black pl-9 w-full max-w-s font-semibold text-white text-xl">Submit</button>
    </div>
  </div>
</div>
</div>
  )
}
