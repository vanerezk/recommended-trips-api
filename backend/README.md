## Title

Recommended Trips API

## Description

This project involves the implementation of a RESTful API that powers a travel recommendation portal. The API provides the necessary endpoints to manage user interactions and data related to travel recommendations.

The API interacts with several entities in the database, including users, locations, recommendations, recommendation photos, comments, and recommendation likes. It provides a range of endpoints to handle actions such as registration, login, profile management, recommendation creation, voting, and more.


## Entities

users:

- id
- photo
- nickName
- email
- password
- created_at

locations:

- id
- country

recomendaciones:

- id
- title
- category
- locationId
- lean_in
- userId
- description
- created_at

recommendationPhotos:

- id
- recommendationId
- URL

comentarios:

- id
- message
- recommendationId
- userId

recommendationsLikes:

- id
- recommendationId
- userId

## Endpoints

- POST Register✔️
- POST Log ✔️
- POST Profile ✔️
- PATCH Managa profile ✔️
- POST Create recommendations ✔️
- PUT Likes y dislikes ✔️
- PATCH Edit experiencies by id  ✔️
- DELETE Delete experiencies by id  ✔️
- GET All recommendations ✔️
- GET Search by category or country ✔️
- GET Show the whole recommendation ✔️
- GET Group recommendations by likes ✔️

