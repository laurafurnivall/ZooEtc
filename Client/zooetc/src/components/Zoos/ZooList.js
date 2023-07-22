import React, { useRef, useEffect, useState } from "react";
import { getAllZoos } from "../../modules/zooManager";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useNavigate } from "react-router-dom";

export default function ZooList({userProfile}) {
    const [zoos, setZoos] = useState([]);
    const [filteredZoos, setFilteredZoos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        getAllZoos().then((zoos) => {
            setZoos(zoos);
            setFilteredZoos(zoos);
        });
    }, [zoos]);
    
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };


    const data = filteredZoos.map((z) => ({
        key: z.id,
        ZooName: z.zooName,
        City: z.city,
        State: z.state,

    }));


    const handleReset = (clearFilters) => {
        if (clearFilters) {
            clearFilters();
        }
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {clearFilters && handleReset(clearFilters) && getAllZoos();}}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Zoo Name',
            dataIndex: 'ZooName',
            key: 'ZooName',
            width: '30%',
            ...getColumnSearchProps('ZooName')
        },
        {
            title: 'City',
            dataIndex: 'City',
            key: 'City',
        },
        {
            title: 'State',
            dataIndex: 'State',
            key: 'State',
            ...getColumnSearchProps('State'),
        },
    ];

    return <>
    {userProfile.isAdmin === true ? <Button 
    onClick={() =>
        navigate("./Add")}>Add a Zoo</Button> : ""}
    <Table columns={columns} dataSource={data} />
</>
}
