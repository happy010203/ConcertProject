import React from 'react'
import { Link } from "react-router-dom"
import './MovieList.css'
import { useState, useEffect } from 'react'
import Titles from './Titles'


export default function MovieList() {

    // 設定useState接收資料，初始值設定為空array
    let [movieList, setMovieList] = useState([]) //useState有了變化便會渲染



    useEffect(() => { 
        // 請求API
        fetch("http://localhost:5000/api/movies/data")
        .then(response =>response.json())
        .then(data => setMovieList(data))
    }, []) 
    return (
        <div className='pageContainer'>
            <Titles mainTitle="現正熱映"  />

            <div className='movieContainer'>
                {
                    movieList.map(movie => {
                        return (
                            <div className='movieBorder' key={movie.id}>
                                <Link to={'/MovieDetail/' + movie.id}>
                                    <img className='imgMovieList' src={process.env.PUBLIC_URL + "/image/" + movie.image} alt="moviePicture"  /><br />
                                </Link>
                                {movie.name}<br />
                                價格：{movie.price}<br />
                                上映日期：{movie.releaseDate}<br />
                                {/* 線上購票按鈕 */}
                                <Link to={'/MovieDetail/' + movie.id}>
                                    <button className='btn'>詳細資訊</button>
                                </Link>
                                {/* <QuantityBtn movieInfo={movie}/> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

