import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GearCard from "./GearCard";
import { CardGroup } from "reactstrap";
import { Modal, Tooltip } from 'antd';
import { deleteGear, getAllGearItems } from "../../modules/gearManager";
import { ExclamationCircleFilled} from '@ant-design/icons';

export default function GearList({ searchTermState, userProfile }) {
    const [gearItems, setGearItems] = useState([]);
    const [filteredGear, setFilteredGear] = useState([]);
    const navigate = useNavigate();
    const { confirm } = Modal;

    const showConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this item?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                deleteGear(id)
                getAllGearItems().then((g) => {
                    setGearItems(g);
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

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
                userProfile={userProfile}
                showConfirm={showConfirm}
            />)
        }
    </CardGroup>
    </>
}