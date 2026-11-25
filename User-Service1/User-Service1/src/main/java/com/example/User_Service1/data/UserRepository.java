    package com.example.User_Service1.data;

    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    @Repository
    public interface UserRepository extends JpaRepository<User,Long> {
        User findByEmail(String email);
        boolean existsByEmail(String email);
    }
