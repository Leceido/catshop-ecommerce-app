'use client'

import { Wallet, initMercadoPago, } from '@mercadopago/sdk-react';
initMercadoPago("APP_USR-5370f463-fe58-41f9-ae8b-d868a2e875dd", { locale: 'pt-BR' });

interface preferenceIdProps {
    params: {
        preferenceId: string
    }
}

export default function PagamentoPedido({params}:preferenceIdProps) {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-primary-orange text-primary-l_green mt-20 p-4 rounded-lg ">
                <div className="text-center text-3xl">
                    Pagamento Pedido
                </div>
                <Wallet initialization={{ preferenceId: params.preferenceId, redirectMode: 'modal' }} />
            </div>
        </div>
    )
}