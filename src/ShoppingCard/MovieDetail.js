import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Titles from './Titles'
import QuantityBtn from './QuantityBtn'
<<<<<<< HEAD
import ShowMovieAndTime from './showMovieAndTime'
import './ShowMovieAndTime.css'
=======
>>>>>>> dbf72cc46620287e0ac4637085a212c327096ee5
import './MovieDetail.css'

export default function MovieDetail() {

    let params = useParams()
    let [movieDetail, setMovieDetail] = useState(null)

    useEffect(() => {
<<<<<<< HEAD
        // 请求 API
        fetch("http://localhost:5000/api/movies/data")
=======
        // 請求API
        fetch("http://localhost:3000/data")
>>>>>>> dbf72cc46620287e0ac4637085a212c327096ee5
            .then(response => response.json())
            .then(data => {
                let movieInfo = data.find((element) => {
                    return element.id === parseInt(params.id)
                })
                setMovieDetail(movieInfo)
<<<<<<< HEAD
=======

>>>>>>> dbf72cc46620287e0ac4637085a212c327096ee5
            })
    }, [params.id])

    return (
        <div className="movieDetailWrapper">
            {
                movieDetail &&
                <div className="movieDetailContainer">
                    <Titles mainTitle={movieDetail.name + " 電影資訊"} />
                    <div className="movieDetailContent">
<<<<<<< HEAD
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
=======
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
>>>>>>> dbf72cc46620287e0ac4637085a212c327096ee5
                </div>
            }
        </div>
    )
}
<<<<<<< HEAD
=======


>>>>>>> dbf72cc46620287e0ac4637085a212c327096ee5
