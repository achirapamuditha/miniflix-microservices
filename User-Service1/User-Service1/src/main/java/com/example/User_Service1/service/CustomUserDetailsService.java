package com.example.User_Service1.service;

import com.example.User_Service1.data.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService{
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.example.User_Service1.data.User user = userRepository.findByEmail(username);
        if(user == null){
            throw new UsernameNotFoundException("User not found"+username);
        }

        String role = user.getRole();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        System.out.println("User Role: " + role);
        return new User(
                user.getEmail(),  // username
                user.getPassword(),  // password (already encoded)
                Collections.singletonList(new SimpleGrantedAuthority(role))  // role (ensure it is prefixed with ROLE_)
        );
    }
}
