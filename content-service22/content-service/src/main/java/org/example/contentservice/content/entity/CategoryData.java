package org.example.contentservice.content.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import lombok.Setter;
import lombok.Getter;

@Entity
@Table(name = "category")
@Getter
@Setter
public class CategoryData {
    @Column(name = "category_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int categoryId;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ContentData> contents = new ArrayList<>();
}
