import Image from 'next/image';
import styles from './style.module.scss'

import { FiShoppingBag } from "react-icons/fi";

interface SectionCardProps {
    name: string,
    brand: string,
    description: string,
    price: number,
    photo: string,
    setDataBuy: Function,
}

export function Card({ name, brand, description, price, photo, setDataBuy }: SectionCardProps) {
    const valueItem = price.toString().slice(0, price.toString().indexOf('.'))
    
    function handleDataBuy() {
        setDataBuy({name, brand, description, price, photo})
    }
    
    return (
        <div className={styles.cardContainer}>
            <div className={styles.product}>
                <Image src={photo} alt={name} width={200} height={200}/>
                <div className={styles.containerDescriptionProduct}>
                    <p className={styles.description}>{name}</p>
                    <span className={styles.valueProduct}>R${valueItem}</span>
                </div>
                <p className={styles.paragrafCard}>{description}</p>
            </div>
            <button className={styles.buttonBuy} onClick={handleDataBuy}>
                <FiShoppingBag fontSize={15}/>
                <span className={styles.textButtonBuy}>COMPRAR</span>
            </button>
        </div>
    )
}