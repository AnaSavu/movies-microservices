package com.soa.productmanagement.service;


import com.soa.productmanagement.model.Movie;
import com.soa.productmanagement.model.Order;
import com.soa.productmanagement.repository.MovieRepository;
import com.soa.productmanagement.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Movie findMovieById(Long movieId) {
        return movieRepository.findById(movieId).orElse(null);
    }

    @Override
    public List<Order> findOrdersOfUser(Long userId) {
        return orderRepository.findAllByUserId(userId);
    }

    @Override
    public List<Order> findOrdersOfMovie(Long movieId) {
        return orderRepository.findAllByMovieId(movieId);
    }

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
}
