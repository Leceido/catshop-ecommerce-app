export default function EditarAnuncioImagensComponent({imagensNovas, nome, preco, quantidade, data, session}:any) {
    const salvar = async () => {
        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('preco', preco);
            formData.append('quantidade', quantidade);

            console.log(formData);
            

            const response = await fetch(`http://127.0.0.1:5000/api/product/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
                body: formData
            })

            const dataFetch = await response.json()
            console.log(dataFetch);
        } catch (error) {
            console.log(error, "erro ao editar produto");
        }
    }

    return (
        <div>
            <button onClick={salvar}>
                Salvar
            </button>
        </div>
    )
}