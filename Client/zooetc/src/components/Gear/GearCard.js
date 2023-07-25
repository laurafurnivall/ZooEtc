import { Card } from "antd";
import { CardBody, CardImg, CardLink, CardText, CardTitle } from "reactstrap";
import "./Gear.css"

export default function GearCard({ id, title, description, purchaseUrl, imgUrl }) {

    return <>
        <Card className="gearCard">
            <CardImg
                alt="Gear image"
                src={imgUrl}
                top
                width="100%"
                />
            <CardBody>
                <CardTitle tag="h5"> 
                    {title}
                </CardTitle>
                <CardText>
                    {description}
                </CardText>
                <CardLink 
                    className="gearCardLink"
                    href={purchaseUrl}
                    onClick={(e) => {
                        e.preventDefault();
                        window.open(purchaseUrl, '_blank'); 
                    }}>
                    Buy
                </CardLink>
            </CardBody>
        </Card>
    </>
}