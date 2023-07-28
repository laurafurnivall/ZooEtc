import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { addGear } from "../../modules/gearManager";
import GearAddForm from "./GearAddForm";


export default function GearAdd() {
    const [newGear, addNewGear] = useState({
        title: "",
        description: "",
        purchaseUrl: "",
        imageUrl: ""
    })

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;

        const newGearCopy = { ...newGear }

        newGearCopy[key] = value;

        addNewGear(newGearCopy);
    }

    const handleSave = (event) => {
        event.preventDefault();

        addGear(newGear)
            .then(() => navigate("/Gear"))
    }
    return <>
        <h4>Add new Gear:</h4>
        <GearAddForm
            title={newGear.title}
            description={newGear.description}
            purchaseUrl={newGear.purchaseUrl}
            imageUrl={newGear.imageUrl}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
        />
    </>
}