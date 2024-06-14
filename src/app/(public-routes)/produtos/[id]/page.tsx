import ProdutoComponent from "@/components/produtos/ProdutoComponent"

interface IdProps {
    params: {
        id: string
    }
}

export default async function Produto({ params }: IdProps) {
    try {

        const response = await fetch(`http://127.0.0.1:5000/api/product/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            cache: "no-store"
        })

        if (response.status == 404) {
            return (
                <h1>Produto não encontrado</h1>
            )
        }

        if (!response.ok) {
            return (
                <h1>Falha ao buscar o produto</h1>
            )
        } else {
            const data = await response.json()
            return (
                <ProdutoComponent produto={data.produto}/>
            )
        }
    } catch (error) {
        return (
            <h1>500 Internal Server Error</h1>
        )
    }
    
}