package com.example.User_Service1.controller;

import com.example.User_Service1.data.User;
import com.example.User_Service1.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users") // base path
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    @Autowired
    private UserService userService;

    //Registering a user
    @PostMapping("/register") // can be accessed only through users/register
    public User register(@RequestBody User user){
        String role = user.getRole();
        return userService.register(user,role);

    }
    //login User (basic authentication is used)
    @PostMapping("/login")
    public String login(){
        return "Login Success";
    }
    //frontend - degugging purpose its main goal is to display error messages if user is not authenticated or if not found
    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        String email = authentication.getName();
        com.example.User_Service1.data.User user = userService.getByEmail(email); // add getByEmail in UserService if needed
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    //getting user by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')") // both roles account can access
    public User getUserById(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authenticated user: " + authentication.getName());
        System.out.println("Authorities: " + authentication.getAuthorities());

        return userService.getById(id);
    }
    //update user details - only name (only through admin role account)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUser(@PathVariable Long id, @RequestBody User user){
        return userService.updateUser(id,user);

    }
    //delete user by id
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
    }
}
