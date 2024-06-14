import AppContext from "@/context/AppContext"
import { useContext } from "react"

export default function CarrinhoComponent({ data }: any) {
    const { cartItems } = useContext(AppContext)

    return (
        <div className="w-full h-full max-w-xs bg-primary-orange text-primary-l_green fixed top-0 right-0 px-5 pb-5">
            <div className="h-24 flex justify-center items-center text-center">
                <h1 className="grow text-3xl">Meus Itens</h1>
            </div>
            <div className="flex flex-col justify-between">
                <div className="grow">
                    {cartItems.map((produto: any) => (
                        <div key={produto.id} className="flex flex-row space-x-1 border-b-[1px] border-primary-l_orange/50 py-2">
                            <div className="bg-primary-l_orange h-20 rounded-r-lg flex items-center justify-center">
                                <img className="w-full h-full bg-red-300" src={produto.imagens.url[0]} alt="foto produto" />
                                <div className="w-8 h-8 hover:bg-red-500 rounded-full p-1 absolute ">
                                    <img src="/cart-xmark.svg" alt="carrinho remover" className="align-middle" />
                                </div>
                            </div>
                            <div className="px-2">
                                <h1 className="text-lg">{produto.nome}</h1>
                                <h1 className="text-xs">Quantidade: {produto.quantidade_selecionada}</h1>
                                <h1 className="text-xl font-bold">R${produto.preco}</h1>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="">
                    Resumo Carrinho
                </div>
            </div>

        </div>
    )
}