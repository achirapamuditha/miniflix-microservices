package com.example.Subscription_service.data;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table (name ="plansubscribe")
public class UserSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int userId;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private LocalDate subscribedDate;

    // ADD THIS FIELD
    private boolean isActive = true;


    // --------------------
    // GETTERS & SETTERS
    // --------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Plan getPlan() {
        return plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public LocalDate getSubscribedDate() {
        return subscribedDate;
    }

    public void setSubscribedDate(LocalDate subscribedDate) {
        this.subscribedDate = subscribedDate;
    }

    // ADD GETTER & SETTER FOR isActive
    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
