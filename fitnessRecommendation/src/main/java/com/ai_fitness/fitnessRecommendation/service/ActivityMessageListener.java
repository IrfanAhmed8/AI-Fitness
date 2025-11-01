package com.ai_fitness.fitnessRecommendation.service;

import com.ai_fitness.fitnessRecommendation.model.Activity;
import com.ai_fitness.fitnessRecommendation.model.Recommendation;
import com.ai_fitness.fitnessRecommendation.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ActivityMessageListener {

    private static final Logger log = LoggerFactory.getLogger(ActivityMessageListener.class);
    private final GenerateResponse generateResponse;
    private final RecommendationService recommendationService;
    @Autowired
    private RecommendationRepository recommendationRepository;

    public ActivityMessageListener(GenerateResponse generateResponse,
                                   RecommendationService recommendationService) {
        this.generateResponse = generateResponse;
        this.recommendationService = recommendationService;
    }

    @KafkaListener(topics = "${kafka.topic.name}", groupId = "activity-processor-group")
    public void processActivity(Activity activity){
        log.info("Recieved Activity for processing :{}", activity.getUserId());
        Recommendation recommendation=generateResponse.response(activity);
        recommendationRepository.save(recommendation);
    }
}

