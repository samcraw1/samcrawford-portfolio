# ============================================================
# contact_form.py — Contractor #2's Job Instructions
# When someone submits the contact form, this function:
#   1. Reads their name, email, and message from the request
#   2. Generates a unique ID for the submission
#   3. Saves it to the contact-form filing cabinet
#   4. Returns "thanks, got it" to the visitor
# ============================================================

import json
import boto3
import os
import uuid
from datetime import datetime

# English: "Create a connection to DynamoDB so we can write data."
dynamodb = boto3.resource("dynamodb")

# English: "Open the contact-form table. Name comes from an environment
#   variable that Terraform sets."
# os.environ["TABLE_NAME"] = "samcrawford-portfolio-contact-form"
table = dynamodb.Table(os.environ["TABLE_NAME"])


# English: "This is the main function that runs when Lambda is triggered."
def handler(event, context):

    # English: "Read the incoming request body and parse it from JSON text
    #   into a Python dictionary (like opening a letter and reading it)."
    body = json.loads(event.get("body", "{}"))

    # English: "Pull out the name, email, and message from the request.
    #   If any field is missing, default to an empty string."
    name = body.get("name", "")
    email = body.get("email", "")
    message = body.get("message", "")

    # English: "If any required field is empty, send back an error."
    # statusCode 400 = "bad request — you forgot something"
    if not name or not email or not message:
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": "name, email, and message are required"}),
        }

    # English: "Save the submission to the filing cabinet."
    # uuid4() generates a random unique ID like "a1b2c3d4-e5f6-..."
    # This becomes the partition key so each message has its own folder.
    # We also save a timestamp so you know when it was submitted.
    table.put_item(
        Item={
            "id": str(uuid.uuid4()),
            "name": name,
            "email": email,
            "message": message,
            "submitted_at": datetime.utcnow().isoformat(),
        }
    )

    # English: "Send back a success response."
    # statusCode 200 = "everything went fine"
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps({"message": "Message received, thank you!"}),
    }
