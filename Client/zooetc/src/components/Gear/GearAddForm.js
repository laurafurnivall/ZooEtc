import {
    Button,
    Form,
    Input,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from "react-router-dom";

export default function GearAddForm({ title, description, purchaseUrl, imageUrl, handleInputChange, handleSave }) {

    const navigate = useNavigate();

    
    return <><Form
    className='zooform'
        name='GearForm'
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        autoComplete="off"
    >
        <Form.Item
            label="Title"
            name="title"
            rules={
                [
                    {
                        required: true,
                        message: 'Please enter an item title!',
                    },
                ]
            }
        >
            <Input
                id="title"
                value={title}
                onChange={handleInputChange}
                name="title"
            />
        </Form.Item>
        <Form.Item
            label="Purchase Url"
            name="purchaseUrl"
            rules={
                [
                    {
                        required: true,
                        message: 'Please enter a purchaseUrl!',
                    },
                ]
            }
        >
            <Input
                id="purchaseUrl"
                value={purchaseUrl}
                onChange={handleInputChange}
                name="purchaseUrl" />
        </Form.Item>
        <Form.Item
            label="Image Url"
            name="imageUrl"
            rules={
                [
                    {
                        required: true,
                        message: 'Please a imageUrl!',
                    },
                ]
            }
        >
            <Input
                id="imageUrl"
                value={imageUrl}
                onChange={handleInputChange}
                name="imageUrl" />
        </Form.Item>
        <Form.Item
            label="Description"
            name="description"
            rules={
                [
                    {
                        required: true,
                        message: 'Please enter a description!',
                    },
                ]
            }
        >
            <TextArea
                rows={4}
                id="description"
                value={description}
                onChange={handleInputChange}
                name="description" />
        </Form.Item>
        <Form.Item className='buttonGroup'>
            <Button className="zooFormButton" onClick={handleSave}>Save</Button>
            <Button className="zooFormButton" onClick={() => navigate("/Gear")}>Cancel</Button>
        </Form.Item>
    </Form >
    </>
}