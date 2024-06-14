'use client'

import { useEffect, useState } from "react";

export default function PedidosComponent({ data, items }: any) {
    const [paginaAtual, setPaginaAtual] = useState<number>(1)
    const [dataFilter, setDataFilter] = useState([])
    const numeroDePaginas = Math.ceil(data.length / items)

    const nextPage = () => {
        if (paginaAtual < numeroDePaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const prevPage = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    useEffect(() => {
        const inicio = (paginaAtual - 1) * items;
        const fim = inicio + items;
        setDataFilter(data.slice(inicio, fim));
    }, [paginaAtual, data, items]);

    return (
        <div className="flex flex-col items-center justify-center m-2 space-y-2 ">
            <div className="bg-primary-orange text-primary-l_green p-2 rounded-lg">
                {dataFilter.map((pedido: any) => (
                    <div key={pedido.id_pedido} className="border-primary-l_orange border-b-[1px]">
                        <div>
                            <h1 className="sm:text-xl font-bold">Pedido: {pedido.id_pedido}</h1>
                        </div>
                        <div>
                            <h1>Produto: {pedido.produto.nome}</h1>
                            <p>Preço: {pedido.produto.preco}</p>
                        </div>
                        <div>
                            Quantidade: {pedido.quantidade}
                        </div>
                        <div className="font-bold sm:text-xl ">
                            Preço Total: R$ {pedido.valor_total}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-row space-x-2 items-center justify-center bg-primary-orange text-primary-l_green rounded-lg p-1 px-2">
                <div className="border-r-2 border-r-orange-600 ">
                    <button className="text-3xl hover:bg-primary-orange/90 hover:text-primary-l_green/90" onClick={prevPage}>{'<'}</button>
                </div>
                <div className="">
                    <p className="text-2xl ">{paginaAtual}</p>
                </div>
                <div className="border-l-2 border-l-orange-600">
                    <button className="text-3xl hover:bg-primary-orange/90 hover:text-primary-l_green/90" onClick={nextPage}>{'>'}</button>
                </div>
            </div>
        </div>
    )
}