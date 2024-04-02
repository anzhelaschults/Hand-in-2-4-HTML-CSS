{
  "users": [
    {
      "user_id": "PK",
      "username": "string",
      "email": "string", 
      "password_hash": "string",
      "created_at": "date",
      "updated_at": "date"
    }
  ],
  "posts": [
    {
      "post_id": "PK",
      "user_id": "FK",
      "title": "string",
      "body": "string",
      "is_public": "boolean", 
      "created_at": "date",
      "updated_at": "date",
      "published_at": "date",
      "feedback_requested": "boolean"
    }
  ],
  "archive": [
    {
      "archive_id": "PK",
      "post_id": "FK",
      "deleted_at": "date"
    }
  ],
  "sessions": [
    {
      "session_id": "PK",
      "user_id": "FK",
      "session_data": "string",
      "expires_at": "date" 
    }
  ],
  "ai_feedback": [
    {
      "feedback_id": "PK",
      "post_id": "FK",
      "feedback_text": "string",
      "created_at": "date",
      "rating_value": "string or null"
    }
  ]
}
_____________________________________________

  "username": "john_doe",
  "email": "john@example.com",
  "password_hash": "$2b$10$...", // Hashed password
  "created_at": "2023-04-01T12:00:00Z",
  "updated_at": "2023-04-01T12:00:00Z"
  ________________
/** 
* Paste one or more documents here 
*/
{
  "user_id": {
    "$oid": "660bb333f998994c129e33d0"
  },
  "username": "anzhela",
  "email": "anzhela.schults@code.berlin",
  "password_hash": "1#$17%$#...",
  "created_at": "01/04/2023 12:00",
  "updated_at": "01/04/2023 12:01"
},
{
  "user_id": {
    "$oid": "660bb333f998994c129e33d1" 
  },
  "username": "alex",
  "email": "alex@example.com",
  "password_hash": "$%#@4566743...", 
  "created_at": "02/04/2023 12:00",
  "updated_at": "02/04/2023 12:50"
}

__________________________________________
/**
* Paste one or more documents here
*/
{
  "post_id": {
    "$oid": "640bb333f998994c129e33d2"
  },
  "user_id": {
    "$oid": "660bb333f998994c129e33d0" 
  },
  "title": "My First Post",
  "body": "This is the body of my first blog post.",
  "is_public": true,
  "created_at": "02/04/2023 13:01",
  "updated_at": "02/04/2023 13:02",
  "published_at": "02/04/2023 12:03",
  "feedback_requested": true
}
____________________________________________
/**
* Paste one or more documents here
*/
{
  "archive_id": {
    "$oid": "650bb333f998994c129e33d3"
  },
  "post_id": {
    "$oid": "640bb333f998994c129e33d2"
  },
  "deleted_at": "02/04/2023 18:01"
}
________________________________________
/**
* Paste one or more documents here
*/
{
  "feedback_id": {
    "$oid": "670bb333f998994c129e33d4"
  },
  "post_id": {
    "$oid": "640bb333f998994c129e33d2"
  },
  "feedback_text": "You are doing great.",
  "created_at": "02/04/2023 19:01",
  "rating_value": "4"
}
_________________________________________
/**
* Paste one or more documents here
*/
{
  "session_id": {
    "$oid": "680bb333f998994c129e33d5"
  },
  "user_id": {
    "$oid": "660bb333f998994c129e33d0"
  },
  "expires_at": "03/04/2023 12:01"
}