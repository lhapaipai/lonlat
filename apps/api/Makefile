.PHONY: help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?## .*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-22s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

.PHONY: reset-database
reset-datatase: ## Reset complet tant qu'on est dans la phase développement
	symfony console doctrine:schema:drop --full-database --force
	symfony console doctrine:schema:update --complete --force
	symfony console doctrine:fixtures:load -n

.PHONY: dev
dev: ## Démarre les services Docker (bdd) et le serveur Caddy en local
	docker compose up -d
	caddy start

.PHONY: dev-stop
dev-stop: ## Éteint les services Docker (bdd) et le serveur Caddy
	docker compose down
	caddy stop
