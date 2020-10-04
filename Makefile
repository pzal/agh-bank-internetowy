setup:
	yarn --cwd frontend

clean:
	rm -rf frontend/node_modules || true

frontend_up:
	yarn --cwd frontend start
