# --- English: "Hey Terraform, here are the rules for this project." ---
terraform {

  # English: "You must be Terraform version 1.5.0 or newer to run this."
  required_version = ">= 1.5.0"

  # English: "We need the AWS plugin from HashiCorp's store, version 5.x."
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# --- English: "Now actually connect to AWS." ---
provider "aws" {

  # English: "Use whatever region is stored in our variable called aws_region."
  # Dot decoder: var.aws_region
  #   var         = "this is a variable"
  #     .aws_region = "grab the one called aws_region"
  # NOTE: aws_region is NOT defined yet — variables.tf will create it.
  region = var.aws_region
}
