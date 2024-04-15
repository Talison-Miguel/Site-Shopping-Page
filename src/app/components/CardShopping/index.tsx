import styles from './style.module.scss'

import Image from 'next/image'
import { IoCloseCircleSharp } from 'react-icons/io5';

import { SectionCardProps } from "../../page";

interface ShoppingPageProps {
    listDataBuy: Array<SectionCardProps>,
    timesArray: number[];
    setTimesArray: React.Dispatch<React.SetStateAction<number[]>>;
    setListDataBuy: React.Dispatch<React.SetStateAction<SectionCardProps[]>>,
    setDataBuy: Function,
}

export function CardShopping({listDataBuy, timesArray, setTimesArray, setListDataBuy, setDataBuy}: ShoppingPageProps) {
    function countItemsPlus(index: number) {
        setTimesArray(prevTimes => {
            const newTimes = [...prevTimes];
            newTimes[index] += 1;
            return newTimes;
        });
    }

    function countItemsLess(index: number) {
        setTimesArray(prevTimes => {
            const newTimes = [...prevTimes];
            if(newTimes[index] > 1) {
                newTimes[index] -= 1;
            }
            return newTimes;
        });
    }

    function handleRemoveItem(index: number) {
        setDataBuy(null)
        setListDataBuy(prevListData => {
            const newListData = [...prevListData];
            newListData.splice(index, 1);
            return newListData;
        });

        setTimesArray(prevTimes => {
            const newTimes = [...prevTimes];
            newTimes.splice(index, 1);
            return newTimes;
        });
    }

    return (
        listDataBuy.map((item, index) => (
            <div className={styles.containerShoppingItem} key={item.name}>
                <IoCloseCircleSharp className={styles.closeIcon} onClick={() => handleRemoveItem(index)}/>
                <div className={styles.shoppingItem}>
                    <Image src={item.photo} alt='test' width={90} height={90}/>
                    <p>{item.name}</p>
                    <div className={styles.containerStepButton}>
                        <div className={styles.stepButton}> 
                            <button onClick={() => countItemsLess(index)}>-</button> 
                            <div>{timesArray[index]}</div> 
                            <button onClick={() => countItemsPlus(index)}>+</button>
                        </div>
                        <span>R${item.price.toString().slice(0, item.price.toString().indexOf('.'))}</span>
                    </div>
                </div>  
            </div>
        ))
    )
}