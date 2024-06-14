'use client'

import AppContext from "@/context/AppContext"
import { useContext, useEffect, useState } from "react"

export default function ValorTotalComponent() {
    const { cartItems } = useContext(AppContext)
    const [sum, setSum] = useState<number>(0)


    useEffect(() => {
        let total = 0
        cartItems.map((item:any) => {
            total += item.preco * item.quantidade_selecionada
        })
        setSum(total)
    }, [cartItems]);
    

    return (

        <div className="text-lg font-bold flex flex-col">
            <p>SubTotal: R$ {sum}</p>
            <p>Frete: Gratis</p>
            <p>Descontos: Sem cupom</p>
            <p className="font-black">Total: R$ {sum}</p>
        </div>
    )
}