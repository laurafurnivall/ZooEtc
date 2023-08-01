import { Rate, Card, Space, Modal } from 'antd';
import { CardBody, CardTitle, CardFooter } from "reactstrap";
import "./Zoos.css"
import { deleteZooReview } from '../../modules/zooReviewManager';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import "./Zoos.css"
import { getZoo } from '../../modules/zooManager';

export default function ZooReviewCard({ zooId, setZoo, id, userProfile, userId, reviewDate, animalCare, culture, conservationInitiative, salary, benefits, leadership, inclusivity, comments }) {
    const { confirm } = Modal;
    const navigate = useNavigate();
    const showConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this review?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                deleteZooReview(id);
                getZoo(zooId).then(setZoo);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    if (userProfile) {
    return <>
        <Card className='zooReviewCard'>
            <CardBody>
                <Space className='zooSpace'>
                    <div><b>Animal Care: </b><Rate className="zooRatingR" disabled allowhalf defaultValue={animalCare} /></div>
                    <div><b>Benefits:</b> <Rate className="zooRatingR" disabled allowhalf defaultValue={benefits} /></div>
                    <div><b>Conservation Initiative:</b> <Rate className="zooRatingR" disabled allowhalf defaultValue={conservationInitiative} /></div>
                    <div><b>Culture: </b><Rate className="zooRatingR" disabled allowhalf defaultValue={culture} /></div>
                    <div><b>Inclusivity: </b><Rate className="zooRatingR" disabled allowhalf defaultValue={inclusivity} /></div>
                    <div><b>Leadership: </b><Rate className="zooRatingR" disabled allowhalf defaultValue={leadership} /></div>
                    <div><b>Salary: </b><Rate className="zooRatingR" disabled allowhalf defaultValue={salary} /></div>
                </Space>
                <p><b>Comments: </b>{comments}</p>
                <p style={{fontSize: 12}}><i>Review Date: {reviewDate}</i></p>
            </CardBody>
            <CardFooter className='gearReviewCardFooter'>
                {
                    userProfile && userId === userProfile.id || userProfile.isAdmin === true ? (
                        <Space>
                            <EditOutlined
                                className="gearCardLink"
                                onClick={() => {
                                    navigate(`/ZooReviews/Update/${id}`);
                                }} />
                            <DeleteOutlined
                                className="gearCardLink"
                                onClick={() => { showConfirm(id) }}
                            />
                        </Space>) : ""
                }
            </CardFooter>
        </Card>

    </>
    }
}