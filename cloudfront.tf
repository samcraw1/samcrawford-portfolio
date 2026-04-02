# ============================================================
# cloudfront.tf — The Sorting Facility
# Creates the CDN that caches and serves your site globally.
# Also creates the ID badge (OAC) that lets CloudFront into S3.
# ============================================================

# --- English: "Create an Origin Access Control and nickname it 'website'." ---
# This is CloudFront's ID badge that it shows to S3.
# Without this, S3 would say "who are you? go away."
resource "aws_cloudfront_origin_access_control" "website" {

  # English: "Name the badge using our project name, plus '-oac' on the end."
  # Dot decoder: var.project_name
  #   var            = "this is a variable"
  #     .project_name = "grab the one called project_name"
  #   Result: "samcrawford-portfolio-oac"
  name = "${var.project_name}-oac"

  # English: "Describe what this badge is for."
  description = "OAC for ${var.project_name} S3 bucket"

  # English: "This badge is for accessing an S3 origin."
  origin_access_control_origin_type = "s3"

  # English: "Always sign the requests so S3 knows they're legit."
  signing_behavior = "always"

  # English: "Use AWS's v4 signing method (the current standard)."
  signing_protocol = "sigv4"
}

# --- English: "Create the actual CloudFront distribution and nickname it 'website'." ---
# This is the sorting facility itself — the thing that serves your site to the world.
# s3.tf already references this as aws_cloudfront_distribution.website.arn
# in its bucket policy. Now we're actually building it.
resource "aws_cloudfront_distribution" "website" {

  # English: "Turn this distribution ON."
  enabled = true

  # English: "When someone visits the root (samcrawford.dev/), serve index.html."
  default_root_object = "index.html"

  # English: "This distribution responds to samcrawford.dev."
  # Dot decoder: var.domain_name
  #   var          = "this is a variable"
  #     .domain_name = "grab the one called domain_name"
  #   Result: "samcrawford.dev"
  # 'aliases' is CloudFront's word for "what domain names point to me."
  aliases = [var.domain_name]

  # English: "No geographic restrictions — serve the site to the whole world."
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # --- English: "Here's where to get the files from (the 'origin')." ---
  # An origin is CloudFront's word for "the source of truth."
  # Our origin is the S3 bucket.
  origin {

    # English: "The origin's address is the S3 bucket's regional domain name."
    # Dot decoder: aws_s3_bucket.website.bucket_regional_domain_name
    #   aws_s3_bucket              = "the type of resource (an S3 bucket)"
    #     .website                 = "the one nicknamed 'website'"
    #       .bucket_regional_domain_name = "grab its full regional URL"
    #   Result: something like "samcrawford-portfolio.s3.us-east-1.amazonaws.com"
    domain_name = aws_s3_bucket.website.bucket_regional_domain_name

    # English: "Give this origin an ID so we can reference it below."
    # Dot decoder: aws_s3_bucket.website.id
    #   aws_s3_bucket = "the type of resource (an S3 bucket)"
    #     .website    = "the one nicknamed 'website'"
    #       .id       = "grab its unique ID"
    origin_id = aws_s3_bucket.website.id

    # English: "Use the OAC badge we created above to access S3."
    # Dot decoder: aws_cloudfront_origin_access_control.website.id
    #   aws_cloudfront_origin_access_control = "an OAC resource"
    #     .website                           = "the one nicknamed 'website'"
    #       .id                              = "grab its unique ID"
    origin_access_control_id = aws_cloudfront_origin_access_control.website.id
  }

  # --- English: "Here's the SECOND origin — API Gateway (the service window)." ---
  # This is where /api/* requests go instead of S3.
  origin {

    # English: "The origin's address is the API Gateway's endpoint."
    # Dot decoder: aws_apigatewayv2_api.website.api_endpoint
    #   aws_apigatewayv2_api = "an API Gateway HTTP API resource"
    #     .website           = "the one nicknamed 'website'"
    #       .api_endpoint    = "grab its public URL"
    #   Result: something like "https://abc123.execute-api.us-east-1.amazonaws.com"
    #
    # replace() strips the "https://" off the front because CloudFront
    # wants just the domain, not the full URL.
    # The "" at the end means "replace https:// with nothing."
    domain_name = replace(aws_apigatewayv2_api.website.api_endpoint, "https://", "")

    # English: "Give this origin the ID 'api' so we can reference it below."
    origin_id = "api"

    # English: "Use HTTPS when CloudFront talks to API Gateway."
    custom_origin_config {

      # English: "Connect to API Gateway on port 443 (the HTTPS port)."
      http_port              = 80
      https_port             = 443

      # English: "Use HTTPS only — never send API requests unencrypted."
      origin_protocol_policy = "https-only"

      # English: "Use TLS 1.2 (the secure standard)."
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # --- English: "SPECIAL RULE: If the request starts with /api/*, send it to API Gateway." ---
  # 'ordered_cache_behavior' = a rule that runs BEFORE the default behavior.
  # CloudFront checks these in order. If the path matches, it uses this rule
  # instead of the default one.
  ordered_cache_behavior {

    # English: "Match any request that starts with /api/"
    path_pattern = "/api/*"

    # English: "Allow GET, HEAD, POST, and OPTIONS methods."
    # POST is needed for the contact form. OPTIONS is the CORS preflight check.
    allowed_methods = ["GET", "HEAD", "OPTIONS", "PUT", "PATCH", "POST", "DELETE"]

    # English: "Only cache GET and HEAD responses."
    cached_methods = ["GET", "HEAD"]

    # English: "Send matching requests to the 'api' origin (API Gateway)."
    target_origin_id = "api"

    # English: "Force HTTPS for API requests too."
    viewer_protocol_policy = "redirect-to-https"

    # English: "DON'T cache API responses — every request should hit Lambda fresh."
    # This is AWS's built-in 'CachingDisabled' policy.
    # The visitor count changes every time, so caching would show stale numbers.
    cache_policy_id = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"

    # English: "Forward all original request headers/cookies/query strings to API Gateway."
    # This is AWS's built-in 'AllViewerExceptHostHeader' policy.
    # Without this, API Gateway wouldn't receive the request body (contact form data).
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac"
  }

  # --- English: "How should CloudFront behave for normal requests?" ---
  # 'default_cache_behavior' = the default rules for handling ALL incoming requests.
  default_cache_behavior {

    # English: "These are the HTTP methods CloudFront will accept."
    # GET = reading a page, HEAD = checking if a page exists.
    allowed_methods = ["GET", "HEAD"]

    # English: "These are the methods CloudFront will cache."
    cached_methods = ["GET", "HEAD"]

    # English: "Which origin should these requests go to?"
    # This matches the origin_id we set above.
    # Dot decoder: aws_s3_bucket.website.id
    #   aws_s3_bucket = "the type of resource (an S3 bucket)"
    #     .website    = "the one nicknamed 'website'"
    #       .id       = "grab its unique ID"
    target_origin_id = aws_s3_bucket.website.id

    # English: "Force all visitors to use HTTPS. If they try HTTP,
    #   redirect them to the secure version."
    viewer_protocol_policy = "redirect-to-https"

    # English: "Use AWS's recommended cache policy for static sites."
    # This ID is AWS's built-in 'CachingOptimized' policy.
    # It sets smart caching defaults so we don't have to configure them manually.
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  # --- English: "Use our SSL certificate so the site works over HTTPS." ---
  viewer_certificate {

    # English: "Use the ACM certificate we'll create in acm.tf."
    # Dot decoder: aws_acm_certificate.website.arn
    #   aws_acm_certificate = "an ACM certificate resource"
    #     .website          = "the one nicknamed 'website'"
    #       .arn            = "grab its ARN (Amazon serial number)"
    # NOTE: This resource doesn't exist yet — acm.tf will create it.
    acm_certificate_arn = aws_acm_certificate.website.arn

    # English: "Use SNI (Server Name Indication) — the modern, free way
    #   to serve HTTPS. The alternative 'vip' costs $600/month."
    ssl_support_method = "sni-only"

    # English: "Accept TLS 1.2 and above. This is the secure standard."
    minimum_protocol_version = "TLSv1.2_2021"
  }

  # --- English: "If someone hits a page that doesn't exist, show index.html instead." ---
  # This is important for single-page apps (SPAs) where the frontend router
  # handles URLs like /projects/memepickup — that file doesn't exist in S3,
  # but index.html knows how to show the right content.
  custom_error_response {

    # English: "When S3 says '403 Forbidden' (which is how S3 says 'file not found')..."
    error_code = 403

    # English: "...serve index.html instead..."
    response_page_path = "/index.html"

    # English: "...and tell the browser it's a 200 OK (everything is fine)."
    response_code = 200

    # English: "Cache this error response for 10 seconds."
    error_caching_min_ttl = 10
  }

  # English: "Also handle actual 404 errors the same way."
  custom_error_response {
    error_code            = 404
    response_page_path    = "/index.html"
    response_code         = 200
    error_caching_min_ttl = 10
  }

  # English: "Label this resource so we can find it in the AWS console."
  tags = {
    Name    = "${var.project_name}-cdn"
    Project = var.project_name
  }
}
