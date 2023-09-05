provider "aws" {
  region = "us-west-2"
  profile = var.ENV == "prod" ? "prodv3" : "default"
}