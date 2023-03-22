# project-WeLoveMovies

A RESTful API built using Express
### Routes

#### `GET /movies`
This route will respond with a list of all movies.

#### `GET /movies?is_showing=true`
This route will return _only those movies where the movie is currently showing in theaters._

**Example request**
```
GET http://localhost:5000/movies
```

**Example response**
```
{
  "data": [
    {
      "id": 1,
      "title": "Spirited Away",
      "runtime_in_minutes": 125,
      "rating": "PG",
      "description": "Chihiro ...",
      "image_url": "https://imdb-api.com/..."
    }
    // ...
  ]
}
```
**Example request**
```
GET /movies?is_showing=true
```
The response from the server should look identical to the response above _except_ that it may exclude some records.

#### `GET /movies/:movieId`
This route will get an individual movie by id

**Example request**
```
GET http://localhost:5000/movie/1
```

**Example response**

Status 200
```
{
  "data": {
    "id": 1,
    "title": "Spirited Away",
    "runtime_in_minutes": 125,
    "rating": "PG",
    "description": "Chihiro...",
    "image_url": "https://imdb-api.com/..."
  }
}
```

#### `GET /movies/:movieId (incorrect ID)`

If the given id does not match an existing movie, a response like the following will be returned:

Status 404
```
{
  "error": "Movie cannot be found."
}
```

#### `GET /movies/:movieId/theaters`

**Example request**
```
GET /movies/:movieId/theaters
```

This route will return all the `theaters` where the movie is playing. 

The response from the server for a request to `/movies/1/theaters` should look like the following:
```json
{
  "data": [
    {
      "theater_id": 2,
      "name": "Hollywood Theatre",
      "address_line_1": "4122 NE Sandy Blvd.",
      "address_line_2": "",
      "city": "Portland",
      "state": "OR",
      "zip": "97212",
      "created_at": "2021-02-23T20:48:13.342Z",
      "updated_at": "2021-02-23T20:48:13.342Z",
      "is_showing": true,
      "movie_id": 1
    }
    // ...
  ]
}
```

#### `GET /movies/:movieId/reviews`

**Example request**
```
GET /movies/:movieId/reviews
```

This route will return all the `reviews` for the movie, including all the `critic` details.

The response from the server for a request to `/movies/1/reviews` should look like the following:
```json
{
  "data": [
    {
      "review_id": 1,
      "content": "Lorem markdownum ...",
      "score": 3,
      "created_at": "2021-02-23T20:48:13.315Z",
      "updated_at": "2021-02-23T20:48:13.315Z",
      "critic_id": 1,
      "movie_id": 1,
      "critic": {
        "critic_id": 1,
        "preferred_name": "Chana",
        "surname": "Gibson",
        "organization_name": "Film Frenzy",
        "created_at": "2021-02-23T20:48:13.308Z",
        "updated_at": "2021-02-23T20:48:13.308Z"
      }
    }
    // ...
  ]
}
```

#### `DELETE /reviews/:reviewId`

**Example request**
```
DELETE /reviews/:reviewId
```
Delete a review by its id. The server should respond with `204 No Content`.

#### `DELETE /reviews/:reviewId (incorrect ID)`

If the given ID does not match an existing review, a response like the following should be returned:

```json
{
  "error": "Review cannot be found."
}
```

The response will have `404` as the status code response.



#### `UPDATE /reviews/:reviewId`

This route will allow partially or fully updating of a review. If the ID is incorrect, a `404` will be returned.

**Example request**
```
PUT /reviews/:reviewId
```

A body like the following should be passed along with the request:

```json
{
  "score": 3,
  "content": "New content..."
}
```

The response should include the entire review record with the newly patched content, and the critic information set to the `critic` property.

```json
{
  "data": {
    "review_id": 1,
    "content": "New content...",
    "score": 3,
    "created_at": "2021-02-23T20:48:13.315Z",
    "updated_at": "2021-02-23T20:48:13.315Z",
    "critic_id": 1,
    "movie_id": 1,
    "critic": {
      "critic_id": 1,
      "preferred_name": "Chana",
      "surname": "Gibson",
      "organization_name": "Film Frenzy",
      "created_at": "2021-02-23T20:48:13.308Z",
      "updated_at": "2021-02-23T20:48:13.308Z"
    }
  }
}
```

#### `UPDATE /reviews/:reviewId (incorrect ID)`

If the given ID does not match an existing review, a response like the following will be returned:

```json
{
  "error": "Review cannot be found."
}
```

The response will have `404` as the status code response.

#### `GET /theaters`

**Example request**
```
GET /theaters
```

This route will return all the `theaters` and, the movies playing at each theatre added to a `movies` array.
The response from the server should look like the following:

```json
{
  "data": [
    {
      "theater_id": 1,
      "name": "Regal City Center",
      "address_line_1": "801 C St.",
      "address_line_2": "",
      "city": "Vancouver",
      "state": "WA",
      "zip": "98660",
      "created_at": "2021-02-23T20:48:13.335Z",
      "updated_at": "2021-02-23T20:48:13.335Z",
      "movies": [
        {
          "movie_id": 1,
          "title": "Spirited Away",
          "runtime_in_minutes": 125,
          "rating": "PG",
          "description": "Chihiro...",
          "image_url": "https://imdb-api.com...",
          "created_at": "2021-02-23T20:48:13.342Z",
          "updated_at": "2021-02-23T20:48:13.342Z",
          "is_showing": false,
          "theater_id": 1
        }
        // ...
      ]
    }
    // ...
  ]
}
```
