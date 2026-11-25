package org.example.contentservice.corsConfig;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class VideoConfig implements WebMvcConfigurer {

    @Value("${video.storage.path}")
    private String videoStoragePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve videos from /videos/** URL pattern
        registry.addResourceHandler("/videos/**")
                .addResourceLocations("file:" + videoStoragePath);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
