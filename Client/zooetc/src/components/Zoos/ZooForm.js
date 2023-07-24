import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

export default function ZooForm({ zooName, address, city, state, phoneNumber, zooImgUrl, zooUrl, description, handleInputChange, handleSave }) {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
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
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Zoo Name"
                name="ZooName"
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
                    placeholder='Enter zoo name here...'
                    id="ZooName"
                    value={zooName}
                    onChange={handleInputChange}
                    name="ZooName"
                />
            </Form.Item>
            <Form.Item
                label="Address"
                name="Address"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please an address!',
                        },
                    ]
                }
            >
                <Input placeholder='1234 Zoo St'
                    id="Address"
                    value={address}
                    onChange={handleInputChange}
                    name="Address" />
            </Form.Item>
            <Form.Item
                label="City"
                name="City"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please a city!',
                        },
                    ]
                }
            >
                <Input placeholder='Enter city here...'
                    id="City"
                    value={city}
                    onChange={handleInputChange}
                    name="City" />
            </Form.Item>
            <Form.Item
                label="State"
                name="State"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please a state!',
                        },
                    ]
                }
            >
                <Input placeholder='Enter state here...'
                    id="State"
                    value={state}
                    onChange={handleInputChange}
                    name="State" />
            </Form.Item>
            <Form.Item
                label="Phone number"
                name="PhoneNumber"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter a phone number!',
                        },
                    ]
                }
            >
                <Input placeholder='555-555-5555'
                    id="PhoneNumber"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    name="PhoneNumber" />
            </Form.Item>
            <Form.Item
                label="Zoo Image URL"
                name="ZooImgUrl"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter a zoo image url!',
                        },
                    ]
                }
            >
                <Input placeholder='Image URL here...'
                    id="ZooImgUrl"
                    value={zooImgUrl}
                    onChange={handleInputChange}
                    name="ZooImgUrl" />
            </Form.Item>
            <Form.Item
                label="Zoo Website Address"
                name="ZooUrl"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter a zoo website address!',
                        },
                    ]
                }
            >
                <Input placeholder='Zoo website here...'
                    id="ZooUrl"
                    value={zooUrl}
                    onChange={handleInputChange}
                    name="ZooUrl" />
            </Form.Item>
            <Form.Item
                label="Description"
                name="Description"
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
                    placeholder='Brief descirption here'
                    id="Description"
                    value={description}
                    onChange={handleInputChange}
                    name="Description" />
            </Form.Item>
            <Form.Item>
            <Button onClick={handleSave}>Save</Button>
            </Form.Item>
            
        </Form>
    </>
}