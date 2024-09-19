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
        fetch("http://localhost:8080/api/movies/data")
            .then(response => response.json())
            .then(data => {
                let movieInfo = data.find((element) => {
                    return element.movie_id === parseInt(params.id)
                })
                setMovieDetail(movieInfo)
            })
    }, [params.id])

    return (
        <div className="movieDetailWrapper">
            {
                movieDetail &&
                <div className="movieDetailContainer">
                    <Titles mainTitle={movieDetail.title + " 電影資訊"} />
                    <div className="movieDetailContent">
                        <img className='imgMovieDetail' src={process.env.PUBLIC_URL + "/image/" + movieDetail.img} alt={movieDetail.title} width={200} />
                        <div className="movieInfo">
                            <div className="movieDetails">
                                <p className="movieDetailItem">片長：{movieDetail.duration}</p>
                                <p className="movieDetailItem">上映日期: {movieDetail.released_date}</p>
                                <p className="movieDetailItem">類型: {movieDetail.genre}</p>
                                <p className="movieDetailItem">演員: {movieDetail.actor}</p>
                                <p className="movieDetailItem">導演: {movieDetail.director}</p>
                            </div>
                        </div>
                    </div>
                    <QuantityBtn movieInfo={movieDetail} />
                    {/* 传递 movieId 到 ShowMovieAndTime 组件 */}
                    <ShowMovieAndTime movieId={movieDetail.movie_id} />
                    <Link to="/" className="backLink">回到電影列表</Link>
                </div>
            }
        </div>
    )
}
