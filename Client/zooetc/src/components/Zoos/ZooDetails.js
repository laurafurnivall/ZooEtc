import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getZoo } from "../../modules/zooManager";
import { Layout, Rate, Space, Tooltip } from 'antd';
import "./Zoos.css"
import ZooReviewCard from "./ZooReviewCard";
import { StarOutlined } from '@ant-design/icons';
const { Footer, Content } = Layout;

export default function ZooDetails( {userProfile }) {
    const { id } = useParams();
    const [zoo, setZoo] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getZoo(id).then(setZoo);
    }, []);

    if (!zoo) {
        return null
    }

    const averageRate = zoo.zooReviews.map((zr) => zr.averageRating)
    const average = averageRate.reduce((total, rating) => total + rating, 0) / averageRate.length

    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
            size={[0, 48]}
        >
            <Layout>

                <Content className="zooDetailsContent">
                    <div>
                        {
                            zoo.zooImgUrl ? (<img className='zooImgOnDetails' src={zoo.zooImgUrl} alt="Zoo Logo" />) : ""
                        }
                    </div>
                    <div className="zooInfo">
                        <h3>{zoo.zooName}</h3>
                        <div>Average Rating: <Rate className="zooRating" allowhalf disabled defaultValue={average} /></div>
                        <p>
                            {zoo.address}<br></br>
                            {zoo.phoneNumber}
                        </p>
                        <p>{zoo.description}</p>
                    </div>
                </Content>
            </Layout>
            <Layout>
                <Footer className="zooDetailsReviews">
                    <div className="zooReviewAndAdd">
                        <Tooltip title="Leave a review?">
                            <StarOutlined
                                className="zooCardLink"
                                onClick={() => {
                                    navigate(`/ZooReviews/Add/${zoo.id}`);
                                }} />
                        </Tooltip><h4>Reviews</h4>
                    </div>
                    {
                        zoo.zooReviews.map((zr) =>
                            <ZooReviewCard
                                key={zr.id}
                                id={zr.id}
                                reviewDate={zr.reviewDate}
                                animalCare={zr.animalCare}
                                culture={zr.culture}
                                conservationInitiative={zr.conservationInitiative}
                                salary={zr.salary}
                                benefits={zr.benefits}
                                leadership={zr.leadership}
                                inclusivity={zr.inclusivity}
                                comments={zr.comments}
                                userProfile={userProfile}
                                userId={zr.userId}
                            />
                        )
                    }
                </Footer>
            </Layout>
        </Space>
    )
}