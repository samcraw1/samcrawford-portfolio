# ============================================================
# api_gateway.tf — The Service Window
# Creates the HTTP API that receives requests from the browser
# and routes them to the correct Lambda function.
# ============================================================


# ************************************************************
# SECTION 1: CREATE THE API
# Build the service window itself.
# ************************************************************

# --- English: "Create an HTTP API and nickname it 'website'." ---
resource "aws_apigatewayv2_api" "website" {

  # English: "Name the API."
  # Dot decoder: var.project_name
  #   var            = "this is a variable"
  #     .project_name = "grab the one called project_name"
  #   Result: "samcrawford-portfolio-api"
  name = "${var.project_name}-api"

  # English: "This is an HTTP API (not WebSocket, not REST)."
  # HTTP APIs are simpler, cheaper, and faster than REST APIs.
  protocol_type = "HTTP"

  # English: "Set up CORS — tell browsers that requests from
  #   samcrawford.dev are allowed to hit this API."
  cors_configuration {

    # English: "Allow requests from these origins (your website)."
    # Dot decoder: var.domain_name
    #   var          = "this is a variable"
    #     .domain_name = "grab the one called domain_name"
    #   Result: "https://samcrawford.dev"
    allow_origins = ["https://${var.domain_name}"]

    # English: "Allow these HTTP methods."
    # GET = reading data, POST = sending data, OPTIONS = browser's preflight check
    allow_methods = ["GET", "POST", "OPTIONS"]

    # English: "Allow these headers in requests."
    # Content-Type tells the API what format the data is in (JSON).
    allow_headers = ["Content-Type"]
  }

  tags = {
    Project = var.project_name
  }
}


# ************************************************************
# SECTION 2: CREATE THE STAGE
# Open the service window for business.
# ************************************************************

# --- English: "Create a deployment stage and nickname it 'default'." ---
# '$default' means requests don't need a stage prefix in the URL.
# So it's /api/visitors, not /prod/api/visitors.
resource "aws_apigatewayv2_stage" "default" {

  # English: "Attach this stage to the API we just created."
  # Dot decoder: aws_apigatewayv2_api.website.id
  #   aws_apigatewayv2_api = "an API Gateway HTTP API resource"
  #     .website           = "the one nicknamed 'website'"
  #       .id              = "grab its unique ID"
  api_id = aws_apigatewayv2_api.website.id

  # English: "Name it '$default' — the main stage, no URL prefix."
  name = "$default"

  # English: "Auto-deploy any changes immediately."
  # Without this, you'd have to manually deploy after every change.
  auto_deploy = true

  tags = {
    Project = var.project_name
  }
}


# ************************************************************
# SECTION 3: INTEGRATIONS (THE INTERCOMS)
# Connect each route to its Lambda function.
# An integration is the link between "a request came in" and
# "call this Lambda."
# ************************************************************

# --- English: "Create an integration between API Gateway and the visitor counter Lambda." ---
resource "aws_apigatewayv2_integration" "visitor_counter" {

  # English: "Attach this to our API."
  # Dot decoder: aws_apigatewayv2_api.website.id
  #   (same as above — go into the API 'website', grab its ID)
  api_id = aws_apigatewayv2_api.website.id

  # English: "This integration calls a Lambda function."
  integration_type = "AWS_PROXY"

  # English: "Specifically, call this Lambda's invoke URL."
  # Dot decoder: aws_lambda_function.visitor_counter.invoke_arn
  #   aws_lambda_function = "a Lambda function resource"
  #     .visitor_counter  = "the one nicknamed 'visitor_counter'"
  #       .invoke_arn     = "grab its invoke ARN (the address API Gateway uses to call it)"
  # Note: invoke_arn is different from arn — it's a special format
  # that API Gateway needs to actually trigger the Lambda.
  integration_uri = aws_lambda_function.visitor_counter.invoke_arn

  # English: "Send the full request payload to Lambda."
  # '2.0' is the newer, simpler format for passing request data.
  payload_format_version = "2.0"
}

# --- English: "Create an integration for the contact form Lambda." ---
resource "aws_apigatewayv2_integration" "contact_form" {

  # Dot decoder: aws_apigatewayv2_api.website.id
  #   (go into the API 'website', grab its ID)
  api_id = aws_apigatewayv2_api.website.id

  integration_type = "AWS_PROXY"

  # Dot decoder: aws_lambda_function.contact_form.invoke_arn
  #   aws_lambda_function = "a Lambda function resource"
  #     .contact_form     = "the one nicknamed 'contact_form'"
  #       .invoke_arn     = "grab its invoke ARN"
  integration_uri = aws_lambda_function.contact_form.invoke_arn

  payload_format_version = "2.0"
}


