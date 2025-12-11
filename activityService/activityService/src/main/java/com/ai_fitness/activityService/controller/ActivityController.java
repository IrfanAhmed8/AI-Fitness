package com.ai_fitness.activityService.controller;

import com.ai_fitness.activityService.dto.ActivityRequest;
import com.ai_fitness.activityService.dto.ActivityResponse;
import com.ai_fitness.activityService.service.ActivityService;
import com.ai_fitness.activityService.service.UserValidationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/activities")
public class ActivityController {
    private ActivityService activityService;



    @PostMapping("/track")
    public ResponseEntity<ActivityResponse> trackActivity(@RequestBody ActivityRequest request, @RequestHeader("X-User-ID") String userId){
        request.setUserId(userId);
        return ResponseEntity.ok(activityService.trackActivity(request));
    }
    @GetMapping("/getActivities")
    public ResponseEntity<List<ActivityResponse>> getAllActivities( @RequestHeader("X-User-ID") String userId){
        return ResponseEntity.ok(activityService.getAllActivities(userId));
    }
}
