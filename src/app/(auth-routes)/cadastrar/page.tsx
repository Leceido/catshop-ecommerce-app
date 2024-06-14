'use client'

import { SyntheticEvent, useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import logo from '../../../../public/pata-gato.svg'

export default function Cadastrar() {
    const [nome, setNome] = useState<string>('')
    const [user, setUser] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const router = useRouter()

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault()
        try {
            const response = await fetch('http://127.0.0.1:5000/api/usuario/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: nome,
                    user: user,
                    email: email,
                    senha: senha,
                })
            })
            const data = await response.json()
            if (response.status == 401) {
                alert(data.error)
            }
            if (response.status == 201) {
                router.replace('/login')
            }
        } catch {
            router.replace('/login')
        }
    }

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sms">
                    <Image className='text-center mx-auto' src={logo} alt='logo-gato' width={50} height={50} />
                    <h2 className="mt-10 text-center text-2xl font-black leading-9 tracking-tight text-gray-900">
                        Crie sua conta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                                Nome:
                            </label>
                            <div className='mt-2'>
                                <input
                                    type="text"
                                    id='nome'
                                    name="nome"
                                    required
                                    autoComplete='off'
                                    className="block w-full bg-primary-orange rounded-md border-0 px-1 py-1.5 text-primary-l_green shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-l_orange sm:text-sm sm:leading-6"
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                                User:
                            </label>
                            <div className='mt-2'>
                                <input
                                    type="text"
                                    id='user'
                                    name="user"
                                    required
                                    autoComplete='off'
                                    className="block w-full bg-primary-orange rounded-md border-0 px-1 py-1.5 text-primary-l_green shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-l_orange sm:text-sm sm:leading-6"
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                E-mail:
                            </label>
                            <div className='mt-2'>
                                <input
                                    type="email"
                                    id='email'
                                    name="email"
                                    required
                                    autoComplete='off'
                                    className="block w-full bg-primary-orange rounded-md border-0 px-1 py-1.5 text-primary-l_green shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-l_orange sm:text-sm sm:leading-6"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="senha" className="block text-sm font-medium leading-6 text-gray-900">
                                    Senha:
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="senha"
                                    id="senha"
                                    required
                                    className="block w-full bg-primary-orange rounded-md border-0 px-1 py-1.5 text-primary-l_green shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-l_orange sm:text-sm sm:leading-6"
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primary-orange px-3 py-1.5 text-sm font-semibold leading-6 text-primary-l_green shadow-sm hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Cadastrar
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Ja é Cliente?{' '}
                        <Link href='/login' className="font-semibold leading-6 text-primary-orange hover:text-orange-300">
                            Faça login agora
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}