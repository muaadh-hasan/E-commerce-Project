package com.mhr.ecommerce.service;

import com.mhr.ecommerce.dao.CustomerRepository;
import com.mhr.ecommerce.dto.Login;
import com.mhr.ecommerce.entity.Customer;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
public class AuthServicesImpl implements AuthServices{

    private CustomerRepository customerRepository;

    public AuthServicesImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    @Transactional
    public Customer CheckAuthentication(Login login) {
        Customer customer;
        customer = this.customerRepository.findByEmail(login.getEmail());
        if(customer != null){
            if(customer.getPassword().equals(login.getPassword())){
                return customer;
            }
        }
        return null;
    }

    @Override
    @Transactional
    public boolean RegisterCustomer(Customer customer) {

        boolean isExists = this.customerRepository.existsByEmail(customer.getEmail());

        if(isExists){
            return false;
        }else {
            this.customerRepository.save(customer);
            return true;
        }
    }
}
