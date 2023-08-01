import { useEffect, useState } from "react";
import { deleteZoo, getAllZoos } from "../../modules/zooManager";
import { Modal } from 'antd';
import ZooCard from "./ZooCard";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Table } from "reactstrap";
import "./Zoos.css"


export default function ZooList({ userProfile, searchTermState }) {
    const [zoos, setZoos] = useState([]);
    const [filteredZoos, setFilteredZoos] = useState([])
    const { confirm } = Modal;

    const showConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this zoo?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                deleteZoo(id)
                getAllZoos().then((zoos) => {
                    setZoos(zoos);
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    useEffect(() => {
        getAllZoos().then((zoos) => {
            setZoos(zoos);
        });
    }, []);

    useEffect(() => {
        setFilteredZoos(zoos)
    }, [zoos])


    useEffect(() => {
        if (searchTermState === "") {
            getAllZoos().then((z) => {
                setZoos(z);
            })
        } else {
            const searchedZoos = filteredZoos.filter(z => {
                return z.zooName.toLowerCase().includes(searchTermState.toLowerCase()) || z.location.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFilteredZoos(searchedZoos)
        }
    }, [searchTermState])

 
    return <>
        <Table hover>
            <thead>
                <tr>
                    <th>
                        Zoo
                    </th>
                    <th>
                        Location
                    </th>
                    <th>
                        Website
                    </th>
                    <th>
                       {userProfile.isAdmin === true ? "Actions" : "More Info"}
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredZoos.map((z) =>
                        <ZooCard
                            key={z.id}
                            zoo={{
                                id: z.id,
                                zooName: z.zooName,
                                location: z.location,
                                zooUrl: z.zooUrl
                            }}
                            userProfile={userProfile}
                            showConfirm={showConfirm} />)
                }
            </tbody>
        </Table>
    </>

}