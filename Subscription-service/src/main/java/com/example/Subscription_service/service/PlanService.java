package com.example.Subscription_service.service;

import com.example.Subscription_service.data.Plan;
import com.example.Subscription_service.data.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    // Get all plans
    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    // Get a plan by ID
    public Plan getPlanById(Long id) {
        Optional<Plan> plan = planRepository.findById(id);
        return plan.orElse(null);
    }

    // Create a new plan
    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    // Update an existing plan
    public Plan updatePlan(Long id, Plan plan) {
        if (!planRepository.existsById(id)) {
            return null; // Plan not found
        }
        plan.setId(id);
        return planRepository.save(plan);
    }

    // Delete a plan
    public boolean deletePlan(Long id) {
        if (!planRepository.existsById(id)) {
            return false; // Plan not found
        }
        planRepository.deleteById(id);
        return true;
    }
}
