import { useEffect, useState } from "react"
import ZooForm from "./ZooForm"
import { useNavigate, useParams } from "react-router-dom";
import { editZoo, getZoo } from "../../modules/zooManager"

export default function ZooEdit() {
    const { id} = useParams();
    const [zoo, updateZoo] = useState({
        id: id,
        zooName: "",
        address: "",
        city: "",
        state: "",
        phoneNumber: "",
        zooImgUrl: "",
        zooUrl: "",
        description: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        getZoo(id).then(updateZoo);
    }, [id]);    

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;

        const zooCopy = { ...zoo }

        zooCopy[key] = value;

        updateZoo(zooCopy);
    }

    const handleSave = (event) => {
        event.preventDefault();

        editZoo(id, zoo)
            .then(() => navigate("/Zoos"))
    }

    return <>
        <h4>Edit Zoo Information:</h4>
        <ZooForm
            zooName={zoo.zooName}
            address={zoo.address}
            city={zoo.city}
            state={zoo.state}
            phoneNumber={zoo.phoneNumber}
            zooImgUrl={zoo.zooImgUrl}
            zooUrl={zoo.zooUrl}
            description={zoo.description}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            />

    </>
}