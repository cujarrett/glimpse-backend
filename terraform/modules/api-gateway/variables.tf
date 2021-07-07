variable "glimpse-backend-lambda-arn" {
  description = "glimpse-backend Lambda ARN"
  type = string
}

variable "glimpse-backend-lambda-invoke-arn" {
  description = "glimpse-backend Lambda invoke ARN"
  type = string
}

variable "acm_certificate_arn" {
  description = "glimpse-backend ACM ARN"
  type = string
}
