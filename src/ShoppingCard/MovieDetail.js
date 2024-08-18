import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Titles from './Titles'
import QuantityBtn from './QuantityBtn'
import './MovieDetail.css'

export default function MovieDetail() {

    let params = useParams()
    let [movieDetail, setMovieDetail] = useState(null)

    useEffect(() => {
        // 請求API
        fetch("http://localhost:3000/data")
            .then(response => response.json())
            .then(data => {
                let movieInfo = data.find((element) => {
                    return element.id === parseInt(params.id)
                })
                setMovieDetail(movieInfo)

            })
    }, [params.id])

    return (
        <div className="movieDetailWrapper">
            {
                movieDetail &&
                <div className="movieDetailContainer">
                    <Titles mainTitle={movieDetail.name + " 電影資訊"} />
                    <div className="movieDetailContent">
                        <img className='img' src={process.env.PUBLIC_URL + "/image/" + movieDetail.image} alt={movieDetail.name} width={200} />
                        <div className="movieInfo">
                            <div className="movieDetails">
                                <p className="movieDetailItem">{movieDetail.name}</p>
                                <p className="movieDetailItem">上映日期: {movieDetail.ReleaseDate}</p>
                                <p className="movieDetailItem">價格: {movieDetail.price}</p>
                                <p className="movieDetailItem"></p>
                                {/* <p className="movieDetailItem">數量: {movieDetail.quantity}</p> */}
                            </div>
                            <QuantityBtn movieInfo={movieDetail} />
                        </div>
                    </div>
                    <Link to="/" className="backLink">回到首頁(電影列表)</Link>
                </div>
            }
        </div>
    )
}


