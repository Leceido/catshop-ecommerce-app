import HomeProdutosComponent from "@/components/produtos/HomeProdutosComponent"
import Link from "next/link"

export default async function HomeLoja() {
    const response = await fetch('http://127.0.0.1:5000/api/product/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
        cache: "no-store"
    })



    if (response.ok) {
        const data = await response.json()

        const filterData = data.produtos.filter((produto:any) => produto.quantidade > 1)

        return (
            <HomeProdutosComponent data={filterData}/>
        )
    } else {
        return (
            <h1 className="text-center text-lg">Nenhum produto encontrado</h1>
        )
    }
}