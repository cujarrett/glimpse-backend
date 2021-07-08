variable "glimpse-backend-role-arn" {
  description = "IAM role ARN"
  type = string
}

variable "file-placeholder-output-path" {
  description = "Placeholder content for Lambda"
  type = string
}

variable "error_sns_topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}
