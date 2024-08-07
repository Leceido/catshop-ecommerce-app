'use client'

import { ReactNode, useEffect, useState } from "react";
import AppContext from "./AppContext";

interface ProviderProps {
    children: ReactNode
}

export default function Provider({children}: ProviderProps) {
    const [cartItems, setCartItems] = useState([])
    const [valorTotal, setValorTotal] = useState([])
    const [preference_Id, setPreference_Id] = useState(null)

    useEffect(() => {
        let objects:any = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key !== null && key.startsWith("id:")) {
                const value = localStorage.getItem(key)
                if (typeof value === 'string') {
                    try {
                        objects.push(JSON.parse(value))
                    } catch (e) {
                        console.log(`Não foi possível converter o valor da chave "${key}" em um objeto:`, e);
                    }
                }
            }
        }
        if (cartItems.length === 0) {
            if (objects.length !== 0) {
                setCartItems(objects)
            }
        }
    }, [])

    const value = {
        cartItems,
        setCartItems,
        valorTotal,
        setValorTotal,
        preference_Id,
        setPreference_Id
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}