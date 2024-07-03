'use client'

import AppContext from '@/context/AppContext';
import { Payment, initMercadoPago,  } from '@mercadopago/sdk-react';
import { useContext, useEffect } from "react"

initMercadoPago(`${process.env.VENDEDOR1_MERCADOPAGO_PUBLIC_KEY}`, { locale: 'pt-BR' })

export default function TesteMercadoPagoComponent() {
    useEffect(() => {
        initMercadoPago(`${process.env.VENDEDOR1_MERCADOPAGO_PUBLIC_KEY}`, { locale: 'pt-BR' })
        console.log(process.env.VENDEDOR1_MERCADOPAGO_PUBLIC_KEY);
    }, [])

    const initialization = {
        amount: 2,
        preferenceId: '1866721573-fce17183-5291-4334-80f5-93a6ac24e50d',
      };
    
      const customization = {
        paymentMethods: {
          atm: 'all',
          ticket: 'all',
          bankTransfer: ['pix'],
          creditCard: 'all',
          debitCard: 'all',
          mercadoPago: 'all',
        },
      };

    return (
        <div>
            <h1>aaaaaaa</h1>
            <Payment
                initialization={initialization}
                customization={customization}
                onSubmit={async (param) => {
                    console.log(param);
                }}
            />
        </div>
    )
}