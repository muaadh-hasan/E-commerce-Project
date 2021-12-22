package com.mhr.ecommerce.service;


import com.mhr.ecommerce.dto.Purchase;
import com.mhr.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
