import React from 'react'
import { Link } from "react-router-dom"
import './MovieList.css'
import { useState, useEffect } from 'react'
import Titles from './Titles'
<<<<<<< HEAD


export default function MovieList() {

=======
import QuantityBtn from './QuantityBtn'
// import moviePicture from "./image/1.jpg"
export default function MovieList() {

    // let MovieList = [ //array
    //     { "id": 1, "name": "異形：羅穆路斯", "image": "1.jpg", "price": 250, "ReleaseDate": "2024/08/15" },
    //     { "id": 2, "name": "霍爾的移動城堡", "image": "2.jpg", "price": 200, "ReleaseDate": "2024/08/22" },
    //     { "id": 3, "name": "死侍與金鋼狼", "image": "3.jpg", "price": 220, "ReleaseDate": "2024/07/24" },
    //     { "id": 4, "name": "驀然回首", "image": "4.png", "price": 250, "ReleaseDate": "2024/08/01" },
    //     { "id": 5, "name": "暹羅詛咒", "image": "5.jpg", "price": 250, "ReleaseDate": "2024/08/16" },
    //     {"id": 6, "name": "末日倒數12小時", "image": "6.jpg", "price": 260, "ReleaseDate": "2024/08/23"}
    // ]

>>>>>>> dbf72cc46620287e0ac4637085a212c327096ee5
    // 設定useState接收資料，初始值設定為空array
    let [movieList, setMovieList] = useState([]) //useState有了變化便會渲染



    useEffect(() => { 
        // 請求API
<<<<<<< HEAD
        fetch("http://localhost:5000/api/movies/data")
=======
        fetch("http://localhost:3000/data")
>>>>>>> dbf72cc46620287e0ac4637085a212c327096ee5
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
<<<<<<< HEAD
                                    <img className='imgMovieList' src={process.env.PUBLIC_URL + "/image/" + movie.image} alt="moviePicture"  /><br />
                                </Link>
                                {movie.name}<br />
                                價格：{movie.price}<br />
                                上映日期：{movie.releaseDate}<br />
                                {/* 線上購票按鈕 */}
                                <Link to={'/MovieDetail/' + movie.id}>
                                    <button className='btn'>詳細資訊</button>
=======
                                    <img className='img' src={process.env.PUBLIC_URL + "/image/" + movie.image} alt="moviePicture"  /><br />
                                </Link>
                                {movie.name}<br />
                                價格：{movie.price}<br />
                                {movie.上映日期}<br />
                                {/* 線上購票按鈕 */}
                                <Link to={'/MovieDetail/' + movie.id}>
                                    <button className='btn'>線上購票</button>
>>>>>>> dbf72cc46620287e0ac4637085a212c327096ee5
                                </Link>
                                {/* <QuantityBtn movieInfo={movie}/> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
<<<<<<< HEAD
}

=======
}
>>>>>>> dbf72cc46620287e0ac4637085a212c327096ee5
