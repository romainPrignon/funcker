FROM hashicorp/terraform:1.1.3 as tf
FROM denoland/deno:1.19.0 as app
WORKDIR /opt

COPY main.ts .
RUN deno compile --unstable --allow-read --allow-env --allow-run -o main main.ts
# RUN mv /opt/opt /opt/main

FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /opt

RUN apt update \
  && apt install -y python3-pip
RUN pip3 install --upgrade pip
RUN pip3 install awscli
RUN pip3 install awscli --upgrade

COPY --from=tf /bin/terraform /usr/local/bin/terraform
COPY --from=app /opt/main /opt/main

ENTRYPOINT ["/opt/main"]
