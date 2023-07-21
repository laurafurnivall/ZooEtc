import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllZoos } from "../../modules/zooManager";
import { Button, Space, Table } from 'antd';

export default function ZooList() {
    const [zoos, setZoos] = useState([]);
    const navigate = useNavigate();
    const [filteredZoos, setFilteredZoos] = useState({})
    const [sortedZoos, setSortedZoos] = useState({});

    useEffect(() => {
        getAllZoos().then(setZoos);
    }, []);

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredZoos(filters);
        setSortedZoos(sorter);
    };

    const clearFilters = () => {
        setFilteredZoos({});
    }

    const clearAll = () => {
        setFilteredZoos({});
        setSortedZoos({});
    };


    let zooArray = [];
    const data = () => {
        zoos.map((z) => {
            return zooArray.push({
                key: z.id,
                ZooName: z.zooName,
                City: z.city,
                State: z.state,
                Rating: z.averageRating,
            });
        });
    };

    data();

    const average = () => {
        zoos.map((z) => {
            console.log(z.averageRating)
        })
    }
    average();

    const columns = [
        {
            title: 'Zoo Name',
            dataIndex: 'ZooName',
            key: 'zooName',
            filters: zoos.map((z) => ({
              text: z.zooName,
              value: z.zooName,
            })),
            filteredValue: filteredZoos.ZooName || null,
            onFilter: (value, record) => record.zooName && record.zooName.includes(value),
            sorter: (a, b) => {
              const aName = a.zooName || ''; // Handle potential null values
              const bName = b.zooName || ''; // Handle potential null values
              return aName.localeCompare(bName); // Use localeCompare for string comparison
            },
            sortOrder: sortedZoos.columnKey === 'zooName' ? sortedZoos.order : null,
            ellipsis: true,
          },
        {
            title: 'City',
            dataIndex: 'City',
            key: 'City',
            filters: zoos.map((z) => ({
                text: z.city,
                value: z.city,
            })),
            filteredValue: filteredZoos.city || null,
            onFilter: (value, record) => record.city.includes(value),
            sorter: (a, b) => {
                if (a.city && b.city) {
                  return a.city.length - b.city.length;
                }
                return 0;
            },
            sortOrder: sortedZoos.columnKey === 'City' ? sortedZoos.order : null,
            ellipsis: true,
        },
        {
            title: 'State',
            dataIndex: 'State',
            key: 'State',
            filters: zoos.map((z) => ({
                text: z.state,
                value: z.state,
            })),
            filteredValue: filteredZoos.state || null,
            onFilter: (value, record) => record.state.includes(value),
            sorter: (a, b) => a.state.length - b.state.length,
            sortOrder: sortedZoos.columnKey === 'State' ? sortedZoos.order : null,
            ellipsis: true,
        },
    ];

    return (<>
        <Space
            style={{
                marginBottom: 16,
            }}
        >
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table columns={columns} dataSource={zooArray} onChange={handleChange} />
    </>

    )
}
