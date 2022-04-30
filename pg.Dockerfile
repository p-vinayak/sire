FROM postgres:latest

ENV POSTGRES_DB 'sire'
ENV POSTGRES_USER 'postgres'
ENV POSTGRES_PASSWORD 'rootuser123'

COPY load-extensions.sql /docker-entrypoint-initdb.d/