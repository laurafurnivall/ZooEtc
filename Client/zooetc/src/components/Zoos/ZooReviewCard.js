import { Rate, Card, Space } from 'antd';
import { CardBody, CardTitle } from "reactstrap";
import "./Zoos.css"

export default function ZooReviewCard({ reviewDate, animalCare, culture, conservationInitiative, salary, benefits, leadership, inclusivity, comments }) {

    return <>
        <Card className='zooReviewCard'>
            <CardTitle>
                <h6><b>Review Date:</b> {reviewDate}</h6>
            </CardTitle>
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

            </CardBody>
        </Card>

    </>
}