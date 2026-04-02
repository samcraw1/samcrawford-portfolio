# ============================================================
# s3.tf — The Storage Unit
# Creates the S3 bucket where your website files live.
# Locks it down so only CloudFront can access it.
# ============================================================

# --- English: "Create an S3 bucket and nickname it 'website'." ---
# Other files will reference this as: aws_s3_bucket.website
resource "aws_s3_bucket" "website" {

  # English: "Name the bucket whatever our project_name variable is."
  # Dot decoder: var.project_name
  #   var            = "this is a variable"
  #     .project_name = "grab the one called project_name"
  #   Result: "samcrawford-portfolio"
  bucket = var.project_name

  # English: "Label this resource so we can find it in the AWS console."
  # Dot decoder: var.project_name (same as above)
  tags = {
    Name    = var.project_name
    Project = var.project_name
  }
}

# --- English: "Block ALL public access to this bucket." ---
# This is the lock on the storage unit door.
# Nobody can access the files by going to S3 directly.
resource "aws_s3_bucket_public_access_block" "website" {

  # English: "Apply these rules to the bucket we just created above."
  # Dot decoder: aws_s3_bucket.website.id
  #   aws_s3_bucket = "the type of resource (an S3 bucket)"
  #     .website    = "the one we nicknamed 'website'"
  #       .id       = "grab its unique ID"
  bucket = aws_s3_bucket.website.id

  # English: "Block public access in every possible way. All four doors: locked."
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# --- English: "Create a policy that says WHO can access this bucket." ---
# This is handing the one and only key to CloudFront.
resource "aws_s3_bucket_policy" "website" {

  # English: "Apply this policy to the bucket we created above."
  # Dot decoder: aws_s3_bucket.website.id
  #   aws_s3_bucket = "the type of resource (an S3 bucket)"
  #     .website    = "the one nicknamed 'website'"
  #       .id       = "grab its unique ID"
  bucket = aws_s3_bucket.website.id

  # English: "Here's the actual policy — written in AWS's JSON policy language."
  # We use 'jsonencode' to write it in a clean way instead of raw JSON.
  policy = jsonencode({

    # English: "Use version 2012-10-17 of AWS's policy language (this is always the same)."
    Version = "2012-10-17"

    # English: "Here are the rules (an array of them)."
    Statement = [
      {
        # English: "Give this rule an ID so we can find it later."
        Sid = "AllowCloudFrontOnly"

        # English: "This rule ALLOWS something (as opposed to blocking)."
        Effect = "Allow"

        # English: "WHO is allowed? The CloudFront service."
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }

        # English: "WHAT can they do? Read objects (GetObject = download files)."
        Action = "s3:GetObject"

        # English: "WHICH files? Everything inside this bucket."
        # Dot decoder: aws_s3_bucket.website.arn
        #   aws_s3_bucket = "the type of resource (an S3 bucket)"
        #     .website    = "the one nicknamed 'website'"
        #       .arn      = "grab its ARN (Amazon's serial number for it)"
        # The "/*" at the end means "every file inside the bucket."
        Resource = "${aws_s3_bucket.website.arn}/*"

        # English: "One more check — only allow it if the request is
        #   coming from OUR specific CloudFront distribution, not just
        #   any random CloudFront distribution."
        # Dot decoder: aws_cloudfront_distribution.website.arn
        #   aws_cloudfront_distribution = "a CloudFront distribution resource"
        #     .website                  = "the one nicknamed 'website'"
        #       .arn                    = "grab its ARN"
        # NOTE: This resource doesn't exist yet — cloudfront.tf will create it.
        #   Terraform is smart enough to wait for it before running this policy.
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.website.arn
          }
        }
      }
    ]
  })
}
