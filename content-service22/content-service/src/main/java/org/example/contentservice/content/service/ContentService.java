package org.example.contentservice.content.service;

import org.example.contentservice.content.entity.ContentData;
import org.example.contentservice.content.entity.contentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {
    @Autowired
    private contentRepo contentRepo;

    public List<ContentData> getAllContent() {
        return contentRepo.findAll();
    }

    public ContentData getContentById(int id) {
        return contentRepo.findById(id).orElse(null);
    }

    public ContentData createContent(ContentData contdata) {
        return contentRepo.save(contdata);
    }

    public ContentData updateContent(int id, ContentData contdata) {
        ContentData existing = contentRepo.findById(id).orElse(null);
        if (existing != null) {
            existing.setDescription(contdata.getDescription());
            existing.setType(contdata.getType());
            existing.setYear(contdata.getYear());
            existing.setTitle(contdata.getTitle());
            existing.setThumbnailUrl(contdata.getThumbnailUrl());
            existing.setVideoUrl(contdata.getVideoUrl());
            return contentRepo.save(existing);
        }
        return null;
    }

    public void deleteContentById(int id) {
        contentRepo.deleteById(id);
    }

    public List<ContentData> getContentByTitle(String title) {
        return contentRepo.getContentByTitle(title);
    }

    // NEW METHODS FOR DASHBOARD

    public List<ContentData> getLatestMovies(int limit) {
        return contentRepo.findLatestByType("movie", limit);
    }

    public List<ContentData> getLatestTVSeries(int limit) {
        return contentRepo.findLatestByType("tv_series", limit);
    }

    public List<ContentData> getAllMovies() {
        return contentRepo.findAllMovies();
    }

    public List<ContentData> getAllTVSeries() {
        return contentRepo.findAllTVSeries();
    }

    public List<ContentData> getContentByType(String type) {
        return contentRepo.findByType(type);
    }
}