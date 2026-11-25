package com.example.Subscription_service.data;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "plans") //map entity to the plan database
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plan_name")
    @JsonProperty("planName") //connect java fields with json properties
    private String planName;

    @Column(name = "price")
    private double price;

    // Default constructor (required by JPA)
    public Plan() {
    }

    // Constructor for easy creation
    public Plan(String planName, double price) {
        this.planName = planName;
        this.price = price;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}