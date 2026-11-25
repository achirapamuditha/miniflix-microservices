package com.example.User_Service1.service;

import com.example.User_Service1.data.User;
import com.example.User_Service1.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(); // to hash the password and store it for security reasons

    //registraing a new user

    public User register(User user, String role) {
        if (userRepository.existsByEmail(user.getEmail())) {
            System.out.println("Email already exists");
            return null;
        }
        // Ensure roles are prefixed with 'ROLE_' if not already
        if (role == null || role.isEmpty()) {
            role = "ROLE_USER"; // Default to ROLE_USER if no role is provided
        } else if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }
        user.setRole(role);
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }


    // get User by ID
    public User getById(Long id) {

        return userRepository.findById(id).orElse(null);
    }

    //update user details - update
    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }

        // Update the user's fields if they are not null
        if (updatedUser.getName() != null) {
            user.setName(updatedUser.getName());
        }
        if (updatedUser.getEmail() != null && !updatedUser.getEmail().equals(user.getEmail())) {

            user.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getRole() != null && !updatedUser.getRole().equals(user.getRole())) {
            // Ensure the role is prefixed with 'ROLE_'
            if (!updatedUser.getRole().startsWith("ROLE_")) {
                updatedUser.setRole("ROLE_" + updatedUser.getRole());
            }
            user.setRole(updatedUser.getRole());
        }

        return userRepository.save(user);
    }
//get user by email
    public User getByEmail(String email) {
        // assumes UserRepository has findByEmail(String) returning User
        return userRepository.findByEmail(email);
    }
// delete user by id
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);  // assuming you're using a JPA repository
    }
}


