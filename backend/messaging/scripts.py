from pymongo import MongoClient
from datetime import datetime
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['chat_db']
collection = db['messages']

# Sample Users
users = ["user1", "user2", "user3", "user4", "user5"]

# Generate 10 sample messages
messages = [
    {
        "sender": random.choice(users),
        "receiver": random.choice([u for u in users if u != users[0]]),
        "message": f"Message {i}",
        "timestamp": datetime.utcnow(),
        "is_read": random.choice([True, False])
    }
    for i in range(1, 11)
]

# Insert messages into the collection
result = collection.insert_many(messages)

# Output result
print(f"Inserted {len(result.inserted_ids)} messages into the database.")
