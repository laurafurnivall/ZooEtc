import {  Card, Space } from "antd";
import {  CardTitle } from "reactstrap";
import "./Gear.css"
import { ShoppingOutlined, EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'antd';
import Meta from "antd/es/card/Meta";

export default function GearCard({ userProfile, id, title, description, purchaseUrl, imgUrl, showConfirm }) {
    const navigate = useNavigate();

    return <>
        <Card className="gearCard"
            cover={<img alt="Gear Image" src={imgUrl} />}
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
            <Meta className="metaCard"
                description={description}
            />

        </Card>
    </>
}