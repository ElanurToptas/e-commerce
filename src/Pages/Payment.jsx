import React from 'react'
import { Purchase } from '../Components/Purchase/purchase'
import { Adress } from '../Components/Adress/adress'
import { Pay } from '../Components/Pay/pay'

export const Payment = () => {
  return (
    <div>
      <Purchase/>
      <Adress/>
      <Pay/>
    </div>
  )
}
