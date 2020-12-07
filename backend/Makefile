setup:
	docker-compose run api python manage.py migrate
	docker-compose run api python manage.py populate_with_development_data

resetup:
	docker-compose down -v
	docker-compose run api python manage.py migrate
	docker-compose run api python manage.py populate_with_development_data

makemigrations:
	docker-compose run api python manage.py makemigrations

recreate_migrations:
	find . -path "./*/migrations/*.py" -not -name "__init__.py" -not -path "*site-packages*" -delete || exit 1
	docker-compose run api python manage.py makemigrations

sp:
	docker-compose run api python manage.py shell_plus

migrate:
	docker-compose run api python manage.py migrate

clean:
	docker-compose down -v
	rm celerybeat-schedule || true
	rm celerybeat.pid || true

rebuild:
	docker-compose build

up:
	docker-compose up
