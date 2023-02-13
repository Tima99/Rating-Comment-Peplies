import React from "react";

const StarRating = ({rating, setRating}) => {
    
    let move = {x: null, y: null}

    function hoverStarRating(e){
        let dir =  move.x !== null ? e.clientX - move.x : null
        // checking direction : forward 1 , backward -1

        move.x = e.clientX
        // reintialize old x value with new one

        if(dir === null) return
        // if dir has null return 
        
        if(e.target.matches('i')){
            // is hover over star
            const starContainer = e.target.parentElement
            if(!starContainer) return

            if(dir >= 0){
                starContainer.classList.add('active-star')
                let allFrontActiveStar = starContainer.previousElementSibling
                while(allFrontActiveStar && !allFrontActiveStar.className.includes("active-star")){
                    allFrontActiveStar.classList.add('active-star')
                    allFrontActiveStar = allFrontActiveStar.previousElementSibling
                }
            }
            else if(dir < 0){
                starContainer?.classList.remove('active-star')
                
                let allFrontActiveStar = starContainer.nextElementSibling
                while(allFrontActiveStar && allFrontActiveStar.className.includes("active-star")){
                    allFrontActiveStar.classList.remove('active-star')
                    allFrontActiveStar = allFrontActiveStar.nextElementSibling
                }
            }
            const num = e.currentTarget && e.currentTarget.getElementsByClassName('active-star').length
            setRating(num)
        }
    }
    
    
    return (
        <div className="relative" id="rating-container">
                {/* <i style={{ cursor: "pointer" }} className="reaction-icon star-rating" id="star-rating-icon">
                    ⭐<sup>{rating || ""}</sup>
                </i>
                <i style={{ filter: "grayscale(1)", position: "absolute", left: "0", zIndex: "-1" }}>⭐</i> */}
            <div className="star-rating-container" onMouseMove={hoverStarRating}>
                <span>
                    <i>⭐</i>
                    <i>⭐</i>
                </span>
                <span>
                    <i>⭐</i>
                    <i>⭐</i>
                </span>
                <span>
                    <i>⭐</i>
                    <i>⭐</i>
                </span>
                <span>
                    <i>⭐</i>
                    <i>⭐</i>
                </span>
                <span>
                    <i>⭐</i>
                    <i>⭐</i>
                </span>
            </div>
            <div>
                Rating : {rating}
            </div>
        </div>
    );
};

export default StarRating;
