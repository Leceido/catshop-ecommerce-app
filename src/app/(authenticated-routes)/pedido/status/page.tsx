'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function StatusPedido() {
    const searchParams = useSearchParams()

    const queryParams = {
        collectionId: searchParams.get('collection_id'),
        collectionStatus: searchParams.get('collection_status'),
        paymentId: searchParams.get('payment_id'),
        status: searchParams.get('status'),
        externalReference: searchParams.get('external_reference'),
        paymentType: searchParams.get('payment_type'),
        merchantOrderId: searchParams.get('merchant_order_id'),
        preferenceId: searchParams.get('preference_id'),
        siteId: searchParams.get('site_id'),
        processingMode: searchParams.get('processing_mode'),
        merchantAccountId: searchParams.get('merchant_account_id')
      };

    return (
        <div className="flex flex-col justify-center items-center mt-10 space-y-3">
            <div className="text-3xl">
                Status Pedido: {queryParams.status}
            </div>
            <Link className="hover:underline text-xl hover:text-primary-orange/90" href={'/user/pedidos'}>Ver Pedidos</Link>
            <Link className="hover:underline text-xl hover:text-primary-orange/90" href={'/'}>Pagina Inicial</Link>
        </div>
    )
}