from email.mime import image
import docker
import json


class Funcker:
    def __init__(self, namespace, name, version="latest"):
        self.namespace = namespace
        self.name = name
        self.version = version
        self.image = f"{namespace}/{name}:{version}"

    def run(self, *args):
        client = docker.from_env()
        serialized_args = [json.dumps(arg) for arg in args]
        res = client.containers.run(
            name=self.name,
            image=self.image,
            command=serialized_args
        ).decode()
        return json.loads(res)


Funcker('libops', 'get_terraform_outputs').run(
    "terraform-preprod",
    "terraform",
    {
        "auth": {
            "aws_access_key_id": 'AKIA35GTCQAI47IVPXOI',
            "aws_secret_access_key": '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'
        }
    }
)
