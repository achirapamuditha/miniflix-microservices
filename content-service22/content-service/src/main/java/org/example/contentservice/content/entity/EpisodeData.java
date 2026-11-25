package org.example.contentservice.content.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table(name = "episode")
@Getter
@Setter
public class EpisodeData {

    @Column(name = "episode_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int episodeId;

    @Column(name = "title")
    private String title;
    @Column(name ="video_url" )
    private String videourl;
    @Column(name ="episode_no" )
    private int epiNo;
    @Column(name ="release_date" )
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private ContentData content;


}
