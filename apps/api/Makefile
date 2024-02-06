reset-datatase: ## Reset complet tant qu'on est dans la phase développement
	symfony console doctrine:schema:drop --full-database --force
	symfony console doctrine:schema:update --complete --force
	symfony console doctrine:fixtures:load -n

dev: ## Démarre les services Docker (bdd) et le serveur Caddy en local
	docker compose up -d
	caddy start

dev-stop: ## Éteint les services Docker (bdd) et le serveur Caddy
	docker compose down
	caddy stop
