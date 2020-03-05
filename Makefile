# You can change the default variables with `make variables="other.env" build`
variables ?= .env
args = $(filter-out $@,$(MAKECMDGOALS))

include $(variables)
export $(shell sed 's/=.*//' $(variables))

build:
	docker build \
    -f ./docker/Dockerfile \
    -t $(APP_NAME) \
    --build-arg NODE_ENV=$(NODE_ENV) \
    --build-arg PORT=$(PORT) \
    .

run:
	docker run -i -t \
    --env-file ./.env \
    --name $(APP_NAME) \
    --user node \
    $(APP_NAME)

up: build run

stop:
	docker stop $(MONGO_HOST) || true; docker rm $(MONGO_HOST) || true
	docker stop $(APP_NAME) || true; docker rm $(APP_NAME) || true

test: stop build
	docker run -d -it \
    --name $(MONGO_HOST) \
    -e "MONGO_INITDB_DATABASE=$(MONGO_DATABASE_NAME)" \
    -e "MONGO_INITDB_ROOT_USERNAME=$(MONGO_USERNAME)" \
    -e "MONGO_INITDB_ROOT_PASSWORD=$(MONGO_PASSWORD)" \
    -p $(MONGO_PORT):$(MONGO_PORT) \
    -v "$(PWD)/docker/init-mongo.sh:/docker-entrypoint-initdb.d/init-mongo.sh" \
    mongo:latest
	docker run -i -t \
    --env-file $(variables) \
    --name $(APP_NAME) \
    --user node \
    --link $(MONGO_HOST):$(MONGO_HOST) \
    $(APP_NAME) \
    /bin/sh -c "npm run test && npm run test:e2e && npm run test:graphql"

# DEVELOPMENT TASKS
install:
	npm install $(args) --save
	docker exec -it $(APP_NAME) npm install $(args) --save

uninstall:
	npm uninstall $(args) --save
	docker exec -it $(APP_NAME) npm uninstall $(args) --save
