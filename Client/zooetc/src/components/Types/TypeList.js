import React, { useEffect, useState } from "react"
import { getAllTypes } from "../../modules/typeManager";
import { CardGroup } from "reactstrap";
import TypeCard from "./TypeCard";
import "./Types.css"
import { addType } from "../../modules/typeManager";
import { PlusCircleOutlined } from "@ant-design/icons"
import { Tooltip, Modal, Form, Input } from "antd"
import { ExclamationCircleFilled } from '@ant-design/icons';
import "./Types.css"
import { deleteType, editType } from "../../modules/typeManager";

export default function TypeList({ searchTermState, userProfile }) {
    const [types, setTypes] = useState([]);
    const [filteredTypes, setFilteredTypes] = useState([]);
    const { confirm } = Modal;

    const showConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this item?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                deleteType(id)
                getAllTypes().then((t) => {
                    setTypes(t);
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const [newType, addNewType] = useState({
        type: ""
    })

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false)
    }
    const handleOk = () => {
        addType(newType)
        closeModal(getAllTypes().then((types) => {
            setTypes(types);
        }));

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;

        const newTypeCopy = { ...newType }

        newTypeCopy[key] = value;

        addNewType(newTypeCopy);
    }

    useEffect(() => {
        getAllTypes().then((types) => {
            setTypes(types);
        });
    }, []);

    useEffect(
        () => {
            setFilteredTypes(types)
        },
        [types]
    )

    useEffect(() => {
        if (searchTermState === "") {
            getAllTypes().then((types) => {
                setTypes(types);
            })
        } else {
            const searchedTypes = filteredTypes.filter(oneItem => {
                return oneItem.type.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFilteredTypes(searchedTypes)
        }
    }, [searchTermState])

    return <>
        <Tooltip title="Add a new type?">
            <PlusCircleOutlined className="addTypeIcon" onClick={showModal} />
        </Tooltip>
        <Modal title="Add Type" open={isModalOpen} okText="Save" onOk={handleOk} onCancel={handleCancel}>
            <Form name="TypeForm">
                <Form.Item
                    title="New Type"
                    name="type">
                    <Input
                        id="type"
                        value={newType}
                        onChange={handleInputChange}
                        name="type" />
                </Form.Item>
            </Form>
        </Modal>
        <CardGroup className="typesCardGroup">
            {
                filteredTypes.map((t) =>
                    <TypeCard
                        typetoEdit={t}
                        key={t.id}
                        typeId={t.id}
                        type={t.type}
                        setTypes={setTypes}
                        showConfirm={showConfirm}
                    />)
            }
        </CardGroup>
    </>
}