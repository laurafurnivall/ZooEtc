import { Card, Rate, Space } from "antd";
import { CardBody, CardHeader, CardTitle } from "reactstrap";
import "./Gear.css"
import { ShoppingOutlined, EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'antd';
import Meta from "antd/es/card/Meta";

export default function GearCard({ userProfile, id, title, description, purchaseUrl, imageUrl, showConfirm, averageRating }) {
    const navigate = useNavigate();
    const average = averageRating.reduce((total, rating) => total + rating, 0) / averageRating.length;

    return <>
        <Card className="gearCard"
            cover={<img className="gearImage" alt="Gear Image" src={imageUrl} />}
            actions={[
                <Space>
                    <Tooltip title="Shop for this item?">
                        <ShoppingOutlined
                            key="shopping"
                            className="gearCardLink"
                            href={purchaseUrl}
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(purchaseUrl, '_blank');
                            }} />
                    </Tooltip>
                    <Tooltip title="Reviews and Ratings">
                        <StarOutlined
                            className="gearCardLink"
                            onClick={() => {
                                navigate(`./${id}`);
                            }} />
                    </Tooltip>
                    {userProfile && userProfile.isAdmin === true ? (
                        <Space>
                            <EditOutlined
                                className="gearCardLink"
                                onClick={() => {
                                    navigate(`./Update/${id}`);
                                }} />
                            <DeleteOutlined
                                className="gearCardLink"
                                onClick={() => { showConfirm(id) }}
                            />
                        </Space>
                    ) : null}
                </Space>

            ]}>
            <CardTitle className="cardTitle">
                {title}
            </CardTitle>
            <CardBody>
                Average Rating: <Rate className="gearRating" disabled defaultValue={average} />
            </CardBody>
            <Meta className="metaCard"
                description={description}
            />
        </Card>
    </>
}