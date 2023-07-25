import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { editGear, getGearItem } from "../../modules/gearManager";
import GearForm from "./GearForm";

export default function GearEdit() {
    const { id } = useParams();

    useEffect(() => {
        getGearItem(id).then((fetchedGear) => {
            updateGear(fetchedGear);
        });
    }, [id]);

    const [gear, updateGear] = useState({
        id: id,
        title: "",
        description: "",
        purchaseUrl: "",
        imageUrl: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        updateGear((prevGear) => ({
            ...prevGear,
            [name]: value,
        }));
    };

    const handleSave = (event) => {
        event.preventDefault();

        editGear(id, gear)
            .then(() => navigate("/Gear"))
    }
    return <>
        <h4>Edit Item:</h4>
        <GearForm
            title={gear.title}
            description={gear.description}
            purchaseUrl={gear.purchaseUrl}
            imgageUrl={gear.imgageUrl}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
        />
    </>
}