# ************************************************************
# SECTION 4: ROUTES (THE MENU BOARD)
# Define which URL + method goes to which integration.
# ************************************************************

# --- English: "When someone sends GET /api/visitors, use the visitor counter integration." ---
resource "aws_apigatewayv2_route" "visitor_counter" {

  # Dot decoder: aws_apigatewayv2_api.website.id
  #   (go into the API 'website', grab its ID)
  api_id = aws_apigatewayv2_api.website.id

  # English: "Match GET requests to /api/visitors."
  # Format is: "HTTP_METHOD path"
  route_key = "GET /api/visitors"

  # English: "Send matching requests to the visitor counter integration."
  # Dot decoder: aws_apigatewayv2_integration.visitor_counter.id
  #   aws_apigatewayv2_integration = "an API Gateway integration resource"
  #     .visitor_counter           = "the one nicknamed 'visitor_counter'"
  #       .id                      = "grab its unique ID"
  # The "integrations/" prefix is required by API Gateway's format.
  target = "integrations/${aws_apigatewayv2_integration.visitor_counter.id}"
}

# --- English: "When someone sends POST /api/contact, use the contact form integration." ---
resource "aws_apigatewayv2_route" "contact_form" {

  # Dot decoder: aws_apigatewayv2_api.website.id
  #   (go into the API 'website', grab its ID)
  api_id = aws_apigatewayv2_api.website.id

  # English: "Match POST requests to /api/contact."
  route_key = "POST /api/contact"

  # Dot decoder: aws_apigatewayv2_integration.contact_form.id
  #   aws_apigatewayv2_integration = "an API Gateway integration resource"
  #     .contact_form              = "the one nicknamed 'contact_form'"
  #       .id                      = "grab its unique ID"
  target = "integrations/${aws_apigatewayv2_integration.contact_form.id}"
}


# ************************************************************
# SECTION 5: LAMBDA PERMISSIONS
# Tell each Lambda "API Gateway is allowed to call you."
# Without this, API Gateway would get "access denied" from Lambda.
# ************************************************************

# --- English: "Give API Gateway permission to invoke the visitor counter Lambda." ---
resource "aws_lambda_permission" "visitor_counter" {

  # English: "Name this permission."
  statement_id = "AllowAPIGateway"

  # English: "The allowed action is invoking (calling) the function."
  action = "lambda:InvokeFunction"

  # English: "Which Lambda function to allow."
  # Dot decoder: aws_lambda_function.visitor_counter.function_name
  #   aws_lambda_function = "a Lambda function resource"
  #     .visitor_counter  = "the one nicknamed 'visitor_counter'"
  #       .function_name  = "grab its function name"
  function_name = aws_lambda_function.visitor_counter.function_name

  # English: "Who is allowed to call it? The API Gateway service."
  principal = "apigateway.amazonaws.com"

  # English: "Only allow calls from OUR specific API, not any random API Gateway."
  # Dot decoder: aws_apigatewayv2_api.website.execution_arn
  #   aws_apigatewayv2_api = "an API Gateway HTTP API resource"
  #     .website           = "the one nicknamed 'website'"
  #       .execution_arn   = "grab its execution ARN"
  # The "/*/*" at the end means "any stage, any route."
  source_arn = "${aws_apigatewayv2_api.website.execution_arn}/*/*"
}

# --- English: "Give API Gateway permission to invoke the contact form Lambda." ---
resource "aws_lambda_permission" "contact_form" {

  statement_id = "AllowAPIGateway"
  action       = "lambda:InvokeFunction"

  # Dot decoder: aws_lambda_function.contact_form.function_name
  #   aws_lambda_function = "a Lambda function resource"
  #     .contact_form     = "the one nicknamed 'contact_form'"
  #       .function_name  = "grab its function name"
  function_name = aws_lambda_function.contact_form.function_name

  principal = "apigateway.amazonaws.com"

  # Dot decoder: aws_apigatewayv2_api.website.execution_arn
  #   (go into the API 'website', grab its execution ARN)
  source_arn = "${aws_apigatewayv2_api.website.execution_arn}/*/*"
}
