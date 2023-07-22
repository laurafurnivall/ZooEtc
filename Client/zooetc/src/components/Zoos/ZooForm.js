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
import React, { useState } from 'react';

export default function ZooForm({ Zoo }) {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <>
        <Form
            name='zooform'
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
                <Input placeholder='Enter zoo name here...'/>
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please an address!',
                        },
                    ]
                }
            >
                <Input placeholder='1234 Zoo St'/>
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
                <Input placeholder='Enter city here...' />
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
                <Input placeholder='Enter state here...' />
            </Form.Item>
            <Form.Item
                label="Phone number"
                name="phoneNumber"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please a phone number!',
                        },
                    ]
                }
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Zoo Image URL"
                name="zooUrl"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please a zoo image url!',
                        },
                    ]
                }
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Zoo Website Address"
                name="zooUrl"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please a zoo website address!',
                        },
                    ]
                }
            >
                <Input />
            </Form.Item>
        </Form>
    </>
}