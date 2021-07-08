resource "aws_iam_role" "glimpse-backend" {
  name               = "glimpse-backend"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": {
    "Action": "sts:AssumeRole",
    "Principal": {
      "Service": "lambda.amazonaws.com"
    },
    "Effect": "Allow"
  }
}
POLICY
}

resource "aws_iam_policy" "glimpse-backend-logs" {
  name        = "glimpse-backend-logs"
  description = "Adds logging access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach-logs" {
  role       = aws_iam_role.glimpse-backend.name
  policy_arn = aws_iam_policy.glimpse-backend-logs.arn
}

resource "aws_iam_policy" "glimpse-backend-sns" {
  name        = "glimpse-backend-sns"
  description = "Adds sns access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sns:Publish",
      "Resource": "${var.error_sns_topic}"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach-sns" {
  role       = aws_iam_role.glimpse-backend.name
  policy_arn = aws_iam_policy.glimpse-backend-sns.arn
}

output "glimpse-backend-role-arn" {
  value = aws_iam_role.glimpse-backend.arn
}
