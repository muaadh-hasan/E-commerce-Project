package com.mhr.ecommerce.controller;


import com.mhr.ecommerce.dto.Login;
import com.mhr.ecommerce.entity.Customer;
import com.mhr.ecommerce.service.AuthServices;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    AuthServices authServices;

    AuthController(AuthServices authServices){this.authServices = authServices;}

    @PostMapping("/login")
    public Customer Login(@RequestBody Login login) {

        System.out.println("login : " + login.getEmail() + " ," + login.getPassword());

        return this.authServices.CheckAuthentication(login);
    }

    @PostMapping("/register")
    public boolean register(@RequestBody Customer customer) {

        System.out.println("Customer register : " + customer.getEmail() + " ," + customer.getPassword());

        return this.authServices.RegisterCustomer(customer);
    }

}
