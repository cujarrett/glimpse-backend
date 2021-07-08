module "archive" {
  source = "./modules/archive"
}

module "iam" {
  source = "./modules/iam"
  error_sns_topic = var.error_sns_topic
}

module "lambda" {
  source = "./modules/lambda"
  error_sns_topic = var.error_sns_topic
  file-placeholder-output-path = module.archive.file-placeholder-output-path
  glimpse-backend-role-arn = module.iam.glimpse-backend-role-arn
}

module "api-gateway" {
  source = "./modules/api-gateway"
  acm_certificate_arn = var.acm_certificate_arn
  glimpse-backend-lambda-arn = module.lambda.glimpse-backend-lambda-arn
  glimpse-backend-lambda-invoke-arn = module.lambda.glimpse-backend-lambda-invoke-arn
}

# Set the generated URL as an output. Run `terraform output url` to get this.
output "endpoint" {
  value = module.api-gateway.endpoint
}
