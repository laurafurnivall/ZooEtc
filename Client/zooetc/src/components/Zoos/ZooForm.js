import {
    Button,
    Form,
    Input,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function ZooForm({ zooName, address, city,
    state, phoneNumber, zooImgUrl,
    zooUrl, description, handleInputChange,
    handleSave}) {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const navigate = useNavigate();
    return <>
        <Form
            name='ZooForm'
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
            }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
            label="Zoo Name"
            name="zooName"
            rules={
                [
                    {
                        required: true,
                        message: 'Please enter zoo name!',
                    },
                ]
            }
        >
            <Input
                id="zooName"
                defaultValue={zooName}
                value={zooName}
                onChange={handleInputChange}
                name="zooName"
            />
        </Form.Item>
        <Form.Item
            label="Address"
            name="address"
            rules={
                [
                    {
                        required: true,
                        message: 'Please enter an address!',
                    },
                ]
            }
        >
            <Input 
                id="address"
                defaultValue={address}
                value={address}
                onChange={handleInputChange}
                name="address" />
        </Form.Item>
        <Form.Item
            label="City"
            name="city"
            rules={
                [
                    {
                        required: true,
                        message: 'Please a city!',
                    },
                ]
            }
        >
            <Input 
                id="city"
                defaultValue={city}
                value={city}
                onChange={handleInputChange}
                name="city" />
        </Form.Item>
        <Form.Item
            label="State"
            name="state"
            rules={
                [
                    {
                        required: true,
                        message: 'Please a state!',
                    },
                ]
            }
        >
            <Input
                id="state"
                defaultValue={state}
                value={state}
                onChange={handleInputChange}
                name="state" />
        </Form.Item>
        <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={
                [
                    {
                        required: true,
                        message: 'Please enter a phone number!',
                    },
                ]
            }
        >
            <Input 
                id="phoneNumber"
                defaultValue={phoneNumber}
                value={phoneNumber}
                onChange={handleInputChange}
                name="phoneNumber" />
        </Form.Item>
        <Form.Item
            label="Zoo Image URL"
            name="zooImgUrl"
            rules={
                [
                    {
                        required: true,
                        message: 'Please enter a zoo image url!',
                    },
                ]
            }
        >
            <Input 
                id="zooImgUrl"
                defaultValue={zooImgUrl}
                value={zooImgUrl}
                onChange={handleInputChange}
                name="zooImgUrl" />
        </Form.Item>
        <Form.Item
            label="Zoo Website Address"
            name="zooUrl"
            rules={
                [
                    {
                        required: true,
                        message: 'Please enter a zoo website address!',
                    },
                ]
            }
        >
            <Input 
                id="zooUrl"
                defaultValue={zooUrl}
                value={zooUrl}
                onChange={handleInputChange}
                name="zooUrl" />
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
                defaultValue={description}
                id="description"
                value={description}
                onChange={handleInputChange}
                name="description" />
        </Form.Item>
        <Form.Item>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => navigate("/Zoos")}>Cancel</Button>
        </Form.Item>

    </Form >
    </>
}