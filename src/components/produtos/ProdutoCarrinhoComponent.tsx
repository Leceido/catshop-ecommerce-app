'use client'

import AppContext from "@/context/AppContext"
import { useContext, useEffect, useState } from "react"

export default function ProdutoCarrinhoComponent({ produto }: any) {
    const [quantidade, setQuantidade] = useState(produto.quantidade_selecionada)
    const [valorPrdt, setValorPrdt] = useState(produto.preco * Number(quantidade))
    const { cartItems, setCartItems } = useContext(AppContext)

    function qtdDisponivel(qtd: number) {
        const options = []
        for (let index = 1; index < qtd; index++) {
            options.push(<option value={index} key={index}>{index}</option>)
        }
        return options
    }

    useEffect(() => {
        const updatedCartItems = cartItems.map((item: any) =>
            item.id === produto.id ? { ...item, quantidade_selecionada: Number(quantidade) } : item
        )

        setCartItems(updatedCartItems)


        let produtoStorage = localStorage.getItem(`id:${produto.id}`);
        //@ts-ignore
        let produtoJson = JSON.parse(produtoStorage);
        produtoJson.quantidade_selecionada = Number(quantidade);

        const updatedJsonString = JSON.stringify(produtoJson);

        localStorage.setItem(`id:${produto.id}`, updatedJsonString);

        setValorPrdt(produto.preco * Number(quantidade));
    }, [quantidade, produto.preco]);

    return (
        <div key={produto.id} className="flex flex-row space-x-1 py-2">
            <div className="bg-primary-l_orange h-20 rounded-r-lg flex items-center justify-center">
                {produto.imagens.length === 0 ? (
                    <img className="w-full h-full bg-orange-200" src={'/pata-gato.svg'} alt="foto produto" />
                ) : (
                    <img className="w-full h-full bg-orange-200" src={produto.imagens[0].url} alt="foto produto" />
                )}
                
            </div>
            <div className="flex flex-row justify-between items-center text-lg space-x-10 w-full">
                <div className="flex flex-col w-1/4">
                    <h1 className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">{produto.nome}</h1>
                    <div>
                        <label htmlFor={`qtd-select-${produto.id}`}>Qtd: </label>
                        <select
                            className="bg-primary-orange text-primary-l_green w-14 rounded-full text-center"
                            name={`qtd-select-${produto.id}`}
                            id={`qtd-select-${produto.id}`}
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                        >
                            {qtdDisponivel(produto.quantidade)}
                        </select>
                    </div>
                </div>
                <div className="w-1/4">
                    <h1>Preço Unitario</h1>
                    <h1 className="text-xl font-bold">R${produto.preco}</h1>
                </div>
                <div className="w-1/4">
                    <h1>Preço Total</h1>
                    <h1 className="text-xl font-bold">R${valorPrdt}</h1>
                </div>
            </div>
        </div>
    )
}