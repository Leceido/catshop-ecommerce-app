'use client'

import { ChangeEvent, useState } from "react"

export default function AnunciarProdutoComponent({session}:any) {
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('0')
    const [quantidade, setQuantidade] = useState('0')
    const [imagensNovas, setImagensNovas] = useState<string[]>([])
    const [formData] = useState(new FormData());

    const salvar = async () => {
        formData.append('nome', nome);
        formData.append('preco', preco);
        formData.append('quantidade', quantidade);
        

        const response = await fetch(`http://127.0.0.1:5000/api/product/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${session.token}`
            },
            body: formData
        })

        console.log(await response.json());
        

        window.location.replace('/user/anuncios')

    }

    const deletarNovaImagem = async (imagem: any) => {
        const filterData = await imagensNovas.filter((imagemNova: any) => imagemNova.id !== imagem.id)
        setImagensNovas(filterData)
    }

    const handleImageRead = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const readers: FileReader[] = [];
            for (let i = 0; i < files.length; i++) {
                
                const reader = new FileReader();
                readers.push(reader);
                formData.append('images', files[i])
                reader.onload = (event) => {
                    if (event.target?.result) {
                        const id = Math.floor(Math.random() * 100000); // Gerando um ID numérico aleatório
                        const imagem = event.target.result as string;
                        const novaImagem = { id, imagem };
                        //@ts-ignore
                        setImagensNovas((prevImageSrcs: any) => [...prevImageSrcs, novaImagem]);
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center p-2 m-2">
            <form className="bg-primary-orange text-primary-l_green p-2 rounded-lg w-full sm:w-auto sm:px-4" action="">
                <div className="flex flex-col sm:flex-row justify-between sm:space-x-2">
                    <div className="flex flex-col">
                        <label htmlFor="nome">Nome</label>
                        <input
                            className=" bg-primary-l_green text-primary-orange hover:bg-primary-l_green/90 hover:text-primary-orange/90 rounded-lg px-2 sm:w-52"
                            type="text"
                            name="nome"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nome">Preço</label>
                        <input
                            className=" bg-primary-l_green text-primary-orange hover:bg-primary-l_green/90 hover:text-primary-orange/90 rounded-lg px-2 sm:w-32"
                            type="text"
                            name="preco"
                            id="preco"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantidade">Quantidade</label>
                        <input
                            className=" bg-primary-l_green text-primary-orange hover:bg-primary-l_green/90 hover:text-primary-orange/90 rounded-lg px-2 sm:w-32"
                            type="number"
                            name="quantidade"
                            id="quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                        />
                    </div>
                </div>

            </form>

            <div>
                <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6 gap-2">
                    {imagensNovas.map((imagem: any, index: any) => (
                        <div key={index} className="flex flex-col items-center justify-center bg-primary-orange rounded-lg mt-2 p-1">
                            <div className="max-h-[100px] min-h-[100px] w-24 h-24 p-2">
                                <img className="contrast-100 hover:contrast-75 brightness-100 hover:brightness-125 cursor-pointer object-cover w-full h-full rounded-lg border-2 border-primary-orange" src={imagem.imagem} alt="" />
                            </div>
                            <div onClick={() => deletarNovaImagem(imagem)} className="text-center rounded-full text-white bg-red-500 px-4 py-1 contrast-100 hover:contrast-75 brightness-100 hover:brightness-125 cursor-pointer">
                                <h1>X</h1>
                            </div>
                        </div>
                    ))}
                    <div className="max-h-[100px] min-h-[100px] w-24 h-24 p-2">
                        <div className="contrast-100 hover:contrast-75 brightness-100 hover:brightness-125 cursor-pointer w-full h-full rounded-lg border-2 border-primary-orange bg-orange-200 text-center text-6xl flex items-center justify-center">
                            <label className="cursor-pointer w-full h-full mt-2" htmlFor="small_size">
                                +
                                <input
                                    className="hidden "
                                    id="small_size"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageRead}
                                />
                            </label>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <button onClick={salvar}>Salvar</button>
            </div>
        </div>
    )
}