import React from 'react'


export default function AdminDashboard() {
  return (
    <div className='flex justify-between items-center bg-cute p-4 '>

    <div className="card card-compact w-4/12 h-4/12 bg-base-100 shadow-2xl mr-24 mb-10">
  {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
  <div className="card-body "><br></br>
    <h2 className="card-title font-semibold text-black text-2xl italic">Rate Your Experience!!!</h2><br></br>
  
    <div className="card-actions justify-end pb-10">
      <button className="btn bg-black pl-9 w-full max-w-s font-semibold text-white text-xl">Submit</button>
    </div>
  </div>
</div>
</div>
  )
};
