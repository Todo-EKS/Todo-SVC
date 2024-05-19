# todo-eks-todo-srv (Todo Server deploy on EKS)

This repository contains a simple NodeJS application configured to run inside a Docker container on port 8001.
RDS Postgres for storing user todo list.

The deployment service using both ClusterIP for internal traffic and NodePort for dev purpose.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)

## Getting Started

### 1. Clone the repository

Clone this repository to your local machine using the following command:

### 2. Build the app using Dockerfile
```sh
docker build -t todo-eks-todo .
```
### 3. Run and map port 8001 to Todo app server
```sh
docker run -p 8001:8001 todo-eks-todo
```
The repo pipeline setup for both manually and automatically deployment using Github Actions to automatically perform following scripts:
  - checkout code
  - install dependencies
  - running test case
  - Build and push image to AWS ECR
  - Update Kubernetes Config file and rollout new update to Kubernetes cluster.
