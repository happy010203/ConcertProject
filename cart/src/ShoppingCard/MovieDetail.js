import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Titles from './Titles'
import QuantityBtn from './QuantityBtn'
import ShowMovieAndTime from './showMovieAndTime'
import './ShowMovieAndTime.css'
import './MovieDetail.css'

export default function MovieDetail() {

    let params = useParams()
    let [movieDetail, setMovieDetail] = useState(null)

    useEffect(() => {
        // 请求 API
        fetch("http://localhost:5000/api/movies/data")
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
                        <img className='imgMovieDetail' src={process.env.PUBLIC_URL + "/image/" + movieDetail.image} alt={movieDetail.name} width={200} />
                        <div className="movieInfo">
                            <div className="movieDetails">
                                <p className="movieDetailItem">片長{movieDetail.VideoLength}</p>
                                <p className="movieDetailItem">上映日期: {movieDetail.releaseDate}</p>
                                <p className="movieDetailItem">價格: {movieDetail.price}</p>
                                <p className="movieDetailItem">類型: {movieDetail.movieType}</p>
                                <p className="movieDetailItem">演員: {movieDetail.actor}</p>
                                <p className="movieDetailItem">導演: {movieDetail.director}</p>
                                {/* <p className="movieDetailItem">数量: {movieDetail.quantity}</p> */}
                            </div>
                        </div>
                    </div>
                    <QuantityBtn movieInfo={movieDetail} />
                    {/* 传递 movieId 到 ShowMovieAndTime 组件 */}
                    <ShowMovieAndTime movieId={movieDetail.id} />
                    <Link to="/" className="backLink">回到電影列表</Link>
                </div>
            }
        </div>
    )
}
