'use client';

import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SectionCard } from "./components/SectionCard";

export interface SectionCardProps {
    id: number,
    name: string,
    brand: string,
    description: string,
    price: number,
    photo: string,
}

export default function Home() {
    const [shoppingOpen, setShoppingOpen] = useState(false)
    const [listDataBuy, setListDataBuy] = useState<SectionCardProps[]>([]);
    const [timesArray, setTimesArray] = useState<Array<number>>([]);

    return (
        <>
            <Header setOpen={setShoppingOpen} listDataBuy={listDataBuy} timesArray={timesArray}/>
            <main>
                <SectionCard open={shoppingOpen} setOpen={setShoppingOpen} listDataBuy={listDataBuy} setListDataBuy={setListDataBuy} timesArray={timesArray} setTimesArray={setTimesArray}/>
            </main>
            <Footer />
        </>
    );
}
