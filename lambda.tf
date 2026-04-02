# ============================================================
# lambda.tf — The Contractors
# Creates two Lambda functions (visitor counter + contact form),
# their IAM roles (employee badges), and IAM policies (permissions).
# Also zips up the Python code so Lambda can use it.
# ============================================================


# ************************************************************
# SECTION 1: ZIP THE PYTHON CODE
# Terraform needs to zip the Python files before uploading them.
# 'data' means "look something up" — it doesn't create an AWS resource,
# it just does work locally on your machine.
# ************************************************************

# --- English: "Zip up the visitor counter Python file." ---
data "archive_file" "visitor_counter" {

  # English: "Create a zip file."
  type = "zip"

  # English: "The Python file to zip."
  # This is a local file path — the lambda/ folder we just created.
  source_file = "${path.module}/lambda/visitor_counter.py"

  # English: "Save the zip here."
  # path.module = "the folder where this .tf file lives"
  #   Dot decoder: path.module
  #     path    = "a built-in Terraform object for file paths"
  #       .module = "the current module's directory"
  #     Result: "/Users/sam/samcrawford-portfolio"
  output_path = "${path.module}/lambda/visitor_counter.zip"
}

# --- English: "Zip up the contact form Python file." ---
data "archive_file" "contact_form" {
  type        = "zip"
  source_file = "${path.module}/lambda/contact_form.py"
  output_path = "${path.module}/lambda/contact_form.zip"
}


# ************************************************************
# SECTION 2: IAM ROLES (THE EMPLOYEE BADGES)
# Each Lambda needs a role that says "I'm a Lambda, let me run."
# ************************************************************

# --- English: "Create an IAM role (badge) for the visitor counter Lambda." ---
resource "aws_iam_role" "visitor_counter" {

  # English: "Name the badge."
  name = "${var.project_name}-visitor-counter-role"

  # English: "Who is allowed to wear this badge? The Lambda service."
  # This is the 'assume role policy' — it says "only Lambda can use this role."
  # jsonencode converts our clean code into the JSON format AWS expects.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        # English: "Allow the Lambda service to assume (wear) this role."
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Project = var.project_name
  }
}

# --- English: "Create an IAM role (badge) for the contact form Lambda." ---
# Same structure as above, just for the second contractor.
resource "aws_iam_role" "contact_form" {
  name = "${var.project_name}-contact-form-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Project = var.project_name
  }
}


# ************************************************************
# SECTION 3: IAM POLICIES (THE FINE PRINT ON THE BADGES)
# These say exactly what each Lambda can do in DynamoDB.
# ************************************************************

# --- English: "Create a policy (fine print) for the visitor counter Lambda." ---
resource "aws_iam_policy" "visitor_counter" {
  name = "${var.project_name}-visitor-counter-policy"

  # English: "Here's what the visitor counter is allowed to do."
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        # English: "Allow reading and writing to the visitor counter table."
        Effect = "Allow"

        # English: "These are the specific actions allowed:"
        # GetItem = read a row, PutItem = write a row, UpdateItem = change a row
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ]

        # English: "ONLY on this specific table — not any other table."
        # Dot decoder: aws_dynamodb_table.visitor_counter.arn
        #   aws_dynamodb_table = "a DynamoDB table resource"
        #     .visitor_counter = "the one nicknamed 'visitor_counter'"
        #       .arn           = "grab its ARN (Amazon serial number)"
        Resource = aws_dynamodb_table.visitor_counter.arn
      },
      {
        # English: "Also allow writing logs to CloudWatch."
        # CloudWatch is AWS's logging service. Without this,
        # you couldn't see error messages if something breaks.
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        # English: "Allow logging anywhere (all log groups)."
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })

  tags = {
    Project = var.project_name
  }
}

# --- English: "Create a policy (fine print) for the contact form Lambda." ---
resource "aws_iam_policy" "contact_form" {
  name = "${var.project_name}-contact-form-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        # English: "Allow writing to the contact form table."
        # Only PutItem — this Lambda doesn't need to read, just write.
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem"
        ]

        # Dot decoder: aws_dynamodb_table.contact_form.arn
        #   aws_dynamodb_table = "a DynamoDB table resource"
        #     .contact_form    = "the one nicknamed 'contact_form'"
        #       .arn           = "grab its ARN"
        Resource = aws_dynamodb_table.contact_form.arn
      },
      {
        # English: "Also allow writing logs to CloudWatch."
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })

  tags = {
    Project = var.project_name
  }
}


# ************************************************************
# SECTION 4: ATTACH POLICIES TO ROLES
# Staple the fine print onto the badges.
# ************************************************************

