'use client'

import Image from 'next/image'
import logo from '../../../public/pata-gato-verde.svg'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { signOut } from "next-auth/react"
import AppContext from '@/context/AppContext'

export default function Navbar({ data }: any) {
  const [menu, setMenu] = useState<Boolean>(false)
  const { cartItems } = useContext(AppContext)

  function abrirMenu() {
    if (menu) {
      setMenu(false)
    }
    if (!menu) {
      setMenu(true)
    }
  }

  async function logout() {
    await signOut({
      redirect: false
    });
    window.location.reload()
  }


  return (


    <nav className=''>
      <div className='relative p-3 bg-primary-orange text-primary-l_green z-50'>
        <div className='text-3xl flex flex-row items-center '>
          <div className='cursor-pointer'>
            <Link href='/'><Image className='' src={logo} alt='logo-gato' width={50} height={50} /></Link>
          </div>
          <div className='grow'>

          </div>

          <div className='text-center hidden sm:flex flex-row space-x-4 text-lg'>
            <Link className='cursor-pointer hover:text-green-100/90 flex flex-col text-center justify-center items-center' href="/">
              <Image className='text-center' src={"/cat.svg"} alt='logo-gato' width={40} height={40} />
              <h1>Produtos</h1>
            </Link>
            <Link href='/carrinho' className='cursor-pointer hover:text-green-100/90 flex flex-col text-center justify-center items-center'>
              <div className='relative flex h-10 w-10'>
                <div className='absolute top-2  transform -translate-x-1/2 -translate-y-1/2 bg-red-500/70 text-white rounded-full flex items-center justify-center px-1 py-0'>{cartItems.length > 0 ? (cartItems.length) : null}</div>
                <Image className='text-center' src={"/cart.svg"} alt='logo-gato' width={40} height={40} />
              </div>
              <h1>Carrinho</h1>
            </Link>
            {data ? (
              <>
                <Link className='cursor-pointer hover:text-green-100/90 flex flex-col text-center justify-center items-center' href="/user">
                  <img className='w-10 h-10' src="/user.svg" alt="icon-user" />
                  <h1>{data.user.user}</h1>
                </Link>
                <div onClick={logout} className='cursor-pointer hover:text-green-100/90 flex flex-col text-center justify-center items-center'>
                  <img className='w-10 h-10' src="/logout.svg" alt="icon-logout" />
                  <p className='cursor-pointer hover:text-green-100/90'>Sair</p>
                </div>
              </>) : (
              <>
                <Link className='cursor-pointer hover:text-green-100/90 flex flex-col text-center justify-center items-center' href="/login">
                  <img className='w-10 h-10' src="/login.svg" alt="icon-login" />
                  <h1>Login</h1>
                </Link>
                <Link className='cursor-pointer hover:text-green-100/90 flex flex-col text-center justify-center items-center' href="/cadastrar">
                  <img className='w-10 h-10' src="/user-plus.svg" alt="icon-signup" />
                  <h1>Cadastrar</h1>
                </Link>
              </>)}
          </div>

          <div onClick={abrirMenu} className='flex-col text-right transition-all duration-1000 cursor-pointer sm:hidden'>
            <Image className='' src={"/line.svg"} alt='logo-gato' width={50} height={50} />
          </div>
        </div>
        <div className={menu ? 'animate-slideDown' : 'animate-slideUp'}>
          {menu && (
            <div className='text-left bg-primary-orange text-primary-l_green text-xl sm:hidden'>
              <div>
                <Link className='cursor-pointer hover:text-green-100/90 flex flex-row space-x-1' href="/">
                  <Image className='' src={"/cat.svg"} alt='logo-gato' width={25} height={25} />
                  <h1>Produtos</h1>
                </Link>
              </div>
              <div>
                <Link href='/carrinho' className='cursor-pointer hover:text-green-100/90 flex flex-row space-x-1'>
                  <div className='relative flex h-[25px] w-[25px]'>
                    <div className='absolute top-2  transform -translate-x-1/2 -translate-y-1/2 bg-red-500/70 text-white rounded-full flex items-center justify-center px-1 py-0'>{cartItems.length > 0 ? (cartItems.length) : null}</div>
                    <Image className='text-center' src={"/cart.svg"} alt='logo-gato' width={25} height={25} />
                  </div>
                  <h1>Carrinho</h1>
                </Link>
              </div>
              {data ? (<>
                <div>
                  <Link className='cursor-pointer hover:text-green-100/90 flex flex-row space-x-1' href="/user">
                    <Image className='' src={"/user.svg"} alt='logo-user' width={25} height={25} />
                    <h1>{data.user.user}</h1>
                  </Link>
                </div>
                <div className='cursor-pointer hover:text-green-100/90 flex flex-row space-x-1'>
                  <Image className='' src={"/logout.svg"} alt='logo-user' width={25} height={25} />
                  <p onClick={logout} className='cursor-pointer hover:text-green-100/90'>Sair</p>
                </div>
              </>) : <><div>
                <Link className='cursor-pointer hover:text-green-100/90' href="/login">Login</Link>
              </div>
                <div>
                  <Link className='cursor-pointer hover:text-green-100/90' href="/cadastrar">Cadastrar</Link>
                </div></>}

            </div>
          )}
        </div>
      </div>
    </nav>


  )
}