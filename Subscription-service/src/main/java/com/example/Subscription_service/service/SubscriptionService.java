package com.example.Subscription_service.service;

import com.example.Subscription_service.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;



    // 1. Subscribe a user to a plan

    public UserSubscription subscribeUser(int userId, Long planId) {

        Plan plan = planRepository.findById(planId).orElse(null);
        if (plan == null) {
            System.out.println("Plan not found!");
            return null;
        }

        // If user has an active subscription → deactivate it
        Optional<UserSubscription> active = subscriptionRepository.findByUserIdAndIsActive(userId, true);
        active.ifPresent(sub -> {
            sub.setActive(false);
            subscriptionRepository.save(sub);
        });

        // Create new subscription
        UserSubscription subscription = new UserSubscription();
        subscription.setUserId(userId);
        subscription.setPlan(plan);
        subscription.setSubscribedDate(LocalDate.now());
        subscription.setActive(true);

        return subscriptionRepository.save(subscription);
    }



    // 2. Get all subscriptions belonging to a user

    public List<UserSubscription> getSubscriptionsByUser(int userId) {
        return subscriptionRepository.findByUserId(userId);
    }



    // 3. Get ALL subscriptions (Admin)

    public List<UserSubscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }



    // 4. Cancel user subscription

    public boolean cancelSubscription(int userId) {

        Optional<UserSubscription> active = subscriptionRepository.findByUserIdAndIsActive(userId, true);

        if (active.isEmpty()) {
            return false;  // user has no active plan
        }

        UserSubscription sub = active.get();
        sub.setActive(false);
        subscriptionRepository.save(sub);

        return true;
    }



    // 5. Change user's subscription plan

    public UserSubscription changePlan(int userId, Long newPlanId) {

        // Check plan exists
        Plan newPlan = planRepository.findById(newPlanId).orElse(null);
        if (newPlan == null) {
            return null;
        }

        // Deactivate old plan
        Optional<UserSubscription> active = subscriptionRepository.findByUserIdAndIsActive(userId, true);
        active.ifPresent(sub -> {
            sub.setActive(false);
            subscriptionRepository.save(sub);
        });

        // Create new subscription
        UserSubscription subscription = new UserSubscription();
        subscription.setUserId(userId);
        subscription.setPlan(newPlan);
        subscription.setSubscribedDate(LocalDate.now());
        subscription.setActive(true);

        return subscriptionRepository.save(subscription);
    }
}
