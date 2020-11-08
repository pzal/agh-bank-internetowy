setup:
	docker-compose run api python manage.py migrate
	docker-compose run api python manage.py populate_with_development_data

clean:
	docker-compose down -v

rebuild:
	docker-compose build

up:
	docker-compose up
