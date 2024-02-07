package com.soa.productmanagement.repository;

import com.soa.productmanagement.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
