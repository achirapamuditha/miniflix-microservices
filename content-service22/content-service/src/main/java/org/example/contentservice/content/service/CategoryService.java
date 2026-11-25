package org.example.contentservice.content.service;

import org.example.contentservice.content.entity.CategoryData;
import org.example.contentservice.content.entity.categoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CategoryService {
    @Autowired
    private categoryRepo categoryRepo;

    public CategoryData createCategory(CategoryData category) {
        return categoryRepo.save(category);
    }


    public List<CategoryData> getAllCategories() {
        return categoryRepo.findAll();
    }


    public CategoryData getCategoryById(int id) {
        return categoryRepo.findById(id)
                .orElse(null); // or throw exception
    }


    public CategoryData updateCategory(int id, CategoryData updatedCategory) {
        CategoryData existing = getCategoryById(id);
        if (existing != null) {
            existing.setName(updatedCategory.getName());
            existing.setDescription(updatedCategory.getDescription());
            return categoryRepo.save(existing);
        }
        return null;
    }


    public void deleteCategory(int id) {
        categoryRepo.deleteById(id);
    }
    public List<CategoryData> getCategoryByCategoryName(String categoryName) {
        return categoryRepo.getCategoryByname(categoryName);
    }




}





