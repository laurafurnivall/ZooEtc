import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Layout, Rate, Card, Tooltip, Space } from 'antd';
import { getGearItem } from "../../modules/gearManager";
import { CardBody, CardTitle } from "reactstrap";
import Meta from "antd/es/card/Meta";
import GearReviewCard from "./GearReviewCard";
import "./Gear.css"
import { ShoppingOutlined, StarOutlined } from '@ant-design/icons';
const { Footer, Sider, Content } = Layout;

export default function GearDetails() {
    const { id } = useParams();
    const [item, setItem] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getGearItem(id).then(setItem);
    }, []);

    if (!item) {
        return null
    }

    const averageRate = item.gearReviews.map((gr) => gr.averageRating)

    const average = averageRate.reduce((total, rating) => total + rating, 0) / averageRate.length

    return (<>
        <Layout>
            <Sider className="siderGear" width={350}>
                <Card className="gearCard"
                    actions={[
                        <Space>
                            <Tooltip title="Shop for this item?">
                                <ShoppingOutlined
                                    key="shopping"
                                    className="gearCardLink"
                                    href={item.purchaseUrl}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(item.purchaseUrl, '_blank');
                                    }} />
                            </Tooltip>
                            <Tooltip title="Leave a review?">
                                <StarOutlined
                                    className="gearCardLink"
                                    onClick={() => {
                                        navigate(`/Gear`);
                                    }} />
                            </Tooltip>
                        </Space>
                    ]}
                    cover={<img className="gearImage" alt="Gear Image" src={item.imageUrl} />}>
                    <CardTitle className="cardTitle">
                        {item.title}
                    </CardTitle>
                    <CardBody>
                        Average Rating: <Rate className="gearRating" disabled defaultValue={average} />
                    </CardBody>
                    <Meta className="metaCard"
                        description={item.description}
                    />
                </Card>
            </Sider>
            <Content className="contentGear">
                <h4>Reviews</h4>
                {
                    item.gearReviews.map((gr) =>
                        <GearReviewCard
                            key={gr.id}
                            id={gr.id}
                            reviewDate={gr.reviewDate}
                            longevity={gr.longevity}
                            versatility={gr.versatility}
                            comfort={gr.comfort}
                            comments={gr.comments}
                            averageR={gr.averageRating} />
                    )
                }
            </Content>
        </Layout>
    </>
    )
}