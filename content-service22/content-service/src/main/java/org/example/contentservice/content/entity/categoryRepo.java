package org.example.contentservice.content.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface categoryRepo extends JpaRepository<CategoryData,Integer> {

    @Query("select c from CategoryData  c where c.name=?1")
    public List<CategoryData> getCategoryByname(String name);
}
