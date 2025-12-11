# AI-Fitness (Monorepo)

AI-Fitness is a microservice-based fitness analytics project with a React + Vite frontend and multiple Spring Boot backend services. It includes a centralized configuration server, service discovery (Eureka), an API Gateway, a recommendation service using an AI model (Gemini), and a front-end dashboard for users.

## Table of Contents
- Overview
- Architecture & Modules
- Prerequisites
- Setup & Run
- Configuration & Env
- Important Files & Symbols
- Testing & Linting
- Troubleshooting
- Contributing & License

## Overview
This project provides:
- Logging and tracking workout/activity sessions (frontend, `Ai-Finess Frontend`).
- Microservices: User service, Activity service, Fitness recommendation service.
- Centralized configuration via Spring Cloud Config (`configserver`).
- Service discovery via Eureka (`eureka`).
- API Gateway (`Api-Gateway`) that routes to internal microservices.
- AI-based fitness analysis powered by Gemini (`fitnessRecommendation`).
- Frontend client built with React & Vite.

## Architecture & Modules
- Microservices and infra
  - `eureka` — Service registry and discovery
    - Files: [`eureka/eureka/pom.xml`](eureka/eureka/pom.xml), [`eureka/eureka/mvnw`](eureka/eureka/mvnw)
  - `configserver` — Spring Cloud Config Server (stores service-specific config files)
    - Files: [`configserver/configserver/pom.xml`](configserver/configserver/pom.xml), [`configserver/configserver/src/main/resources/config/api-gateway.properties`](configserver/configserver/src/main/resources/config/api-gateway.properties)
  - `Api-Gateway` — Spring Cloud Gateway (routes requests to services)
    - Files: [`Api-Gateway/Api-Gateway/pom.xml`](Api-Gateway/Api-Gateway/pom.xml), [`Api-Gateway/Api-Gateway/src/main/java/com/ai_fitness/Api_Gateway/ApiGatewayApplication.java`](Api-Gateway/Api-Gateway/src/main/java/com/ai_fitness/Api_Gateway/ApiGatewayApplication.java)
  - `UserService` — User registration & management
    - Files: [`UserService/UserService/pom.xml`](UserService/UserService/pom.xml), [`UserService/UserService/src/main/resources/application.properties`](UserService/UserService/src/main/resources/application.properties)
  - `activityService` — Tracks and stores activities
    - Files: [`activityService/activityService/pom.xml`](activityService/activityService/pom.xml), [`activityService/activityService/src/main/java/com/ai_fitness/activityService/config/WebClientConfig.java`](activityService/activityService/src/main/java/com/ai_fitness/activityService/config/WebClientConfig.java)
  - `fitnessRecommendation` — Uses Gemini to generate recommendations, stores analysis
    - Files: [`fitnessRecommendation/pom.xml`](fitnessRecommendation/pom.xml), [`fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/FitnessRecommendationApplication.java`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/FitnessRecommendationApplication.java), [`fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GeminiService.java`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GeminiService.java), [`fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GenerateResponse.java`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GenerateResponse.java), [`fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties`](fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties)
  - `Ai-Finess Frontend` — React + Vite SPA
    - Files: [`Ai-Finess Frontend/package.json`](Ai-Finess Frontend/package.json), [`Ai-Finess Frontend/src/services/api.js`](Ai-Finess Frontend/src/services/api.js), [`Ai-Finess Frontend/src/pages/Activities.jsx`](Ai-Finess Frontend/src/pages/Activities.jsx), [`Ai-Finess Frontend/src/pages/ActivityDetails.jsx`](Ai-Finess Frontend/src/pages/ActivityDetails.jsx)

## Prerequisites
- Java 17+ and the JDK on PATH or set via `JAVA_HOME`. The projects use Java 17 in pom properties.
- Node.js 18+ and npm/yarn/pnpm (for frontend).
- Docker or local installations of:
  - MongoDB (default `fitnessRecommendation` DB). See `fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties` for values.
  - Kafka (proto), if running recommendation pipeline: `spring.kafka.bootstrap-servers=localhost:9092`
  - Keycloak (optional for auth) listening on `http://localhost:8181` as `authConfig` expects.
- Maven is optional if you use the included wrapper `mvnw`/`mvnw.cmd`.

