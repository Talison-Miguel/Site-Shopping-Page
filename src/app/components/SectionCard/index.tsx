import styles from './style.module.scss'

import { Card } from "../Card";
import { useEffect, useState } from 'react';
import { ShoppingPage } from '../ShoppingPage';

import { SectionCardProps } from "../../page";

interface HomeProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    listDataBuy: SectionCardProps[],
    setListDataBuy: React.Dispatch<React.SetStateAction<SectionCardProps[]>>,
    timesArray: number[],
    setTimesArray:React.Dispatch<React.SetStateAction<number[]>>,
}

export function SectionCard({ open, setOpen, listDataBuy, setListDataBuy, timesArray, setTimesArray}: HomeProps) {
    const [data, setData] = useState<SectionCardProps[]>([]);
    const [dataBuy, setDataBuy] = useState<SectionCardProps>()!;

    useEffect(() => {
        fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=name&orderBy=DESC')
            .then(reponse => reponse.json())
            .then(data => setData(data.products))
    },[])


    useEffect(() => {
        if (dataBuy) { 
            const idAlreadyExists = listDataBuy.some(item => item.name === dataBuy.name);
            
            if (!idAlreadyExists) setListDataBuy(prevList => [...prevList, dataBuy])
        }
    }, [dataBuy]);

    useEffect(() => {
        setTimesArray(listDataBuy.map((item, i) => timesArray[i] > 1 ? timesArray[i] : 1));
    }, [listDataBuy])

    

    return (
        <section className={styles.container}>
            <div className={styles.containerCards}>
                {data.map((item) => (
                    <Card key={item.id} name={item.name} brand={item.brand} description={item.description} price={item.price} photo={item.photo} setDataBuy={setDataBuy} />
                ))}
            </div>

            {
                open && <ShoppingPage open={open} setOpen={setOpen} listDataBuy={listDataBuy} setListDataBuy={setListDataBuy} setDataBuy={setDataBuy} timesArray={timesArray} setTimesArray={setTimesArray}/>
            }
        </section>
    )
}