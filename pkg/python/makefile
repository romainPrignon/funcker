build: ## make build version=patch|minor|major
	rm -rf dist/
	~/.poetry/bin/poetry version ${version}
	~/.poetry/bin/poetry build

deploy:
	git add -f pyproject.toml dist/
	git commit -m "Release $(shell ~/.poetry/bin/poetry version -s)"
	git tag -a "$(shell ~/.poetry/bin/poetry version -s)" -m "Release $(shell ~/.poetry/bin/poetry version -s)"
	git push --follow-tags

publish:
	poetry publish