The repo includes Maven wrapper configuration in every backend service:
- Example: [`Api-Gateway/Api-Gateway/.mvn/wrapper/maven-wrapper.properties`](Api-Gateway/Api-Gateway/.mvn/wrapper/maven-wrapper.properties)

## Setup & Run (Development)
1. Start infrastructure:
   - Ensure MongoDB, Kafka, and Keycloak (if used) are running. The `fitnessRecommendation-service.properties` contains default values.

2. Start Service Discovery (Eureka)
   ```sh
   cd eureka/eureka
   ./mvnw spring-boot:run  # or mvnw.cmd on Windows
   ```

3. Start Config Server
   ```sh
   cd configserver/configserver
   ./mvnw spring-boot:run
   ```
   Config files for services are in `configserver/configserver/src/main/resources/config` (e.g., [`api-gateway.properties`](configserver/configserver/src/main/resources/config/api-gateway.properties)).

4. Start Application Services
   - Start `UserService`:
     ```sh
     cd UserService/UserService
     ./mvnw spring-boot:run
     ```
   - Start `activityService`:
     ```sh
     cd activityService/activityService
     ./mvnw spring-boot:run
     ```
   - Start `fitnessRecommendation`:
     ```sh
     cd fitnessRecommendation
     ./mvnw spring-boot:run
     ```
   - Start `Api-Gateway`:
     ```sh
     cd Api-Gateway/Api-Gateway
     ./mvnw spring-boot:run
     ```

5. Start Frontend
   ```sh
   cd "Ai-Finess Frontend"
   npm install
   npm run dev
   ```
   The frontend listens by default on `http://localhost:5173` and uses `react-oauth2-code-pkce` configured in [`Ai-Finess Frontend/src/store/authConfig.js`](Ai-Finess Frontend/src/store/authConfig.js).

6. Access
   - Visit the frontend: `http://localhost:5173`
   - API calls go through the gateway at `http://localhost:8777` (see gateway port in `configserver` config).

## Important Configuration & Env Vars
- `Keycloak`:
  - `Ai-Finess Frontend/src/store/authConfig.js` points to Keycloak endpoints (Realm: `AI-Fitness`) at `http://localhost:8181`.
  - Update `authConfig` if Keycloak host/ports differ.

- API endpoints & Gateway routing:
  - Check gateway route config in [`configserver/configserver/src/main/resources/config/api-gateway.properties`](configserver/configserver/src/main/resources/config/api-gateway.properties) — it maps `lb://USER-SERVICE`, `lb://ACTIVITY-SERVICE`, etc.

- AI (Gemini) API:
  - `fitnessRecommendation/service/GeminiService.java` posts requests using `gemini.api.url` and `gemini.api.key`. The default `gemini.api.key` is present in `fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties` — for security, replace with a secured method (env var or vault). See:
    - [`fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GeminiService.java`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GeminiService.java)
    - [`fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GenerateResponse.java`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GenerateResponse.java)

- Service discovery:
  - Each Spring Boot microservice config should set `spring.application.name`. Example: `activityService` uses `spring.application.name=activity-service` in `activityService/activityService/src/main/resources/application.properties`.

- WebClient base URL for users in `activityService`:
  - [`activityService/activityService/src/main/java/com/ai_fitness/activityService/config/WebClientConfig.java`](activityService/activityService/src/main/java/com/ai_fitness/activityService/config/WebClientConfig.java) sets base to `http://user-service` to use Eureka load balancing.

## Notable Files & Symbols
- Backends:
  - Main classes:
    - [`com.ai_fitness.Api_Gateway.ApiGatewayApplication`](Api-Gateway/Api-Gateway/src/main/java/com/ai_fitness/Api_Gateway/ApiGatewayApplication.java)
    - [`com.ai_fitness.fitnessRecommendation.FitnessRecommendationApplication`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/FitnessRecommendationApplication.java)
  - Gemini & AI:
    - [`com.ai_fitness.fitnessRecommendation.service.GeminiService`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GeminiService.java)
    - [`com.ai_fitness.fitnessRecommendation.service.GenerateResponse`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GenerateResponse.java)
  - Activity DTO:
    - [`com.ai_fitness.activityService.dto.ActivityResponse`](activityService/activityService/src/main/java/com/ai_fitness/activityService/dto/ActivityResponse.java)

