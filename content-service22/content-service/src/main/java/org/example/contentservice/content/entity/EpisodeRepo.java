package org.example.contentservice.content.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface EpisodeRepo extends JpaRepository<EpisodeData,Integer> {

}
