import styles from './style.module.scss'

import { useEffect, useRef, useState } from 'react';

import { CardShopping } from '../CardShopping';
import { IoCloseCircleSharp } from "react-icons/io5";

import { SectionCardProps } from "../../page";

interface ShoppingPageProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    listDataBuy: Array<SectionCardProps>,
    setListDataBuy: React.Dispatch<React.SetStateAction<SectionCardProps[]>>,
    setDataBuy: Function,
    timesArray: number[],
    setTimesArray:React.Dispatch<React.SetStateAction<number[]>>,
}

export function ShoppingPage({ open, setOpen, listDataBuy, setListDataBuy, setDataBuy, timesArray, setTimesArray}: ShoppingPageProps) {
    const [valueTotal, setValueTotal] = useState(1)
    const shoppingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (shoppingRef.current && !shoppingRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') setOpen(false);
        }

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [open, setOpen]);
    
    useEffect(() => {
        const totalPrice = listDataBuy.reduce((accumulator, currentItem, index) => {
            return accumulator + (currentItem.price * timesArray[index]);
        }, 0);
        setValueTotal(totalPrice);
    }, [timesArray, listDataBuy])

    return ( 
        <section className={`${styles.containerShoppingPage} ${open && styles.handleOpen}`} ref={shoppingRef}>
            <div className={styles.shopping}>
                <IoCloseCircleSharp className={styles.closeIcon} onClick={() => setOpen(false)}/>
                <h1>Carrinho<br/> de compras</h1>
                {listDataBuy.length > 0 ? 
                    (
                        <CardShopping listDataBuy={listDataBuy}  timesArray={timesArray} setTimesArray={setTimesArray} setListDataBuy={setListDataBuy} setDataBuy={setDataBuy}/>
                    ) : ( '' )
                }
                
            </div>
            <div>
                <div className={styles.total}>
                    <span>Total:</span> 
                    <span>R${valueTotal.toLocaleString('pt-BR').replace(/\./g, ',')}</span>
                </div>
                <button className={styles.finalizePurchase}>Finalizar Compra</button>
            </div>
        </section>
    )
}