- Frontend:
  - Auth config: [`Ai-Finess Frontend/src/store/authConfig.js`](Ai-Finess Frontend/src/store/authConfig.js)
  - API client: [`Ai-Finess Frontend/src/services/api.js`](Ai-Finess Frontend/src/services/api.js)
  - Redux auth slice: [`Ai-Finess Frontend/src/store/authSlice.js`](Ai-Finess Frontend/src/store/authSlice.js)
  - Main page components: `Activities` & `ActivityDetails`:
    - [`Ai-Finess Frontend/src/pages/Activities.jsx`](Ai-Finess Frontend/src/pages/Activities.jsx)
    - [`Ai-Finess Frontend/src/pages/ActivityDetails.jsx`](Ai-Finess Frontend/src/pages/ActivityDetails.jsx)

## Testing & Linting
- Run backend tests:
  ```sh
  cd <backend-service>
  ./mvnw test
  ```
- Run frontend lint and build:
  ```sh
  cd "Ai-Finess Frontend"
  npm run lint
  npm run build
  ```

## Troubleshooting
- "Maven wrapper cannot run" — ensure `JAVA_HOME` is set to a JDK and Java commands available. See `mvnw` scripts in each module (e.g., [`activityService/activityService/mvnw`](activityService/activityService/mvnw)).
- `Cannot connect to Keycloak` — ensure Keycloak is running and `authConfig.js` configured to correct URL.
- `Gemini` errors — confirm `gemini.api.url` and `gemini.api.key` (replace default API key with valid one).
- Service registry/gateway errors — make sure Eureka is running before starting other services; Gateway relies on `eureka`.

## Security & Secrets
- Do not hardcode API keys or credentials in the codebase. Move secrets to environment variables or secret stores.
  - Example: Replace `gemini.api.key` in [`fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties`](fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties) with an environment variable or external secret.

## Contribution
- Please open issues and create PRs per repository conventions. Run tests and linters before submitting.
- Keep commit messages clear and follow the repo’s preferred branching strategy.

## License
- Add relevant license file and describe basic license terms here (open-source or proprietary).

---

If you want, I can generate and commit a `README.md` draft based on the above, or tailor sections (like development steps, Docker Compose, or environment variable recommendations).// filepath: README.md
# AI-Fitness (Monorepo)

AI-Fitness is a microservice-based fitness analytics project with a React + Vite frontend and multiple Spring Boot backend services. It includes a centralized configuration server, service discovery (Eureka), an API Gateway, a recommendation service using an AI model (Gemini), and a front-end dashboard for users.

## Table of Contents
- Overview
- Architecture & Modules
- Prerequisites
- Setup & Run
- Configuration & Env
- Important Files & Symbols
- Testing & Linting
- Troubleshooting
- Contributing & License

## Overview
This project provides:
- Logging and tracking workout/activity sessions (frontend, `Ai-Finess Frontend`).
- Microservices: User service, Activity service, Fitness recommendation service.
- Centralized configuration via Spring Cloud Config (`configserver`).
- Service discovery via Eureka (`eureka`).
- API Gateway (`Api-Gateway`) that routes to internal microservices.
- AI-based fitness analysis powered by Gemini (`fitnessRecommendation`).
- Frontend client built with React & Vite.

