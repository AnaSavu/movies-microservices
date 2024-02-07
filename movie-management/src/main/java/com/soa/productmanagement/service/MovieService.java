package com.soa.productmanagement.service;



import com.soa.productmanagement.model.Order;
import com.soa.productmanagement.model.Movie;

import java.util.List;

public interface MovieService {

    List<Movie> allMovies();

    Movie findMovieById(Long movieId);

    List<Order> findOrdersOfUser(Long userId);

    List<Order> findOrdersOfMovie(Long movieId);

    Order saveOrder(Order order);
}
