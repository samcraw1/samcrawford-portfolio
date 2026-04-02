# ============================================================
# visitor_counter.py — Contractor #1's Job Instructions
# When someone visits the site, this function:
#   1. Opens the visitor-counter filing cabinet
#   2. Reads the current count
#   3. Adds 1
#   4. Writes the new count back
#   5. Returns the new count to the visitor
# ============================================================

import json
import boto3
import os

# English: "Create a connection to DynamoDB so we can read/write data."
# boto3 is AWS's Python library — it's how Python talks to AWS services.
dynamodb = boto3.resource("dynamodb")

# English: "Open the specific table. The table name comes from an
#   environment variable that Terraform will set when creating the Lambda."
# os.environ["TABLE_NAME"] = "go check my environment variables for TABLE_NAME"
#   Terraform sets this to "samcrawford-portfolio-visitor-counter"
table = dynamodb.Table(os.environ["TABLE_NAME"])


# English: "This is the main function that runs when Lambda is triggered."
# 'event' = the incoming request data (from API Gateway)
# 'context' = metadata about the Lambda execution (we don't need it here)
def handler(event, context):

    # English: "Go to the filing cabinet, find the folder labeled 'visitors',
    #   and read what's inside."
    response = table.get_item(Key={"id": "visitors"})

    # English: "If the folder exists, grab the count. If not, start at 0."
    # .get() is Python for "try to grab this, but don't crash if it's missing"
    count = response.get("Item", {}).get("count", 0)

    # English: "Add 1 to the count."
    count = count + 1

    # English: "Write the new count back to the filing cabinet."
    table.put_item(Item={"id": "visitors", "count": count})

    # English: "Send the new count back to whoever asked."
    # statusCode 200 = "everything went fine"
    # The 'headers' part allows the browser to accept this response
    #   (CORS = Cross-Origin Resource Sharing, a browser security thing)
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps({"count": count}),
    }
