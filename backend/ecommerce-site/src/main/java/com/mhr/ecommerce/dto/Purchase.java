package com.mhr.ecommerce.dto;

import com.mhr.ecommerce.entity.Address;
import com.mhr.ecommerce.entity.Customer;
import com.mhr.ecommerce.entity.Order;
import com.mhr.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address address;
    private Order order;
    private Set<OrderItem> orderItems;

}
