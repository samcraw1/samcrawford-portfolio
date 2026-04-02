# ============================================================
# variables.tf — The Label Maker
# This file defines every reusable value in the project.
# Other files grab these with "var.variable_name"
# ============================================================

# --- English: "Create a variable called aws_region." ---
# This is what providers.tf is waiting for on its line:
#   region = var.aws_region
variable "aws_region" {

  # English: "Describe it as the AWS region we're deploying to."
  description = "AWS region to deploy all resources in"

  # English: "It must be text, not a number."
  type = string

  # English: "If nobody provides a value, default to us-east-1."
  # us-east-1 is required for CloudFront + ACM certificates.
  default = "us-east-1"
}

# --- English: "Create a variable called domain_name." ---
# This will be used by:
#   route53.tf  — to set up DNS records
#   acm.tf      — to get an SSL certificate
#   cloudfront.tf — to tell CloudFront what domain it serves
variable "domain_name" {

  # English: "Describe it as the website's domain."
  description = "The domain name for the portfolio site"

  # English: "It must be text."
  type = string

  # English: "If nobody provides a value, default to samcrawford.dev."
  default = "samcrawford.dev"
}

# --- English: "Create a variable called project_name." ---
# This will be used in tags on every resource so you can
# find and group them in the AWS console.
variable "project_name" {

  # English: "Describe it as a label for all our resources."
  description = "Project name used for tagging and naming resources"

  # English: "It must be text."
  type = string

  # English: "If nobody provides a value, default to samcrawford-portfolio."
  default = "samcrawford-portfolio"
}
