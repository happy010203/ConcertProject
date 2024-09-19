import React from 'react'
import { Link } from "react-router-dom"
import './MovieList.css'
import { useState, useEffect } from 'react'
import Titles from './Titles'


export default function MovieList() {

    // 設定useState接收資料，初始值設定為空array
    let [movieList, setMovieList] = useState([]) //useState有了變化便會渲染



    useEffect(() => {
        fetch("http://localhost:8080/api/movies/data")
            .then(response => response.json())
            .then(data => setMovieList(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    return (
        <div className='pageContainer'>
            <Titles mainTitle="現正熱映"  />

            <div className='movieContainer'>
                {
                    movieList.map(movie => {
                        return (
                            <div className='movieBorder' key={movie.movie_id}>
                                <Link to={'/MovieDetail/' + movie.movie_id}>
                                    <img className='imgMovieList' src={process.env.PUBLIC_URL + "/image/" + movie.img} alt="moviePicture"  /><br />
                                </Link>
                                {movie.title}<br />
                                {/* 價格：{movie.price}<br /> */}
                                上映日期：{movie.released_date}<br />
                                {/* 線上購票按鈕 */}
                                <Link to={'/MovieDetail/' + movie.movie_id}>
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

