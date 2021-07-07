resource "aws_lambda_function" "glimpse-backend" {
  filename = var.file-placeholder-output-path
  function_name = "glimpse-backend"
  handler       = "index.handler"
  role          = var.glimpse-backend-role-arn
  runtime       = "nodejs14.x"
  memory_size   = 128
  timeout       = 60
}

resource "aws_lambda_function_event_invoke_config" "glimpse-backend-event-invoke-config" {
  function_name = aws_lambda_function.glimpse-backend.arn
  maximum_event_age_in_seconds = 60
  maximum_retry_attempts       = 0

  destination_config {
    on_failure {
      destination = var.error_sns_topic
    }
  }
}

resource "aws_lambda_permission" "glimpse-backend" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.glimpse-backend.arn
  principal     = "apigateway.amazonaws.com"
}

output "glimpse-backend-lambda-arn" {
  value = aws_lambda_function.glimpse-backend.arn
}

output "glimpse-backend-lambda-invoke-arn" {
  value = aws_lambda_function.glimpse-backend.invoke_arn
}
