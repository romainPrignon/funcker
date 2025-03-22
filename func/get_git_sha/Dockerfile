FROM python:3.10-slim

COPY --from=bitnami/git:2.36.1 /opt/bitnami/git/bin/git /opt/git
COPY main.py /opt/main.py

ENTRYPOINT ["python", "/opt/main.py"]
