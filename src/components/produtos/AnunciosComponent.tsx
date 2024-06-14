'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AnunciosComponent({data, items}:any) {
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
            <Link href='/user/anunciar' className="bg-primary-orange text-primary-l_green hover:bg-primary-orange/90 hover:text-primary-l_green/90 rounded-full p-2 cursor-pointer">
                Anunciar Produto
            </Link>
            <div className="bg-primary-orange text-primary-l_green p-2 rounded-lg">
                {dataFilter.map((produto: any) => (
                    <div key={produto.id} className="border-primary-l_orange border-b-[1px] flex flex-row space-x-1">
                        <div className="hidden sm:flex sm:visible my-1">
                            <div className="w-40 h-36 max-h-36 max-w-[160px] min-h-[136px]">
                                {produto.imagens.length === 0 ? (
                                    <img className="object-cover w-full h-full rounded-lg" src={"/pata-gato-verde.svg"} alt="foto produto" />) : (
                                        <img className="object-cover w-full h-full rounded-lg" src={produto.imagens[0].url} alt="foto produto" />
                                    )}
                                
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1 className="sm:text-xl font-bold">Produto: {produto.id}</h1>
                            </div>
                            <div>
                                <h1>Nome: {produto.nome}</h1>
                                <p>Preço: {produto.preco}</p>
                            </div>
                            <div>
                                {produto.quantidade === 0 ? (<h1>Quantidade: {produto.quantidade} Sem Estoque</h1>) 
                                : (<h1>Quantidade: {produto.quantidade}</h1>)}
                            </div>
                            <div className="flex flex-row">
                                <Link href={`/user/anuncios/${produto.id}`} className="flex flex-row bg-primary-l_green hover:bg-primary-l_green/90 max-w-max rounded-lg p-1 m-1 cursor-pointer">
                                    <Image src={"/edit.svg"} alt="editICon" height={25} width={25}/>
                                    <h1 className="text-primary-orange hover:text-primary-orange/90">Editar</h1>
                                </Link>
                                <div className="flex flex-row bg-red-500 hover:bg-red-500/90 max-w-max rounded-lg p-1 m-1 cursor-pointer">
                                    <Image src={"/delete.svg"} alt="editICon" height={25} width={25}/>
                                    <h1 className="text-white hover:text-white/90">Excluir</h1>
                                </div>
                            </div> 
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