## Architecture & Modules
- Microservices and infra
  - `eureka` — Service registry and discovery
    - Files: [`eureka/eureka/pom.xml`](eureka/eureka/pom.xml), [`eureka/eureka/mvnw`](eureka/eureka/mvnw)
  - `configserver` — Spring Cloud Config Server (stores service-specific config files)
    - Files: [`configserver/configserver/pom.xml`](configserver/configserver/pom.xml), [`configserver/configserver/src/main/resources/config/api-gateway.properties`](configserver/configserver/src/main/resources/config/api-gateway.properties)
  - `Api-Gateway` — Spring Cloud Gateway (routes requests to services)
    - Files: [`Api-Gateway/Api-Gateway/pom.xml`](Api-Gateway/Api-Gateway/pom.xml), [`Api-Gateway/Api-Gateway/src/main/java/com/ai_fitness/Api_Gateway/ApiGatewayApplication.java`](Api-Gateway/Api-Gateway/src/main/java/com/ai_fitness/Api_Gateway/ApiGatewayApplication.java)
  - `UserService` — User registration & management
    - Files: [`UserService/UserService/pom.xml`](UserService/UserService/pom.xml), [`UserService/UserService/src/main/resources/application.properties`](UserService/UserService/src/main/resources/application.properties)
  - `activityService` — Tracks and stores activities
    - Files: [`activityService/activityService/pom.xml`](activityService/activityService/pom.xml), [`activityService/activityService/src/main/java/com/ai_fitness/activityService/config/WebClientConfig.java`](activityService/activityService/src/main/java/com/ai_fitness/activityService/config/WebClientConfig.java)
  - `fitnessRecommendation` — Uses Gemini to generate recommendations, stores analysis
    - Files: [`fitnessRecommendation/pom.xml`](fitnessRecommendation/pom.xml), [`fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/FitnessRecommendationApplication.java`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/FitnessRecommendationApplication.java), [`fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GeminiService.java`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GeminiService.java), [`fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GenerateResponse.java`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GenerateResponse.java), [`fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties`](fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties)
  - `Ai-Finess Frontend` — React + Vite SPA
    - Files: [`Ai-Finess Frontend/package.json`](Ai-Finess Frontend/package.json), [`Ai-Finess Frontend/src/services/api.js`](Ai-Finess Frontend/src/services/api.js), [`Ai-Finess Frontend/src/pages/Activities.jsx`](Ai-Finess Frontend/src/pages/Activities.jsx), [`Ai-Finess Frontend/src/pages/ActivityDetails.jsx`](Ai-Finess Frontend/src/pages/ActivityDetails.jsx)

## Prerequisites
- Java 17+ and the JDK on PATH or set via `JAVA_HOME`. The projects use Java 17 in pom properties.
- Node.js 18+ and npm/yarn/pnpm (for frontend).
- Docker or local installations of:
  - MongoDB (default `fitnessRecommendation` DB). See `fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties` for values.
  - Kafka (proto), if running recommendation pipeline: `spring.kafka.bootstrap-servers=localhost:9092`
  - Keycloak (optional for auth) listening on `http://localhost:8181` as `authConfig` expects.
- Maven is optional if you use the included wrapper `mvnw`/`mvnw.cmd`.

The repo includes Maven wrapper configuration in every backend service:
- Example: [`Api-Gateway/Api-Gateway/.mvn/wrapper/maven-wrapper.properties`](Api-Gateway/Api-Gateway/.mvn/wrapper/maven-wrapper.properties)

## Setup & Run (Development)
1. Start infrastructure:
   - Ensure MongoDB, Kafka, and Keycloak (if used) are running. The `fitnessRecommendation-service.properties` contains default values.

2. Start Service Discovery (Eureka)
   ```sh
   cd eureka/eureka
   ./mvnw spring-boot:run  # or mvnw.cmd on Windows
   ```

3. Start Config Server
   ```sh
   cd configserver/configserver
   ./mvnw spring-boot:run
   ```
   Config files for services are in `configserver/configserver/src/main/resources/config` (e.g., [`api-gateway.properties`](configserver/configserver/src/main/resources/config/api-gateway.properties)).

4. Start Application Services
   - Start `UserService`:
     ```sh
     cd UserService/UserService
     ./mvnw spring-boot:run
     ```
   - Start `activityService`:
     ```sh
     cd activityService/activityService
     ./mvnw spring-boot:run
     ```
   - Start `fitnessRecommendation`:
     ```sh
     cd fitnessRecommendation
     ./mvnw spring-boot:run
     ```
   - Start `Api-Gateway`:
     ```sh
     cd Api-Gateway/Api-Gateway
     ./mvnw spring-boot:run
     ```

5. Start Frontend
   ```sh
   cd "Ai-Finess Frontend"
   npm install
   npm run dev
   ```
   The frontend listens by default on `http://localhost:5173` and uses `react-oauth2-code-pkce` configured in [`Ai-Finess Frontend/src/store/authConfig.js`](Ai-Finess Frontend/src/store/authConfig.js).

6. Access
   - Visit the frontend: `http://localhost:5173`
   - API calls go through the gateway at `http://localhost:8777` (see gateway port in `configserver` config).

## Important Configuration & Env Vars
- `Keycloak`:
  - `Ai-Finess Frontend/src/store/authConfig.js` points to Keycloak endpoints (Realm: `AI-Fitness`) at `http://localhost:8181`.
  - Update `authConfig` if Keycloak host/ports differ.

