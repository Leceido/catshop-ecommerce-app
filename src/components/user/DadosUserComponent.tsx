'use client'

import { useState } from "react"

export default function DadosUserComponent({data}:any) {
    const[nome, setNome] = useState(data.nome)
    const[email, setEmail] = useState(data.email)
    const[user, setUser] = useState(data.user)

    return (
        <div className=" flex justify-center items-center w-full">
            <div className="w-full sm:w-3/4 md:w-2/4 bg-primary-orange text-primary-l_green rounded-lg m-2 mt-10">
                <form action="">
                    <div className="flex flex-col p-2 space-y-1">
                        <label htmlFor="nome">Nome:</label>
                        <input 
                            className="bg-primary-l_green text-primary-orange rounded-md p-1"
                            type="text" 
                            name="nome" 
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <label htmlFor="email">E-mail:</label>
                        <input 
                            className="bg-primary-l_green text-primary-orange rounded-md p-1"
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="user">User:</label>
                        <input
                            className="bg-primary-l_green text-primary-orange rounded-md p-1" 
                            type="text" 
                            name="user" 
                            id="user" 
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <div className="text-center p-1">
                            <button className="bg-primary-l_green text-primary-orange rounded-full px-2 py-1 disabled:">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}