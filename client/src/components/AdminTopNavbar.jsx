import React from 'react'
import logo from '../assets/Logo.PNG'

function AdminTopNavbar() {
  return (
    <div className="bg-cute p-4 border-b-4 h-[120px]">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <div>
          <img src={logo} alt="Logo" className="h-[100px] border-none " />
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminTopNavbar