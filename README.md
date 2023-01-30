# Parking Service

## Task

- [x] You’ll write a REST API for managing an in-memory car parking lot (no database).
- [x] The parking lot size can be configured from a .env file and defaults to 5.
- [x] The REST API will have the following endpoints:
  - [x] /park - parks a car given its license plate (string), returns a JSON with license plate and slot (if a slot is available) or an error message if the parking lot is full
  - [x] /slot - given a reference to a parking slot, will return a JSON with information about the slot: if it is empty or not and the license plate of the parked car (if any)
  - [x] /unpark - given a license plate, finds the car and frees the slot, returns a JSON with information about the car and the slot, or an error message if the car is not found
- [x] (bonus points) add authentication with a login route and protect all other routes
- [x] (bonus points) add a rate limiter with 429 Too Many Requests
- [x] (bonus points) write unit tests for each route

## Requirements

- docker
- docker-compose

## Startup

```shell
docker-compose up -d
```

Server will be available on http://localhost:8000

## Logs

```shell
docker-compose logs -f web
```

## API Docs

To document endpoints i used Swagger with @nestjs/swagger

Available on: http://localhost:8000/api/docs

## Main Points

- This version is suitable only for local development
- If we create more than one of instances of app, each other will have separate database, so for multi-instance i'll propose to use database
- Also we should not forget about data consistency in a case of multiple instances (e.g. condition race while parking)
