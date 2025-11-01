package com.ai_fitness.fitnessRecommendation.service;

import com.ai_fitness.fitnessRecommendation.model.Recommendation;
import com.ai_fitness.fitnessRecommendation.repository.RecommendationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class RecommendationService {
    private RecommendationRepository recommendationRepository;
    public List<Recommendation> getUserRecommendation(String userId) {
        return recommendationRepository.findByUserId(userId);
    }

    public Recommendation getActivityRecommendation(String activityId) {
        return recommendationRepository.findByActivityId(activityId).orElseThrow(()->new RuntimeException("No recommendation"));
    }
}
