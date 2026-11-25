package org.example.contentservice.content.service;

import org.example.contentservice.content.entity.EpisodeData;
import org.example.contentservice.content.entity.EpisodeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EpisodeService {
    @Autowired
    private EpisodeRepo episodeRepo;

    public List<EpisodeData> getAllEpisodes(){
        return episodeRepo.findAll();
    }
    public EpisodeData createEpisode(EpisodeData episodeData){
        return episodeRepo.save(episodeData);
    }
    public EpisodeData getEpisodeById(int id){
        return episodeRepo.findById(id).orElse(null);
    }
 //   public List<EpisodeData> getEpisodeByContentId(int conid){
   //     return episodeRepo.findByContent_Id(conid);
    // }
    public EpisodeData updateEpisode(int id, EpisodeData episode) {
        EpisodeData ep = episodeRepo.findById(id).orElse(null);
        if (ep != null) {
            ep.setTitle(episode.getTitle());
            ep.setEpiNo(episode.getEpiNo());
            ep.setContent(episode.getContent());
        }
        return episodeRepo.save(ep);
    }
    public void deleteEpisode(int id) {
        episodeRepo.deleteById(id);
    }
}
