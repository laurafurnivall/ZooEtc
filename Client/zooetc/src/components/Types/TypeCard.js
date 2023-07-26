import { Card, Space, Modal, Form, Input } from "antd";
import { CardTitle } from "reactstrap";
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import "./Types.css"
import { useState } from "react";
import { editType, getAllTypes } from "../../modules/typeManager";

export default function TypeCard({ typeId, type, showConfirm, setTypes }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedType, updateType] = useState({
        id: typeId,
        type: ""
    })

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false)
    }
    const handleOk = () => {
        editType(typeId, editedType)
        closeModal(getAllTypes().then((types) => {
            setTypes(types);
        }));

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


       return <>
       <Modal title="Edit Type" open={isModalOpen} okText="Save" onOk={handleOk} onCancel={handleCancel}>
            <Form name="TypeForm">
                <Form.Item
                    title="Edit Type"
                    name="type">
                    <Input
                        id="type"
                        value={type}
                        onChange={(event) => {
                            const copy = {...editedType}
                            copy.type = event.target.value
                            updateType(copy)
                        }}
                        name="type" />
                </Form.Item>
            </Form>
        </Modal>

        <Card className="typeCard"
            actions={[
                <Space>
                    <EditOutlined
    className="gearCardLink"
    onClick={() => showModal()}
/>
<DeleteOutlined
    className="gearCardLink"
    onClick={() => showConfirm(typeId)}
/>
                </Space>

            ]}>
            <CardTitle>{type}</CardTitle>
        </Card>
    </>
}