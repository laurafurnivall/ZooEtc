import { useEffect, useState } from "react"
import ZooForm from "./ZooForm"
import { useNavigate, useParams } from "react-router-dom";
import { editZoo, getZoo } from "../../modules/zooManager"

export default function ZooEdit() {
    const { id } = useParams();

    useEffect(() => {
        getZoo(id).then((fetchedZoo) => {
            updateZoo(fetchedZoo);
        });
    }, [id]);

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        updateZoo((prevZoo) => ({
            ...prevZoo,
            [name]: value,
        }));
    };

    const handleSave = (event) => {
        event.preventDefault();

        editZoo(id, zoo)
            .then(() => navigate("/Zoos"))
    }
    console.log(zoo)
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