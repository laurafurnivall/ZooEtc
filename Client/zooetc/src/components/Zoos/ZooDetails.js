import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { getZoo } from "../../modules/zooManager";
import { Layout, Space } from 'antd';
const { Footer, Sider, Content } = Layout;

const contentStyle = {
    minHeight: 120,
    color: '#000',
    margin: '10px 20px',
    padding: "10px"
};
const siderStyle = {
    color: '#fff',
    width: 400,
    padding: "10px",
    textAlign: "center",
    backgroundColor: '#fff',
    margin: '10px'
};
const footerStyle = {
    color: '#fff',
    backgroundColor: '#7dbcea',
};

export default function ZooDetails() {
    const { id } = useParams();
    const [zoo, setZoo] = useState();

    useEffect(() => {
        getZoo(id).then(setZoo);
    }, []);

    if (!zoo) {
        return
    }

    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
            size={[0, 48]}
        >
            <Layout>
                <Sider style={siderStyle} width={300}>
                    {
                        zoo.zooImgUrl ? (<img src={zoo.zooImgUrl} alt="Zoo Logo" />) : ""
                    }
                </Sider>
                <Content style={contentStyle}>
                    <h3>{zoo.zooName}</h3>
                    <p>
                        {zoo.address}<br></br>
                        {zoo.phoneNumber}
                    </p>

                    <p>{zoo.description}</p>
                </Content>
            </Layout>
            <Layout>
                <Footer style={footerStyle}>
                   <h4>Reviews</h4>
                    
                </Footer>
            </Layout>
        </Space>
    )
}