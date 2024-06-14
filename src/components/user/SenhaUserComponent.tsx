'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SenhaUserComponent({session}:any) {
    const[novaSenha, setNovaSenha] = useState("")
    const router = useRouter()

    const salvar = async (event:any) => {
        event.preventDefault()
        const response = await fetch('http://127.0.0.1:5000/api/usuario/senha', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${session.token}`
            },
            body: JSON.stringify({
                senha: novaSenha
            })
        })
        const data = await response.json()

        alert(data.message)
        router.replace('/user')

    }

    return (
        <div className=" flex justify-center items-center w-full">
            <div className="w-full sm:w-2/4 md:w-1/4 bg-primary-orange text-primary-l_green rounded-lg m-2 mt-10">
                <form action="">
                    <div className="flex flex-col p-2 space-y-1">
                        
                        <label htmlFor="novaSenha">Nova Senha</label>
                        <input 
                            className="bg-primary-l_green text-primary-orange rounded-md p-1"
                            type="password" 
                            name="novaSenha" 
                            id="novaSenha" 
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />
                        <div className="text-center p-1">
                            <button onClick={salvar} className="bg-primary-l_green text-primary-orange hover:bg-primary-l_green/90 hover:text-primary-orange/90 rounded-full px-2 py-1 disabled:">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}