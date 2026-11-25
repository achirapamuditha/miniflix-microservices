package org.example.contentservice.content.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface contentRepo extends JpaRepository<ContentData,Integer> {

    List<ContentData> findByType(String type);

    @Query("select c from ContentData c where c.title=?1")
    public List<ContentData> getContentByTitle(String title);

    // Get all movies
    @Query("SELECT c FROM ContentData c WHERE c.type = 'movie'")
    List<ContentData> findAllMovies();

    // Get all TV series
    @Query("SELECT c FROM ContentData c WHERE c.type = 'tv_series'")
    List<ContentData> findAllTVSeries();

    @Query(value = "SELECT * FROM content_data WHERE type = ?1 ORDER BY year DESC LIMIT ?2",
            nativeQuery = true)
    List<ContentData> findLatestByType(String type, int limit);


}



