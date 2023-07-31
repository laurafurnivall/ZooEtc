import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { editGear, getGearItem } from "../../modules/gearManager";
import GearForm from "./GearForm";

export default function GearEdit() {
    const { id } = useParams();

    const [gear, updateGear] = useState({
        id: id,
        title: "",
        description: "",
        purchaseUrl: "",
        imageUrl: ""
    });
    
    useEffect(() => {
        getGearItem(id).then((fetchedGear) => {
            updateGear(fetchedGear);
        });
    }, [id]);
    
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        updateGear((gear) => ({
            ...gear,
            [name]: value,
        }));
    };

    const handleSave = (event) => {
        event.preventDefault();

        editGear(id, gear)
            .then(() => navigate("/Gear"))
    }
    return <><article className="zooContainer"> 
        <h4>Edit Item:</h4>
        <GearForm
            title={gear.title}
            description={gear.description}
            purchaseUrl={gear.purchaseUrl}
            imageUrl={gear.imageUrl}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
        /></article>
    </>
}