import styles from './style.module.scss'

import { useEffect, useState } from 'react';

import { TiShoppingCart } from "react-icons/ti";
import { SectionCardProps } from "../../page";


interface HomeProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    listDataBuy: SectionCardProps[],
    timesArray: number[],
}

export function Header({ setOpen, listDataBuy, timesArray }: HomeProps) {
    const [totalItemsCart, setTotalItemsCart] = useState(0)

    useEffect(() => {
        setTotalItemsCart(listDataBuy.reduce((total, current, i) => total + timesArray[i], 0));
    }, [timesArray])

    return (
        <header className={styles.containerHeader}>
            <h1 className={styles.logo}>MKS <span className={styles.logoSpan}>Sistemas</span></h1>

            <button className={styles.shoppingCart} onClick={() => setOpen(true)}>
                <TiShoppingCart size={'20px'}/>
                <span className={styles.value}>{totalItemsCart}</span>
            </button>
        </header>
    )
}