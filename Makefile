year := $(shell date +%Y)

commit:
	git add .
	git commit -m "chore: add day$(day)"
	git push
	make pr day=$(day)

pr:
ifeq ($(shell git rev-parse --abbrev-ref HEAD),master)
	@echo "Current branch is master. No pull request will be created."
else
	@echo "Creating pull request..."
	gh pr create --title "chore: add day$(day)" --body "https://adventofcode.com/$(year)/day/$(day)" --base master
endif
