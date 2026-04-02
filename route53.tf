# ============================================================
# route53.tf — The Post Office
# Creates the DNS hosted zone and points samcrawford.dev
# at our CloudFront distribution.
# ============================================================

# --- English: "Create a DNS hosted zone and nickname it 'website'." ---
# This tells AWS "I manage the domain samcrawford.dev here."
# acm.tf has been waiting for this — it needs the zone_id
# to place the certificate validation DNS record.
resource "aws_route53_zone" "website" {

  # English: "The domain this zone manages."
  # Dot decoder: var.domain_name
  #   var          = "this is a variable"
  #     .domain_name = "grab the one called domain_name"
  #   Result: "samcrawford.dev"
  name = var.domain_name

  # English: "Label this resource so we can find it in the AWS console."
  tags = {
    Name    = "${var.project_name}-zone"
    Project = var.project_name
  }
}

# --- English: "Create a DNS record that points samcrawford.dev at CloudFront." ---
# This is the forwarding instruction: "any mail for samcrawford.dev → CloudFront."
# An 'A record' maps a domain name to an address.
resource "aws_route53_record" "website" {

  # English: "Put this record in the hosted zone we just created."
  # Dot decoder: aws_route53_zone.website.zone_id
  #   aws_route53_zone = "a Route 53 hosted zone resource"
  #     .website       = "the one nicknamed 'website'"
  #       .zone_id     = "grab its zone ID"
  zone_id = aws_route53_zone.website.zone_id

  # English: "This record is for samcrawford.dev."
  # Dot decoder: var.domain_name
  #   var          = "this is a variable"
  #     .domain_name = "grab the one called domain_name"
  #   Result: "samcrawford.dev"
  name = var.domain_name

  # English: "This is an 'A' record — it maps a name to an address."
  type = "A"

  # --- English: "Instead of a normal IP address, use an 'alias'." ---
  # A normal A record points to an IP like 1.2.3.4.
  # An alias record is special to AWS — it points directly to an AWS
  # resource (CloudFront) without needing to know its IP address.
  # AWS handles the routing behind the scenes.
  alias {

    # English: "Point at our CloudFront distribution's domain name."
    # Dot decoder: aws_cloudfront_distribution.website.domain_name
    #   aws_cloudfront_distribution = "a CloudFront distribution resource"
    #     .website                  = "the one nicknamed 'website'"
    #       .domain_name            = "grab its domain name"
    #   Result: something like "d1234abcdef.cloudfront.net"
    name = aws_cloudfront_distribution.website.domain_name

    # English: "Use CloudFront's hosted zone ID."
    # Dot decoder: aws_cloudfront_distribution.website.hosted_zone_id
    #   aws_cloudfront_distribution = "a CloudFront distribution resource"
    #     .website                  = "the one nicknamed 'website'"
    #       .hosted_zone_id         = "grab CloudFront's own zone ID"
    # This is an AWS internal thing — CloudFront has its own zone ID
    # that Route 53 needs to know where to route traffic.
    zone_id = aws_cloudfront_distribution.website.hosted_zone_id

    # English: "Yes, evaluate the health of the target."
    # If CloudFront went down, Route 53 would know.
    evaluate_target_health = false
  }
}
