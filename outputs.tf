# ============================================================
# outputs.tf — The Receipt
# Prints out the important values you need after Terraform
# finishes building everything.
# ============================================================

# --- English: "After everything is built, print the Route 53 name servers." ---
# These are the name servers you need to set at your domain registrar
# (wherever you bought samcrawford.dev). This is the ONE manual step.
output "name_servers" {

  # English: "Describe what this output is."
  description = "Name servers to set at your domain registrar"

  # English: "Grab the name servers from the Route 53 hosted zone."
  # Dot decoder: aws_route53_zone.website.name_servers
  #   aws_route53_zone = "a Route 53 hosted zone resource"
  #     .website       = "the one nicknamed 'website'"
  #       .name_servers = "grab the list of name servers AWS assigned"
  #   Result: something like ["ns-123.awsdns-45.org", "ns-678.awsdns-90.com", ...]
  value = aws_route53_zone.website.name_servers
}

# --- English: "Print the CloudFront distribution URL." ---
# Use this to test your site before DNS is fully set up.
# You can paste this URL right into your browser.
output "cloudfront_url" {

  description = "CloudFront distribution URL for testing"

  # Dot decoder: aws_cloudfront_distribution.website.domain_name
  #   aws_cloudfront_distribution = "a CloudFront distribution resource"
  #     .website                  = "the one nicknamed 'website'"
  #       .domain_name            = "grab its domain name"
  #   Result: something like "d1234abcdef.cloudfront.net"
  value = aws_cloudfront_distribution.website.domain_name
}

# --- English: "Print the API Gateway endpoint URL." ---
# This is the base URL for your API. Your site's JavaScript
# will call this with /api/visitors and /api/contact.
output "api_endpoint" {

  description = "API Gateway endpoint URL"

  # Dot decoder: aws_apigatewayv2_api.website.api_endpoint
  #   aws_apigatewayv2_api = "an API Gateway HTTP API resource"
  #     .website           = "the one nicknamed 'website'"
  #       .api_endpoint    = "grab its public URL"
  #   Result: something like "https://abc123.execute-api.us-east-1.amazonaws.com"
  value = aws_apigatewayv2_api.website.api_endpoint
}

# --- English: "Print the S3 bucket name." ---
# This is where you'll upload your website files (HTML, CSS, JS, images).
# You can upload with: aws s3 sync ./your-site-folder s3://samcrawford-portfolio
output "s3_bucket_name" {

  description = "S3 bucket name for uploading website files"

  # Dot decoder: aws_s3_bucket.website.id
  #   aws_s3_bucket = "an S3 bucket resource"
  #     .website    = "the one nicknamed 'website'"
  #       .id       = "grab its unique ID (which is the bucket name)"
  #   Result: "samcrawford-portfolio"
  value = aws_s3_bucket.website.id
}
