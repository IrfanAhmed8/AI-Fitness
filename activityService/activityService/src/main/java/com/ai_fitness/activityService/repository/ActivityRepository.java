package com.ai_fitness.activityService.repository;

import com.ai_fitness.activityService.models.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends MongoRepository<Activity,String> {

}
