'use client'

import AppContext from "@/context/AppContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface produtoObj {
    id: string
    nome: string
    quantidade: number
    quantidade_selecionada: number
    preco: number
    imagens: [
        {
            url: string,
            name:string
        }
    ]
}

export default function HomeProdutosComponent({ data }: any) {
    const { cartItems, setCartItems } = useContext(AppContext)
    const [countCartItems, setCountCartItems] = useState<number>(0)

    function handleAddCart(produto: produtoObj) {
        const itemIndex = cartItems.findIndex((item: produtoObj) => item.id === produto.id);
        if (itemIndex !== -1) {
            const newCartItems = cartItems.map((item: produtoObj, index: any) => {
                if (index === itemIndex) {
                    return { ...item, quantidade_selecionada: 1 };
                }
                return item;
            });
            setCartItems(newCartItems);
        } else {
            setCountCartItems(countCartItems + 1)
            produto.quantidade_selecionada = 1
            localStorage.setItem(`${produto.id}`, JSON.stringify(produto))
            setCartItems([...cartItems, { ...produto, quantidade_selecionada: 1 }]);

        }
    }

    return (
        <div className="flex flex-row flex-wrap m-4 xl:mx-36 2xl:mx-52 text-primary-l_green justify-center items-center">
            {data.map((produto: any) => (
                <div className="w-32 h-64 sm:h-2/6 sm:max-h-[400px] sm:w-full sm:max-w-[250px] md:max-w-[300px] bg-primary-orange m-2 rounded-lg flex flex-col justify-between" key={produto.id}>
                    <div>
                        <div className="bg-primary-l_orange m-2 h-24 sm:h-52 overflow-hidden rounded-2xl">
                            {produto.imagens.length != 0 ? (
                                <img className="w-full h-full object-cover" src={produto.imagens[0].url} alt="foto produto" />)
                                : (
                                    <img className="w-full h-full object-cover" src="pata-gato.svg" alt="foto produto" />
                                )}

                        </div>
                        <div className="text-md sm:text-2xl font-bold text-center align-top m-0 overflow-hidden text-ellipsis whitespace-nowrap">
                            <Link href={`/produtos/${produto.id}`} target="_blank">{produto.nome}</Link>
                        </div>
                        <div className="text-primary-l_orange text-[9px]/[12px] text-center align-top m-0">
                            Quantidade: {produto.quantidade}
                        </div>
                    </div>

                    <div className="text-primary-l_green text-md sm:text-3xl font-bold text-center align-bottom">
                        R${produto.preco}
                    </div>
                    <div className="text-center space-x-2 align-bottom flex flex-row items-center justify-center m-1 mb-3 mt-3">
                        <Link onClick={() => handleAddCart(produto)} href='/carrinho' className="text-sm sm:text-xl bg-primary-l_green text-primary-orange hover:bg-primary-l_green/90 hover:text-primary-orange px-2 py-1 rounded-full">
                            Comprar
                        </Link>
                        <button onClick={() => handleAddCart(produto)} className=" bg-primary-l_green text-primary-orange hover:bg-primary-l_green/90 hover:text-primary-orange px-2 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-7 align-middle">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </button>
                    </div>


                </div>

            ))}
        </div>
    )
}