package com.ai_fitness.activityService.service;

import com.ai_fitness.activityService.dto.ActivityRequest;
import com.ai_fitness.activityService.dto.ActivityResponse;
import com.ai_fitness.activityService.models.Activity;
import com.ai_fitness.activityService.repository.ActivityRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ActivityService {

    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);
    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private UserValidationService userValidationService;

    @Autowired
    private KafkaTemplate<String, Activity> kafkaTemplate;

    @Value("${kafka.topic.name}")
    public String topicName;

    public ActivityResponse trackActivity(ActivityRequest activityRequest) {
        try {
            boolean ValidActivity = userValidationService.validateUser(activityRequest.getUserId());
            if(!ValidActivity){
                throw new RuntimeException("Invalid User: " + activityRequest.getUserId());
            }

            Activity activity = Activity.builder()
                    .userId(activityRequest.getUserId())
                    .type(activityRequest.getType())
                    .duration(activityRequest.getDuration())
                    .caloriesBurned(activityRequest.getCaloriesBurned())
                    .startTime(activityRequest.getStartTime())
                    .additionalMetrics(activityRequest.getAdditionalMetrics())
                    .build();

            Activity savedActivity = activityRepository.save(activity);

            // Send to Kafka with better error handling
            try {
                kafkaTemplate.send(topicName, savedActivity.getUserId(), savedActivity);
                log.info("send to kafka");
            } catch (Exception e) {
                e.printStackTrace();
            }

            return buildActivityResponse(savedActivity);

        } catch (Exception e) {
            log.error("Error tracking activity for user: {}", activityRequest.getUserId(), e);
            throw new RuntimeException("Failed to track activity: " + e.getMessage());
        }
    }

    private ActivityResponse buildActivityResponse(Activity activity) {
        ActivityResponse response = new ActivityResponse();
        response.setId(activity.getId());
        response.setUserId(activity.getUserId());
        response.setType(activity.getType());
        response.setDuration(activity.getDuration());
        response.setCaloriesBurned(activity.getCaloriesBurned());
        response.setStartTime(activity.getStartTime());
        response.setAdditionalMetrics(activity.getAdditionalMetrics());
        response.setCreatedAt(activity.getCreatedAt());
        response.setUpdatedAt(activity.getUpdatedAt());
        return response;
    }

    public List<ActivityResponse> getAllActivities(String userId) {
        List<Activity> activityList=activityRepository.findByUserId(userId);
        return activityList.stream()
                .map(this::buildActivityResponse)
                .collect(Collectors.toList());
    }
}