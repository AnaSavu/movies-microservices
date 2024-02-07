package com.soa.productmanagement.controller;


import com.soa.productmanagement.intercomm.UserClient;
import com.soa.productmanagement.model.Order;
import com.soa.productmanagement.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MovieController {

    @Autowired
    private UserClient userClient;

    @Autowired
    private MovieService movieService;

    @Autowired
    private DiscoveryClient discoveryClient;

    @Autowired
    private Environment env;

    @Value("${spring.application.name}")
    private String serviceId;

    @GetMapping("/service/port")
    public String getPort() {
        return "Service is working at port : " + env.getProperty("local.server.port");
    }

    @GetMapping("/service/instances")
    public ResponseEntity<?> getInstances() {
        return ResponseEntity.ok(discoveryClient.getInstances(serviceId));
    }

    @GetMapping("/service/user/{userId}")
    public ResponseEntity<?> findTransactionsOfUser(@PathVariable Long userId) {
        return ResponseEntity.ok(movieService.findOrdersOfUser(userId));
    }

    @GetMapping("/service/all")
    public ResponseEntity<?> findAllMovies() {
        return ResponseEntity.ok(movieService.allMovies());
    }

    @GetMapping("/service/{movieId}")
    public ResponseEntity<?> findMovieById(@PathVariable Long movieId) {
        return ResponseEntity.ok(movieService.findMovieById(movieId));
    }

    @PostMapping("/service/buy")
    public ResponseEntity<?> saveOrder(@RequestBody Order order) {
        order.setDateOfIssue(LocalDateTime.now());
        order.setMovie(movieService.findMovieById(order.getMovie().getId()));
        return new ResponseEntity<>(movieService.saveOrder(order), HttpStatus.CREATED);
    }

    @GetMapping("/service/movie/{movieId}")
    public ResponseEntity<?> findClientsOfMovie(@PathVariable Long movieId) {
        List<Order> orders = movieService.findOrdersOfMovie(movieId);
        if (CollectionUtils.isEmpty(orders)) {
            return ResponseEntity.notFound().build();
        }
        List<Long> userIdList = orders.parallelStream().map(Order::getUserId).collect(Collectors.toList());
        List<String> students = userClient.getUserNames(userIdList);
        return ResponseEntity.ok(students);
    }
}