- API endpoints & Gateway routing:
  - Check gateway route config in [`configserver/configserver/src/main/resources/config/api-gateway.properties`](configserver/configserver/src/main/resources/config/api-gateway.properties) — it maps `lb://USER-SERVICE`, `lb://ACTIVITY-SERVICE`, etc.

- AI (Gemini) API:
  - `fitnessRecommendation/service/GeminiService.java` posts requests using `gemini.api.url` and `gemini.api.key`. The default `gemini.api.key` is present in `fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties` — for security, replace with a secured method (env var or vault). See:
    - [`fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GeminiService.java`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GeminiService.java)
    - [`fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GenerateResponse.java`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GenerateResponse.java)

- Service discovery:
  - Each Spring Boot microservice config should set `spring.application.name`. Example: `activityService` uses `spring.application.name=activity-service` in `activityService/activityService/src/main/resources/application.properties`.

- WebClient base URL for users in `activityService`:
  - [`activityService/activityService/src/main/java/com/ai_fitness/activityService/config/WebClientConfig.java`](activityService/activityService/src/main/java/com/ai_fitness/activityService/config/WebClientConfig.java) sets base to `http://user-service` to use Eureka load balancing.

## Notable Files & Symbols
- Backends:
  - Main classes:
    - [`com.ai_fitness.Api_Gateway.ApiGatewayApplication`](Api-Gateway/Api-Gateway/src/main/java/com/ai_fitness/Api_Gateway/ApiGatewayApplication.java)
    - [`com.ai_fitness.fitnessRecommendation.FitnessRecommendationApplication`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/FitnessRecommendationApplication.java)
  - Gemini & AI:
    - [`com.ai_fitness.fitnessRecommendation.service.GeminiService`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GeminiService.java)
    - [`com.ai_fitness.fitnessRecommendation.service.GenerateResponse`](fitnessRecommendation/src/main/java/com/ai_fitness/fitnessRecommendation/service/GenerateResponse.java)
  - Activity DTO:
    - [`com.ai_fitness.activityService.dto.ActivityResponse`](activityService/activityService/src/main/java/com/ai_fitness/activityService/dto/ActivityResponse.java)

- Frontend:
  - Auth config: [`Ai-Finess Frontend/src/store/authConfig.js`](Ai-Finess Frontend/src/store/authConfig.js)
  - API client: [`Ai-Finess Frontend/src/services/api.js`](Ai-Finess Frontend/src/services/api.js)
  - Redux auth slice: [`Ai-Finess Frontend/src/store/authSlice.js`](Ai-Finess Frontend/src/store/authSlice.js)
  - Main page components: `Activities` & `ActivityDetails`:
    - [`Ai-Finess Frontend/src/pages/Activities.jsx`](Ai-Finess Frontend/src/pages/Activities.jsx)
    - [`Ai-Finess Frontend/src/pages/ActivityDetails.jsx`](Ai-Finess Frontend/src/pages/ActivityDetails.jsx)

## Testing & Linting
- Run backend tests:
  ```sh
  cd <backend-service>
  ./mvnw test
  ```
- Run frontend lint and build:
  ```sh
  cd "Ai-Finess Frontend"
  npm run lint
  npm run build
  ```

## Troubleshooting
- "Maven wrapper cannot run" — ensure `JAVA_HOME` is set to a JDK and Java commands available. See `mvnw` scripts in each module (e.g., [`activityService/activityService/mvnw`](activityService/activityService/mvnw)).
- `Cannot connect to Keycloak` — ensure Keycloak is running and `authConfig.js` configured to correct URL.
- `Gemini` errors — confirm `gemini.api.url` and `gemini.api.key` (replace default API key with valid one).
- Service registry/gateway errors — make sure Eureka is running before starting other services; Gateway relies on `eureka`.

## Security & Secrets
- Do not hardcode API keys or credentials in the codebase. Move secrets to environment variables or secret stores.
  - Example: Replace `gemini.api.key` in [`fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties`](fitnessRecommendation/src/main/resources/config/fitnessRecommendation-service.properties) with an environment variable or external secret.

## Contribution
- Please open issues and create PRs per repository conventions. Run tests and linters before submitting.
- Keep commit messages clear and follow the repo’s preferred branching strategy.

## License
- Add relevant license file and describe basic license terms here (open-source or proprietary).

---

If you want, I can generate and commit a `README.md` draft based on the above, or tailor sections (like development steps, Docker Compose, or environment variable recommendations).