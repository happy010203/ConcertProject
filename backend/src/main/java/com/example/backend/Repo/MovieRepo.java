package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.Entity.Movie;

import java.util.List;

@Repository
public interface MovieRepo extends JpaRepository<Movie, Integer> {

    @Query("SELECT m FROM Movie m WHERE m.title LIKE %:keyword% OR m.director LIKE %:keyword%")
    List<Movie> searchByTitleOrDirector(@Param("keyword") String keyword);
    
    @Query("SELECT m FROM Movie m WHERE m.status = :status")
    List<Movie> findMoviesByStatus(@Param("status") Movie.Status status);
}
