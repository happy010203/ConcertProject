import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import ShowMovieAndTime from './showMovieAndTime';
import movieDetailStyles from '../styles/MovieDetail.module.css'; // 引入 MovieDetail 的模組樣式

export default function MovieDetail() {

    let params = useParams();
    let [movieDetail, setMovieDetail] = useState(null);

    useEffect(() => {
        console.log("Fetching movie data with id:", params.id);

        // 正確的 API 路徑，將 params.id 動態傳入
        fetch(`http://localhost:8443/movie/api/movie/movies/${params.id}`)
            .then(response => {
                // 檢查 API 回應的狀態碼
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // 如果 response 是物件而不是陣列，直接設置資料
                setMovieDetail(data);
                console.log("movieInfo", data);
            })
            .catch(error => console.error('Error fetching movie data:', error));
    }, [params.id]);

    return (
        <div className={movieDetailStyles.movieDetailWrapper}>
            {
                movieDetail &&
                <div className={movieDetailStyles.movieDetailContainer}>
                    <h1><p className={movieDetailStyles.title}>電影資訊</p></h1>
                    <div className={movieDetailStyles.movieDetailContent}>
                        <img className={movieDetailStyles.imgMovieDetail} src={movieDetail.img} alt={movieDetail.title} width={200} />
                        <div className={movieDetailStyles.movieInfo}>
                            <div className={movieDetailStyles.movieDetails}>
                                <p className={movieDetailStyles.movieDetailItem}>片長：{movieDetail.duration} 分鐘</p>
                                <p className={movieDetailStyles.movieDetailItem}>上映日期: {movieDetail.date}</p>
                                <p className={movieDetailStyles.movieDetailItem}>類型: {movieDetail.genre}</p>
                                <p className={movieDetailStyles.movieDetailItem}>演員: {movieDetail.actor}</p>
                                <p className={movieDetailStyles.movieDetailItem}>導演: {movieDetail.director}</p>
                            </div>
                        </div>
                    </div>
                    {/* 傳遞 movieId 到 ShowMovieAndTime 组件 */}
                    <ShowMovieAndTime movieId={movieDetail.id} />
                    <Link to="/MovieList" className={movieDetailStyles.backLink}>回到電影列表</Link>
                </div>
            }
        </div>
    );
}



