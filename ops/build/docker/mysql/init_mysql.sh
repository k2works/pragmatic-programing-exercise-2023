#!/bin/sh
docker-compose exec db_mysql bash -c "chmod 0775 docker-entrypoint-initdb.d/init-database.sh"
docker-compose exec db_mysql bash -c "./docker-entrypoint-initdb.d/init-database.sh"
