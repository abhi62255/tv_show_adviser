import { StarFill, StarHalf, Star as StarEmpty } from "react-bootstrap-icons"


export function FiveStarRating({rating}){

    const starList = [];

    const StartFillCount = Math.floor(rating);

    const hasHalfStar = rating - parseInt(rating) >= 0.5;

    const emptyStarCount = 5 - StartFillCount - (hasHalfStar ? 1 : 0);

    for (let i=1; i<= StartFillCount; i++){
        starList.push(<StarFill key={"start-fill"+i}></StarFill>);
    }

    if (hasHalfStar){
        starList.push(<StarHalf key={"start-half"}></StarHalf>)
    }

    for (let i= 1; i<= emptyStarCount; i++){
        starList.push(<StarEmpty key={"start-empty"}></StarEmpty>)
    }





    return (
        <div>
            {starList}
        </div>
    )
}