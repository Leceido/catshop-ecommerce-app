'use client'

import AppContext from "@/context/AppContext"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"

interface produtoObj {
    id: string
    nome: string
    quantidade: number
    quantidade_selecionada: number
    preco: number
    imagens: [
        {
            url: string,
            name: string,
        }
    ]
}

export default function ProdutoComponent({ produto }: any) {
    const [imagem, setImagem] = useState<string>('')

    useEffect(() => {
        if (produto.imagens.length > 0) {
            setImagem(produto.imagens[0].url)
        }
    }, [produto])
   
    
    const { cartItems, setCartItems } = useContext(AppContext)

    function imagemPrincipal(url: any) {
        setImagem(url)
    }

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
            //setCountCartItems(countCartItems + 1)
            produto.quantidade_selecionada = 1
            localStorage.setItem(`${produto.id}`, JSON.stringify(produto))
            setCartItems([...cartItems, { ...produto, quantidade_selecionada: 1 }]);

        }
    }
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-3/4 sm:w-2/4 lg:w-4/12 flex flex-col space-y-2 border-2 rounded-lg mt-2 p-4">
                <div className="text-3xl font-bold">
                    <h1 className="">{produto.nome}</h1>
                </div>

                <div className="h-36 max-h-36 min-h-[144px] sm:h-64 sm:max-h-[256px] sm:min-h-[256px] md:h-96 md:max-h-[384px] md:min-h-[384px] overflow-hidden">
                    {produto.imagens.length === 0 ? (
                        <img className="rounded-lg w-full h-full object-cover border-2" src="/pata-gato.svg" alt="logo" />
                    ) : (
                        <img className="rounded-lg w-full h-full object-cover border-2" src={imagem} alt="foto produto" />
                    )}
                </div>
                <div className="flex flex-row overflow-x-scroll space-x-2 w-auto py-2">
                    {produto.imagens.map((imagem: any) => (
                        <div key={imagem.url} className="max-h-[80px] min-h-[80px] w-20 h-20 min-w-[80px]">
                            <img onClick={() => imagemPrincipal(imagem.url)} className="border-2 contrast-100 hover:contrast-75 brightness-100 hover:brightness-125 cursor-pointer rounded-lg w-full h-full object-cover" src={imagem.url} alt="foto produto" />
                        </div>
                    ))}
                </div>
                <div className="text-4xl font-bold">
                    <hr className="mt-2" />
                    R$ {produto.preco}
                </div>
                <div>

                </div>
                <div className="flex flex-row justify-center items-center">
                    <Link
                        onClick={() => handleAddCart(produto)}
                        className="bg-primary-orange text-primary-l_green hover:bg-primary-orange/90 hover:text-primary-l_green text-center text-xl px-2 py-1 rounded-full w-2/4"
                        href={`/carrinho`}
                    >
                        Comprar
                    </Link>
                    <button onClick={() => handleAddCart(produto)} className=" bg-primary-orange text-primary-l_green hover:bg-primary-orange/90 px-2 py-1 rounded-full m-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-7 align-middle">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    )
}