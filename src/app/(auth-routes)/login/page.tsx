'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'
import logo from '../../../../public/pata-gato.svg'

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const router = useRouter()

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault()


        const result = await signIn('credentials', {
            email: email,
            senha: senha,
            redirect: false
        })

        if (result?.error) {
            return
        }

        window.location.reload()
        router.replace('/')
    }

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sms">
                    <Image className='text-center mx-auto' src={logo} alt='logo-gato' width={50} height={50} />
                    <h2 className="mt-10 text-center text-2xl font-black leading-9 tracking-tight text-gray-900">
                        Faça login na sua conta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                                E-mail:
                            </label>
                            <div className='mt-2'>
                                <input
                                    type="email"
                                    id='cpf'
                                    name="cpf"
                                    required
                                    autoComplete='off'
                                    className="block w-full bg-primary-orange rounded-md border-0 px-1 py-1.5 text-primary-l_green shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-l_orange sm:text-sm sm:leading-6"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Senha:
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-primary-orange hover:text-orange-300">
                                        Esqueceu a senha?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
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
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Não é cliente?{' '}
                        <Link href='/cadastrar' className="font-semibold leading-6 text-primary-orange hover:text-orange-300">
                            Cadastre-se agora
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}