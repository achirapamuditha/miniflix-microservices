package org.example.contentservice.content.controller;

import org.example.contentservice.content.entity.CategoryData;
import org.example.contentservice.content.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    // CREATE CATEGORY
    @PostMapping
    public CategoryData createCategory(@RequestBody CategoryData category) {
        return categoryService.createCategory(category);
    }

    // GET ALL CATEGORIES
    @GetMapping
    public List<CategoryData> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // GET CATEGORY BY ID
    @GetMapping("/{id}")
    public CategoryData getCategoryById(@PathVariable int id) {
        return categoryService.getCategoryById(id);
    }

    // GET CATEGORY BY NAME   => /category/search?name=Action
    @GetMapping("/search")
    public List<CategoryData> getCategoryByName(@RequestParam String name) {
        return categoryService.getCategoryByCategoryName(name);
    }

    // UPDATE CATEGORY
    @PutMapping("/{id}")
    public CategoryData updateCategory(
            @PathVariable int id,
            @RequestBody CategoryData category) {

        return categoryService.updateCategory(id, category);
    }

    // DELETE CATEGORY
    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
        return "Category deleted successfully";
    }

}
