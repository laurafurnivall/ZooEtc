import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllGearItems } from "../../modules/gearManager";
import GearCard from "./GearCard";
import { CardGroup } from "reactstrap";

export default function GearList({ searchTermState }) {
    const [gearItems, setGearItems] = useState([]);
    const [filteredGear, setFilteredGear] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllGearItems().then((items) => {
            setGearItems(items);
        });
    }, []);

    useEffect(
        () => {
            setFilteredGear(gearItems)
        },
        [gearItems]
    )

    useEffect(() => {
        if (searchTermState === "") {
            getAllGearItems().then((items) =>{
                setGearItems(items);
            })
        } else {
            const searchedGear = filteredGear.filter(oneItem => {
                return oneItem.title.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFilteredGear(searchedGear)
        }
    }, [searchTermState])

    return <>
    <CardGroup className="gearItems">
        {
            filteredGear.map((g) => 
            <GearCard 
                key={g.id}
                id={g.id}
                title={g.title}
                description={g.description}
                purchaseUrl={g.purchaseUrl}
                imageUrl={g.imageUrl}
            />)
        }
    </CardGroup>
    </>
}