package com.example.Subscription_service.controller;

import com.example.Subscription_service.data.UserSubscription;
import com.example.Subscription_service.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subscription")   // Base path for subscription APIs
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public UserSubscription subscribe(
            @RequestParam int userId,
            @RequestParam Long planId) {
        System.out.println("called ==============");
        return subscriptionService.subscribeUser(userId, planId);
    }
}
