package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.Cinema;



//JpaRepository 是 Spring Data JPA 提供的一个接口，它提供了对实体类进行 CRUD（创建、读取、更新、删除）操作的方法
//通过扩展这个接口，你可以自动获得一系列常用的数据库操作方法
public interface CinemaRepo extends JpaRepository<Cinema, Long> {
}
//Cinema 实体类
//Long 实体类中主键字段的类型
