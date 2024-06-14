'use client'

import CarrinhoComprasComponent from "@/components/produtos/CarrinhoComprasComponent"
import AppContext from "@/context/AppContext"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"

export default function Carrinho() {
    const { cartItems } = useContext(AppContext)

    if (cartItems.length !== 0) {
        return (
            <CarrinhoComprasComponent data={cartItems} />
        )
    } else {
        return (
            <div className="text-center p-10 text-3xl">
                <h1>Carrinho vazio</h1>
                <Link className="bg-primary-orange text-primary-l_green hover:bg-primary-orange/90 hover:text-primary-l_green/90 rounded-full p-2 text-sm cursor-pointer" href='/'>Adicione itens ao carrinho</Link>
            </div>
        )
    }   
}