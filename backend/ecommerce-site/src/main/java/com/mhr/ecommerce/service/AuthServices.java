package com.mhr.ecommerce.service;

import com.mhr.ecommerce.dto.Login;
import com.mhr.ecommerce.entity.Customer;

public interface AuthServices {

    Customer CheckAuthentication(Login login);
    boolean RegisterCustomer(Customer customer);

}
