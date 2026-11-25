package com.example.Subscription_service.controller;

import com.example.Subscription_service.data.Plan;
import com.example.Subscription_service.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plan")
public class PlanController {

    @Autowired
    private PlanService planService;

    // Get all plans
    @GetMapping
    public List<Plan> getAllPlans() {
        return planService.getAllPlans();
    }

    // Get a plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<Plan> getPlanById(@PathVariable Long id) {
        Plan plan = planService.getPlanById(id);
        if (plan == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(plan);
    }

    // Create a new plan
    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestBody Plan plan) {
        Plan createdPlan = planService.createPlan(plan);
        return ResponseEntity.ok(createdPlan);
    }

    // Update an existing plan
    @PutMapping("/{id}")
    public ResponseEntity<Plan> updatePlan(@PathVariable Long id, @RequestBody Plan plan) {
        Plan updatedPlan = planService.updatePlan(id, plan);
        if (updatedPlan == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedPlan);
    }

    // Delete a plan
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        boolean deleted = planService.deletePlan(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
