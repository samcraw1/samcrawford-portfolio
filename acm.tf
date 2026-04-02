# ============================================================
# acm.tf — The Padlock
# Requests an SSL certificate so samcrawford.dev works over HTTPS.
# Proves domain ownership via a DNS record, then waits for approval.
# ============================================================

# --- English: "Request an SSL certificate and nickname it 'website'." ---
# This is like walking into the certification office and saying
# "I need a certificate for samcrawford.dev."
resource "aws_acm_certificate" "website" {

  # English: "The certificate is for this domain."
  # Dot decoder: var.domain_name
  #   var          = "this is a variable"
  #     .domain_name = "grab the one called domain_name"
  #   Result: "samcrawford.dev"
  domain_name = var.domain_name

  # English: "Prove I own the domain by checking a DNS record."
  # The alternative is "EMAIL" which sends a confirmation email,
  # but DNS is automatic and doesn't need a human to click a link.
  validation_method = "DNS"

  # English: "Label this resource so we can find it in the AWS console."
  tags = {
    Name    = "${var.project_name}-cert"
    Project = var.project_name
  }

  # English: "If this certificate ever needs to be replaced,
  #   create the new one BEFORE destroying the old one."
  # This prevents downtime — your site stays on HTTPS the whole time.
  lifecycle {
    create_before_destroy = true
  }
}

# --- English: "Create the DNS record that proves we own the domain." ---
# ACM gives us a secret code. We put that code in a DNS record.
# ACM checks Route 53, sees the code, and says "verified."
#
# 'for_each' is a loop — ACM might give us multiple validation records,
# so we create one DNS record for each.
resource "aws_route53_record" "cert_validation" {

  # English: "Loop over each validation option ACM gave us."
  # Dot decoder: aws_acm_certificate.website.domain_validation_options
  #   aws_acm_certificate         = "an ACM certificate resource"
  #     .website                  = "the one nicknamed 'website'"
  #       .domain_validation_options = "grab the list of DNS records ACM wants us to create"
  #
  # The 'for' part converts the list into a map keyed by domain name.
  # Dot decoders inside the for:
  #   dvo.domain_name  = "for each validation option, grab the domain name"
  #   dvo.resource_record_name  = "grab the DNS record name ACM wants"
  #   dvo.resource_record_type  = "grab the record type (CNAME)"
  #   dvo.resource_record_value = "grab the secret code value"
  for_each = {
    for dvo in aws_acm_certificate.website.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }

  # English: "Put this DNS record in our Route 53 hosted zone."
  # Dot decoder: aws_route53_zone.website.zone_id
  #   aws_route53_zone = "a Route 53 hosted zone resource"
  #     .website       = "the one nicknamed 'website'"
  #       .zone_id     = "grab its zone ID"
  # NOTE: This resource doesn't exist yet — route53.tf will create it.
  zone_id = aws_route53_zone.website.zone_id

  # English: "Use the record name ACM told us to use."
  # Dot decoder: each.value.name
  #   each       = "the current item in the for_each loop"
  #     .value   = "grab its value (the map we built above)"
  #       .name  = "grab the 'name' field from that map"
  name = each.value.name

  # English: "Use the record type ACM told us (usually CNAME)."
  # Dot decoder: each.value.type (same pattern as above)
  type = each.value.type

  # English: "How long (in seconds) DNS servers should cache this. 60 = 1 minute."
  ttl = 60

  # English: "The actual value of the DNS record — the secret code."
  # Dot decoder: each.value.value (same pattern as above)
  records = [each.value.value]
}

# --- English: "Wait here until ACM says the certificate is approved." ---
# This doesn't create anything in AWS. It's a checkpoint that tells Terraform:
# "Do NOT move on to CloudFront until this certificate is fully validated."
resource "aws_acm_certificate_validation" "website" {

  # English: "Which certificate are we waiting on?"
  # Dot decoder: aws_acm_certificate.website.arn
  #   aws_acm_certificate = "an ACM certificate resource"
  #     .website          = "the one nicknamed 'website'"
  #       .arn            = "grab its ARN (Amazon serial number)"
  certificate_arn = aws_acm_certificate.website.arn

  # English: "Which DNS records need to exist before it's valid?"
  # Dot decoder: aws_route53_record.cert_validation
  #   aws_route53_record    = "a Route 53 DNS record resource"
  #     .cert_validation    = "the ones nicknamed 'cert_validation'"
  #
  # The [for ...] loop grabs the 'fqdn' (fully qualified domain name)
  # from each validation record we created above.
  # Dot decoder inside the for:
  #   record.fqdn = "grab the full domain name of this DNS record"
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}
