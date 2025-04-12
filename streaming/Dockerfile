# RTMP Streaming Server
- type: web
  name: motocross-rtmp-server
  env: docker
  plan: free
  dockerfilePath: ./Dockerfile  # Changed from ./streaming/Dockerfile
  envVars:
    - key: RTMP_PORT
      value: 1935
    - key: HTTP_PORT
      value: 8080
    - fromGroup: motocross-streaming-keys
  autoDeploy: true
  healthCheckPath: /health
