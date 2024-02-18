package com.ab.dsdeliver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ab.dsdeliver.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
