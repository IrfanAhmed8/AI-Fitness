package com.ai_fitness.fitnessRecommendation.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "Recommendation")
@Builder
public class Recommendation {
    private String id;
    private String userId;
    private String activityId;
    private String type;
    private String recommendation;
    private List<String > improvements;
    private List<String> suggestions;
    private List<String> safety;

    @CreatedDate
    private LocalDateTime createdAt;
}