# --- English: "Attach the visitor counter policy to the visitor counter role." ---
# This connects "what it's allowed to do" to "who it is."
resource "aws_iam_role_policy_attachment" "visitor_counter" {

  # English: "Which role (badge) to attach to."
  # Dot decoder: aws_iam_role.visitor_counter.name
  #   aws_iam_role     = "an IAM role resource"
  #     .visitor_counter = "the one nicknamed 'visitor_counter'"
  #       .name        = "grab its name"
  role = aws_iam_role.visitor_counter.name

  # English: "Which policy (fine print) to staple on."
  # Dot decoder: aws_iam_policy.visitor_counter.arn
  #   aws_iam_policy   = "an IAM policy resource"
  #     .visitor_counter = "the one nicknamed 'visitor_counter'"
  #       .arn          = "grab its ARN"
  policy_arn = aws_iam_policy.visitor_counter.arn
}

# --- English: "Attach the contact form policy to the contact form role." ---
resource "aws_iam_role_policy_attachment" "contact_form" {

  # Dot decoder: aws_iam_role.contact_form.name
  #   aws_iam_role  = "an IAM role resource"
  #     .contact_form = "the one nicknamed 'contact_form'"
  #       .name     = "grab its name"
  role = aws_iam_role.contact_form.name

  # Dot decoder: aws_iam_policy.contact_form.arn
  #   aws_iam_policy = "an IAM policy resource"
  #     .contact_form = "the one nicknamed 'contact_form'"
  #       .arn       = "grab its ARN"
  policy_arn = aws_iam_policy.contact_form.arn
}


# ************************************************************
# SECTION 5: THE LAMBDA FUNCTIONS THEMSELVES
# Finally — hire the contractors.
# ************************************************************

# --- English: "Create the visitor counter Lambda function." ---
resource "aws_lambda_function" "visitor_counter" {

  # English: "Name this function."
  function_name = "${var.project_name}-visitor-counter"

  # English: "Use the zip file we created in Section 1."
  # Dot decoder: data.archive_file.visitor_counter.output_path
  #   data              = "a data source (not an AWS resource)"
  #     .archive_file   = "the type (a zip archiver)"
  #       .visitor_counter = "the one nicknamed 'visitor_counter'"
  #         .output_path = "grab the path to the zip file"
  filename = data.archive_file.visitor_counter.output_path

  # English: "A hash of the zip file so Terraform knows when the code changes."
  # If the hash changes, Terraform will re-upload the code.
  # Dot decoder: data.archive_file.visitor_counter.output_base64sha256
  #   (same path as above, but grabbing the hash instead of the file path)
  source_code_hash = data.archive_file.visitor_counter.output_base64sha256

  # English: "This Lambda runs Python 3.12."
  runtime = "python3.12"

  # English: "When triggered, run the 'handler' function inside 'visitor_counter.py'."
  # Format: filename_without_extension.function_name
  # So "visitor_counter.handler" means: open visitor_counter.py, run handler()
  handler = "visitor_counter.handler"

  # English: "Use the IAM role (badge) we created for this Lambda."
  # Dot decoder: aws_iam_role.visitor_counter.arn
  #   aws_iam_role     = "an IAM role resource"
  #     .visitor_counter = "the one nicknamed 'visitor_counter'"
  #       .arn          = "grab its ARN"
  role = aws_iam_role.visitor_counter.arn

  # English: "Set environment variables that the Python code can read."
  # This is how the Python code knows which DynamoDB table to use.
  # Remember in the Python file: os.environ["TABLE_NAME"]
  environment {
    variables = {
      # Dot decoder: aws_dynamodb_table.visitor_counter.name
      #   aws_dynamodb_table = "a DynamoDB table resource"
      #     .visitor_counter = "the one nicknamed 'visitor_counter'"
      #       .name          = "grab its name"
      #   Result: "samcrawford-portfolio-visitor-counter"
      TABLE_NAME = aws_dynamodb_table.visitor_counter.name
    }
  }

  tags = {
    Project = var.project_name
  }
}

# --- English: "Create the contact form Lambda function." ---
resource "aws_lambda_function" "contact_form" {

  function_name = "${var.project_name}-contact-form"

  # Dot decoder: data.archive_file.contact_form.output_path
  #   data            = "a data source"
  #     .archive_file = "the type (a zip archiver)"
  #       .contact_form = "the one nicknamed 'contact_form'"
  #         .output_path = "grab the path to the zip file"
  filename         = data.archive_file.contact_form.output_path
  source_code_hash = data.archive_file.contact_form.output_base64sha256

  runtime = "python3.12"

  # English: "Open contact_form.py, run handler()"
  handler = "contact_form.handler"

  # Dot decoder: aws_iam_role.contact_form.arn
  #   aws_iam_role  = "an IAM role resource"
  #     .contact_form = "the one nicknamed 'contact_form'"
  #       .arn      = "grab its ARN"
  role = aws_iam_role.contact_form.arn

  environment {
    variables = {
      # Dot decoder: aws_dynamodb_table.contact_form.name
      #   aws_dynamodb_table = "a DynamoDB table resource"
      #     .contact_form    = "the one nicknamed 'contact_form'"
      #       .name          = "grab its name"
      #   Result: "samcrawford-portfolio-contact-form"
      TABLE_NAME = aws_dynamodb_table.contact_form.name
    }
  }

  tags = {
    Project = var.project_name
  }
}
