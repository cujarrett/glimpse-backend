variable "acm_certificate_arn" {
  description = "glimpse-backend ACM ARN"
  type = string
}

variable "aws_region" {
  description = "AWS region for the infrastructure"
  type = string
  default = "us-east-1"
}

variable "error_sns_topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}
