import HomeComponent from "@/components/home/homeComponent";
import { nextAuthOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function HomeUser() {
  const session = await getServerSession(nextAuthOptions)

  const response = await fetch('http://127.0.0.1:5000/api/usuario/', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${session?.token}`
    },

  })

  const data = await response.json()

  if (response.status === 401) {
    return <HomeComponent />
  }

  return (
    <div className="flex flex-col w-full justify-center items-center p-2 sm:p-10 mt-10">
      <div className="flex flex-col space-y-4 w-full lg:w-2/4 xl:w-2/5">
        <div className="bg-primary-orange text-primary-l_green rounded-lg px-4 py-2 flex flex-row space-x-4 md:space-x-6">
          <div className="flex items-center justify-center rounded-full border-primary-l_green border-2 p-2 w-10 h-10 min-w-[40px] min-h-[40px] sm:min-w-[56px] sm:min-h-[56px] sm:w-14 sm:h-14">
            <Image className='' src={"/cat.svg"} alt='logo-gato' width={40} height={40} />
          </div>
          <div className="w-3/4">
            <h1 className="text-lg md:text-3xl font-bold overflow-hidden text-ellipsis whitespace-nowrap"> {data.nome}</h1>
            <p className="text-xs md:text-xl overflow-hidden text-ellipsis whitespace-nowrap">{data.email}</p>
          </div>
        </div>

        <div  className="bg-primary-orange text-primary-l_green flex flex-col space-y-4 px-4 py-2 rounded-lg">
          <Link href='/user/dados' className="py-2 flex flex-row space-x-4 md:space-x-6 border-primary-l_orange border-b-[1px] hover:bg-primary-orange/90 hover:text-primary-l_green/90">
            <div className="flex items-center justify-center rounded-full border-primary-l_green border-2 p-2 w-10 h-10 min-w-[40px] min-h-[40px] sm:min-w-[56px] sm:min-h-[56px] sm:w-14 sm:h-14">
              <Image className='' src={"/user.svg"} alt='logo-gato' width={40} height={40} />
            </div>
            <div className="w-3/4">
              <h1 className="text-lg md:text-2xl overflow-hidden text-ellipsis whitespace-nowrap">Dados Pessoais</h1>
              <p className="text-xs md:text-md overflow-hidden text-ellipsis whitespace-nowrap">Informações gerais da conta</p>
            </div>
          </Link>

          <Link href='/user/senha' className="py-2 flex flex-row space-x-4 md:space-x-6 border-primary-l_orange border-b-[1px] hover:bg-primary-orange/90 hover:text-primary-l_green/90">
            <div className="flex items-center justify-center rounded-full border-primary-l_green border-2 p-2 w-10 h-10 min-w-[40px] min-h-[40px] sm:min-w-[56px] sm:min-h-[56px] sm:w-14 sm:h-14">
              <Image className='' src={"/security.svg"} alt='logo-gato' width={40} height={40} />
            </div>
            <div className="w-3/4">
              <h1 className="text-lg md:text-2xl overflow-hidden text-ellipsis whitespace-nowrap">Segurança</h1>
              <p className="text-xs md:text-md overflow-hidden text-ellipsis whitespace-nowrap">Alteração de senha</p>
            </div>
          </Link>

          <Link href='/user/pedidos' className="py-2 flex flex-row space-x-4 md:space-x-6 border-primary-l_orange border-b-[1px] hover:bg-primary-orange/90 hover:text-primary-l_green/90">
            <div className="flex items-center justify-center rounded-full border-primary-l_green border-2 p-2 w-10 h-10 min-w-[40px] min-h-[40px] sm:min-w-[56px] sm:min-h-[56px] sm:w-14 sm:h-14">
              <Image className='' src={"/shop.svg"} alt='logo-gato' width={40} height={40} />
            </div>
            <div className="w-3/4 ">
              <h1 className="text-lg md:text-2xl overflow-hidden text-ellipsis whitespace-nowrap">Meus Pedidos</h1>
              <p className="text-xs md:text-md overflow-hidden text-ellipsis whitespace-nowrap">Todas as informações e dados dos pedidos realizados</p>
            </div>
          </Link>

          <Link href='/user/anuncios' className="py-2 flex flex-row space-x-4 md:space-x-6 border-primary-l_orange border-b-[1px] hover:bg-primary-orange/90 hover:text-primary-l_green/90">
            <div className="flex items-center justify-center rounded-full border-primary-l_green border-2 p-2 w-10 h-10 min-w-[40px] min-h-[40px] sm:min-w-[56px] sm:min-h-[56px] sm:w-14 sm:h-14">
              <Image className='' src={"/announcement.svg"} alt='logo-gato' width={40} height={40} />
            </div>
            <div className="w-3/4">
              <h1 className="text-lg md:text-2xl overflow-hidden text-ellipsis whitespace-nowrap">Meus Anuncios</h1>
              <p className="text-xs md:text-md overflow-hidden text-ellipsis whitespace-nowrap">Todas as informações e dados dos anuncios</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}