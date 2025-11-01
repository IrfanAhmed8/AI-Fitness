package com.ai_fitness.activityService.controller;

import com.ai_fitness.activityService.dto.ActivityRequest;
import com.ai_fitness.activityService.dto.ActivityResponse;
import com.ai_fitness.activityService.service.ActivityService;
import com.ai_fitness.activityService.service.UserValidationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/activities")
public class ActivityController {
    private ActivityService activityService;



    @PostMapping("/track")
    public ResponseEntity<ActivityResponse> trackActivity(@RequestBody ActivityRequest request){
        return ResponseEntity.ok(activityService.trackActivity(request));
    }
}
