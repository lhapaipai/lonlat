local_path	:= $(PWD)
remote_host	:= storybook.lonlat.pentatrion.com

.PHONY: help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?## .*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-22s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

.PHONY: deploy
deploy: ## Build and deploy examples
	rsync -av \
		$(local_path)/storybook-static/ \
		berlin:prod/$(remote_host)
	@echo "go : https://$(remote_host)"
