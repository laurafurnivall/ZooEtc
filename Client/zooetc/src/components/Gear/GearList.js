import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllGearItems } from "../../modules/gearManager";

export default function GearList({ searchTermState }) {
    const [gearItems, setGearItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllGearItems().then((items) => {
            setGearItems(items);
        });
    }, []);
    return <></>
}