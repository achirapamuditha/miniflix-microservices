package org.example.contentservice.content.controller;

import org.example.contentservice.content.entity.ContentData;
import org.example.contentservice.content.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContentController {
    @Autowired
    private ContentService contentService;



    @GetMapping(path = "/content")
    public List<ContentData> getAllContent() {
        return contentService.getAllContent();
    }

    @GetMapping(path = "/content/{id}")
    public ContentData getContentById(@PathVariable int id) {
        return contentService.getContentById(id);
    }

    @PostMapping(path = "/content")
    public ContentData createContent(@RequestBody ContentData contentData) {
        return contentService.createContent(contentData);
    }

    @PutMapping(path = "/content/{id}")
    public ContentData updateContent(@PathVariable int id, @RequestBody ContentData contdata) {
        return contentService.updateContent(id, contdata);
    }

    @DeleteMapping(path = "/content/{id}")
    public void deleteContentById(@PathVariable int id) {
        System.out.println("Content ID to delete: " + id);
        contentService.deleteContentById(id);
    }

    @GetMapping(path = "/content", params = {"title"})
    public List<ContentData> getContentByTitle(@RequestParam String title) {
        return contentService.getContentByTitle(title);
    }

    //  NEW DASHBOARD ENDPOINTS

    // Dashboard - Get latest movies and TV series
    @GetMapping(path = "/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardContent() {
        Map<String, Object> response = new HashMap<>();

        // Get latest 3 movies
        List<ContentData> latestMovies = contentService.getLatestMovies(3);

        // Get latest 3 TV series
        List<ContentData> latestTVSeries = contentService.getLatestTVSeries(3);

        response.put("movies", latestMovies);
        response.put("tv_series", latestTVSeries);

        return ResponseEntity.ok(response);
    }

    // Get all movies (for "Show More" button)
    @GetMapping(path = "/movies")
    public ResponseEntity<List<ContentData>> getAllMovies() {
        List<ContentData> movies = contentService.getAllMovies();
        return ResponseEntity.ok(movies);
    }

    // Get all TV series (for "Show More" button)
    @GetMapping(path = "/tv-series")
    public ResponseEntity<List<ContentData>> getAllTVSeries() {
        List<ContentData> tvSeries = contentService.getAllTVSeries();
        return ResponseEntity.ok(tvSeries);
    }

    // Get content by type using query parameter (alternative to path variable)
    @GetMapping(path = "/content", params = {"type"})
    public List<ContentData> getContentByType(@RequestParam String type) {
        return contentService.getContentByType(type);
    }

    // Get latest content by type with limit
    @GetMapping(path = "/content/latest")
    public ResponseEntity<Map<String, Object>> getLatestContent(
            @RequestParam(defaultValue = "3") int limit) {
        Map<String, Object> response = new HashMap<>();

        List<ContentData> latestMovies = contentService.getLatestMovies(limit);
        List<ContentData> latestTVSeries = contentService.getLatestTVSeries(limit);

        response.put("movies", latestMovies);
        response.put("tv_series", latestTVSeries);
        response.put("limit", limit);

        return ResponseEntity.ok(response);
    }
}