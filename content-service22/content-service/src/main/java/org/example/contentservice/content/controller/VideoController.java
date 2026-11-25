package org.example.contentservice.content.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/videos")
public class VideoController {

    @Value("${video.storage.path}")
    private String videoStoragePath;

    @PostMapping
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("video/")) {
                return ResponseEntity.badRequest().body("Only video files are allowed");
            }

            // Create directory if not exists
            File directory = new File(videoStoragePath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFilename = UUID.randomUUID().toString() + extension;

            // Save file
            Path filePath = Paths.get(videoStoragePath + uniqueFilename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Prepare response
            Map<String, String> response = new HashMap<>();
            response.put("filename", uniqueFilename);
            response.put("originalName", originalFilename);
            response.put("url", "/videos/" + uniqueFilename);
            response.put("size", String.valueOf(file.getSize()));

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload video: " + e.getMessage());
        }
    }

//get all videos
    @GetMapping
    public ResponseEntity<?> listVideos() {
        try {
            File directory = new File(videoStoragePath);
            File[] files = directory.listFiles((dir, name) ->
                    name.toLowerCase().endsWith(".mp4") ||
                            name.toLowerCase().endsWith(".webm") ||
                            name.toLowerCase().endsWith(".mov")
            );

            if (files == null) {
                return ResponseEntity.ok(new File[0]);
            }

            return ResponseEntity.ok(files);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to list videos");
        }
    }
    //access video
    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getVideo(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(videoStoragePath).resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType("video/mp4"))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{filename}")
    public ResponseEntity<?> deleteVideo(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(videoStoragePath + filename);
            Files.deleteIfExists(filePath);
            return ResponseEntity.ok("Video deleted successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete video");
        }
    }
}
