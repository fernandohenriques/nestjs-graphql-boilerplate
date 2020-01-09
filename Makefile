# You can change the default variables with `make variables="other.env" build`
variables ?= .env
include $(variables)
export $(shell sed 's/=.*//' $(variables))

# DOCKER TASKS
build: ## Build the container
	docker build \
    -f ./docker/Dockerfile \
    -t $(APP_NAME) \
    --build-arg NODE_ENV=$(NODE_ENV) \
    --build-arg PORT=$(PORT) \
    .

run: ## Run container on port configured in `.env`
	docker run -i -t \
    --env-file ./.env \
    --name $(APP_NAME) \
    --user node \
    $(APP_NAME)

up: build run ## Build and Run container on port configured in `.env`

stop: ## Stop the running container
	docker stop $(APP_NAME); docker rm $(APP_NAME)

# CI TASKS
test: build ## Build container on port configured in `.env` and run mongo:latest to run tests pipeline
	docker run -d -it \
    --name $(MONGO_HOST) \
    -e "MONGO_INITDB_DATABASE=$(MONGO_DATABASE_NAME)" \
    -e "MONGO_INITDB_ROOT_USERNAME=$(MONGO_USERNAME)" \
    -e "MONGO_INITDB_ROOT_PASSWORD=$(MONGO_PASSWORD)" \
    -p $(MONGO_PORT):$(MONGO_PORT) \
    -v "$(PWD)/docker/init-mongo.sh:/docker-entrypoint-initdb.d/init-mongo.sh" \
    mongo:latest
	docker run -i -t \
    --env-file ./.env \
    --name $(APP_NAME) \
    --user node \
    --link $(MONGO_HOST):$(MONGO_HOST) \
    $(APP_NAME) \
    /bin/sh -c "npm run test && npm run test:e2e && npm run test:graphql"

stop-mongo: ## Stop the mongodb running container
	docker stop $(MONGO_HOST); docker rm $(MONGO_HOST)
