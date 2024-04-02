Hand-in 3/4 Requirements:
Hand-in your project with a working database connection and at least one data model. Use a templating language to render database entries within the HTML of your website. Allow users to create, update, and delete database entries

(I will use Mongo DB Compass for my project)
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
