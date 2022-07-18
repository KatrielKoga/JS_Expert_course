docker run \
  --name postgres \
  -e POSTGRES_USER=katrielkoga \
  -e POSTGRES_PASSWORD="1234" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker logs postgres
docker exec -it postgres psql --username katrielkoga --dbname heroes
CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
SELECT * FROM warriors;