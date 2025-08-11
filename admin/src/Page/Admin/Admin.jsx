import React from 'react'
import {Routes,Route} from 'react-router-dom'
import './Admin.css'
import '../../Components/Navbar/Navbar'
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import { AddProduct } from '../../Components/AddProduct/AddProduct'
import { ListProduct } from '../../Components/ListProduct/ListProduct'


export const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listProduct' element={<ListProduct/>}/>
      </Routes>
    </div>
  )
}
