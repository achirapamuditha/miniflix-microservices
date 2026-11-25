package org.example.contentservice.content.controller;

import org.example.contentservice.content.entity.EpisodeData;
import org.example.contentservice.content.service.EpisodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/episode")
    public class EpisodeController {

        @Autowired
        private EpisodeService episodeService;

        // Create
        @PostMapping
        public EpisodeData createEpisode(@RequestBody EpisodeData episodeData) {
            return episodeService.createEpisode(episodeData);
        }

        // Get all
        @GetMapping
        public List<EpisodeData> getAllEpisodes() {
            return episodeService.getAllEpisodes();
        }

        // Get by ID
        @GetMapping("/{id}")
        public EpisodeData getEpisodeById(@PathVariable int id) {
            return episodeService.getEpisodeById(id);
        }

        // Get episodes by content ID
      //  @GetMapping("/content/{conid}")
       // public List<EpisodeData> getEpisodeByContentId(@PathVariable int conid) {
         //   return episodeService.getEpisodeByContentId(conid);
        //}

        // Update
        @PutMapping("/{id}")
        public EpisodeData updateEpisode(
                @PathVariable int id,
                @RequestBody EpisodeData episodeData
        ) {
            return episodeService.updateEpisode(id, episodeData);
        }

        // Delete
        @DeleteMapping("/{id}")
        public String deleteEpisode(@PathVariable int id) {
            episodeService.deleteEpisode(id);
            return "Episode deleted successfully!";
        }
    }


