local_path	:= $(PWD)
remote_test_host	:= lonlat.pentatrion.com
remote_prod_host 	:= lonlat.org

.PHONY: help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?## .*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-22s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

.PHONY: deploy
deploy: ## Build and deploy examples
	pnpm build-with-errors
	rsync -av --delete \
		$(local_path)/dist/ \
		berlin:prod/$(remote_test_host)
	@echo "go : https://$(remote_test_host)"

.PHONY: deploy-prod
deploy-prod: ## Build and deploy examples
	pnpm build-with-errors
	rsync -av --delete \
		$(local_path)/dist/ \
		berlin:prod/$(remote_prod_host)
	@echo "go : https://$(remote_prod_host)"
