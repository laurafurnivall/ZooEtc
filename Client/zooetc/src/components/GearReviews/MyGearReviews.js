import { useEffect, useState } from "react"
import { getGearReviewsByUser } from "../../modules/gearReviewManager";
import MyGearReviewCard from "./MyGearReviewCard";
import { CardGroup, Spinner } from "reactstrap";
import "./GearReview.css"

export default function MyGearReviews ({userProfile}) {
    const [myReviews, setMyReviews] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getGearReviewsByUser(userProfile.id).then((reviews) => {
            setMyReviews(reviews);
            setIsLoading(false);
        })
    }, []);

    if (isLoading) {
        return <><Spinner color="dark" 
        style={{
            height: '3rem',
            width: '3rem'
          }}>Loading...</Spinner></>
    }

    if (userProfile) {
    return<>
    <article className="zooContainer">
        <h6>My Gear Reviews</h6>
        <CardGroup className="myGearReviewCards">
        {
            myReviews.map((r) => 
                <MyGearReviewCard
                key={r.id}
                id={r.id}
                reviewDate={r.reviewDate}
                longevity={r.longevity}
                versatility={r.versatility}
                comfort={r.comfort}
                comments={r.comments}
                title={r.gear.title}
                imageUrl={r.gear.imageUrl}
                description={r.gear.description}
                setMyReviews={setMyReviews}
                userProfile={userProfile}
                userId={r.userId}
                 />
            )
        }
        </CardGroup>
    </article>
    </>
    }
}