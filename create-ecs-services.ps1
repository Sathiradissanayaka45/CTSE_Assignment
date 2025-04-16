# create-ecs-services.ps1

# Get the necessary values from CloudFormation exports
$clusterName = aws cloudformation describe-stacks --stack-name microservices-ecs-cluster --query "Stacks[0].Outputs[?OutputKey=='ClusterName'].OutputValue" --output text
$authTaskDefinition = aws cloudformation describe-stacks --stack-name microservices-task-defs --query "Stacks[0].Outputs[?OutputKey=='AuthServiceTaskDefinition'].OutputValue" --output text
$catalogTaskDefinition = aws cloudformation describe-stacks --stack-name microservices-task-defs --query "Stacks[0].Outputs[?OutputKey=='CatalogServiceTaskDefinition'].OutputValue" --output text
$authTargetGroup = aws cloudformation describe-stacks --stack-name microservices-load-balancer --query "Stacks[0].Outputs[?OutputKey=='AuthServiceTargetGroupArn'].OutputValue" --output text
$catalogTargetGroup = aws cloudformation describe-stacks --stack-name microservices-load-balancer --query "Stacks[0].Outputs[?OutputKey=='CatalogServiceTargetGroupArn'].OutputValue" --output text
$ecsTasksSecurityGroup = aws cloudformation describe-stacks --stack-name microservices-network --query "Stacks[0].Outputs[?OutputKey=='ECSTasksSecurityGroup'].OutputValue" --output text
$publicSubnet1 = aws cloudformation describe-stacks --stack-name microservices-network --query "Stacks[0].Outputs[?OutputKey=='PublicSubnet1'].OutputValue" --output text
$publicSubnet2 = aws cloudformation describe-stacks --stack-name microservices-network --query "Stacks[0].Outputs[?OutputKey=='PublicSubnet2'].OutputValue" --output text

# Create Auth Service
Write-Host "Creating Auth Service..."
aws ecs create-service `
  --cluster $clusterName `
  --service-name auth-service `
  --task-definition $authTaskDefinition `
  --desired-count 1 `
  --launch-type FARGATE `
  --network-configuration "awsvpcConfiguration={subnets=[$publicSubnet1,$publicSubnet2],securityGroups=[$ecsTasksSecurityGroup],assignPublicIp=ENABLED}" `
  --load-balancers "targetGroupArn=$authTargetGroup,containerName=auth-service,containerPort=3000"

# Create Catalog Service
Write-Host "Creating Catalog Service..."
aws ecs create-service `
  --cluster $clusterName `
  --service-name catalog-service `
  --task-definition $catalogTaskDefinition `
  --desired-count 1 `
  --launch-type FARGATE `
  --network-configuration "awsvpcConfiguration={subnets=[$publicSubnet1,$publicSubnet2],securityGroups=[$ecsTasksSecurityGroup],assignPublicIp=ENABLED}" `
  --load-balancers "targetGroupArn=$catalogTargetGroup,containerName=catalog-service,containerPort=3001"

Write-Host "Services created. You can check their status with:"
Write-Host "aws ecs describe-services --cluster $clusterName --services auth-service catalog-service"
