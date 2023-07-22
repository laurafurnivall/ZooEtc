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

export default function ZooForm() {
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return<>
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
        <Input/>    
        </Form.Item>

    </Form>
    </>
}