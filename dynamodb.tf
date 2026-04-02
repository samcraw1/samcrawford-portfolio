# ============================================================
# dynamodb.tf — The Filing Cabinets
# Creates two DynamoDB tables:
#   1. visitor_counter — tracks how many people visit the site
#   2. contact_form — stores contact form submissions
# ============================================================

# --- English: "Create a DynamoDB table and nickname it 'visitor_counter'." ---
# This is filing cabinet #1 — one row, one number.
# Lambda will read the count, add 1, and write it back.
resource "aws_dynamodb_table" "visitor_counter" {

  # English: "Name the table using our project name, plus '-visitor-counter'."
  # Dot decoder: var.project_name
  #   var            = "this is a variable"
  #     .project_name = "grab the one called project_name"
  #   Result: "samcrawford-portfolio-visitor-counter"
  name = "${var.project_name}-visitor-counter"

  # English: "Only charge me when I actually read or write data."
  # PAY_PER_REQUEST = pay per use. Perfect for low-traffic sites.
  # The alternative is PROVISIONED, where you pay for a fixed capacity 24/7.
  billing_mode = "PAY_PER_REQUEST"

  # English: "The partition key (folder label) is called 'id' and it's a string."
  # This is how DynamoDB finds rows. For this table, the one row
  # will have id = "visitors" and a separate 'count' attribute.
  # 'S' means String. Other options: 'N' for Number, 'B' for Binary.
  hash_key = "id"

  # English: "Define what the partition key looks like."
  attribute {
    name = "id"
    type = "S"
  }

  # English: "Label this resource so we can find it in the AWS console."
  tags = {
    Name    = "${var.project_name}-visitor-counter"
    Project = var.project_name
  }
}

# --- English: "Create a DynamoDB table and nickname it 'contact_form'." ---
# This is filing cabinet #2 — one row per message someone sends you.
resource "aws_dynamodb_table" "contact_form" {

  # English: "Name the table using our project name, plus '-contact-form'."
  # Dot decoder: var.project_name
  #   var            = "this is a variable"
  #     .project_name = "grab the one called project_name"
  #   Result: "samcrawford-portfolio-contact-form"
  name = "${var.project_name}-contact-form"

  # English: "Only charge me when I actually read or write data."
  billing_mode = "PAY_PER_REQUEST"

  # English: "The partition key is called 'id' and it's a string."
  # Each contact form submission gets a unique ID (like "msg-abc123").
  # Lambda will generate this ID when someone submits the form.
  hash_key = "id"

  # English: "Define what the partition key looks like."
  attribute {
    name = "id"
    type = "S"
  }

  # English: "Label this resource so we can find it in the AWS console."
  tags = {
    Name    = "${var.project_name}-contact-form"
    Project = var.project_name
  }
}
