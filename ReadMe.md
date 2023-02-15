
## Quotes Application
Problem Definition: 
Create the Quotes App API Endpoints for the website to consume.

API Endpoint:
https://quote-api-app.herokuapp.com/

Postman Collection:
https://www.getpostman.com/collections/7fabb8377c2c86497ac0

 _Entity Definitions:_

 Quotes:
- id (UUID), 
- quote (string), 
- author (string), 
- likes (number),
- dislikes (number), 
- tags (string)

tags: this will be a semicolon separated string for various tags

API Endpoints: 

CRUD Quote API

Consume the API endpoints to Create/Read/Update/Delete (CRUD) UI Screens.

Action End-Point Desc
- POST /quote Create a new quote
- GET /quote Get all the quotes
- GET /quote/:id Get quote based on id
- PATCH /quote/:id Update existing quote
- DELETE /quote/:id Delete existing quote


_Advance API :_

Action End-Point Desc

- GET /author Get names of all authors 
- GET /quote/search?author=”elon musk” Search quotes on author name
- GET /quote/search?tags=software Search quote on tags
- GET /quote/search?quote=good Search quotes based on 
quote text
- GET /quote/search?tag=”motivation
;software” Get the quotes based on 
the applied tags 
- PATCH /quote/:id/like/up Increments the like count 
by 1 for the selected 
quote
- PATCH /quote/:id/dislike/up Increments the dislike
count by 1 for the 
selected quote
- PATCH /quote/:id/like/down Decrements the likes
count by 1 for the 
selected quote
- PATCH /quote/:id/dislike/down Decrements the dislike 
count by 1 for the 
selected quote