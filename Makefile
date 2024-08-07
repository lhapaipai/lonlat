local_path	:= $(PWD)
front_path	:= $(local_path)/apps/front

remote_test_host	:= lonlat.pentatrion.com
remote_prod_host 	:= lonlat.org

maplibre_react_sandbox_path	:= $(local_path)/apps/maplibre-react-sandbox
maplibre_react_sandbox_host := maplibre-react-sandbox.lonlat.pentatrion.com

assets_path	:= $(local_path)/extra/assets/public
assets_host := assets.lonlat.org

.PHONY: help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?## .*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-22s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

.PHONY: deploy-front-test
deploy-front-test: ## Build and deploy examples
	pnpm build
	rsync -av --delete \
		$(front_path)/dist/ \
		berlin:prod/$(remote_test_host)
	@echo "go : https://$(remote_test_host)"

.PHONY: deploy-front
deploy-front: ## Build and deploy examples
	pnpm build
	rsync -av --delete \
		$(front_path)/dist/ \
		berlin:prod/$(remote_prod_host)
	@echo "go : https://$(remote_prod_host)"

.PHONY: deploy-maplibre-react-sandbox
deploy-maplibre-react-sandbox: ## Build and deploy examples
	cd $(maplibre_react_sandbox_path) && pnpm build
	rsync -av --delete \
		$(maplibre_react_sandbox_path)/dist/ \
		berlin:prod/$(maplibre_react_sandbox_host)
	@echo "go : https://$(maplibre_react_sandbox_host)"

.PHONY: deploy-assets
deploy-assets: ## Build and deploy examples
	rsync -av --delete \
		$(assets_path)/ \
		berlin:prod/$(assets_host)
	@echo "go : https://$(assets_host)"
