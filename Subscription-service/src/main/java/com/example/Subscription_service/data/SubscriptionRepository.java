package com.example.Subscription_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<UserSubscription, Long> {

    // Get all subscriptions of a user
    List<UserSubscription> findByUserId(int userId);

    // Check if user already has an active subscription
    Optional<UserSubscription> findByUserIdAndIsActive(int userId, boolean isActive);

    // Find subscription by user & plan
    Optional<UserSubscription> findByUserIdAndPlanId(int userId, Long planId);
}
