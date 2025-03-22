import { $ } from "https://deno.land/x/dzx@0.3.0/mod.ts";
import { plug } from "https://deno.land/x/funcker/plug.js"

const download_state = (
    aws_access_key_id: string,
    aws_secret_access_key: string
) =>
    async (bucket: string, key: string): Promise<string> => {
        const { stdout: _stdout, stderr } = await $`AWS_ACCESS_KEY_ID=${aws_access_key_id} AWS_SECRET_ACCESS_KEY=${aws_secret_access_key} aws s3 cp s3://${bucket}/${key} /tmp/${bucket}/${key}.tfstate`;

        if (stderr) throw new Error(stderr);

        return `/tmp/${bucket}/${key}.tfstate`;
    };

const output_state = (
    aws_access_key_id: string,
    aws_secret_access_key: string
) =>
    async (state_path: string): Promise<string> => {
        const { stdout, stderr } = await $`AWS_ACCESS_KEY_ID=${aws_access_key_id} AWS_SECRET_ACCESS_KEY=${aws_secret_access_key} terraform output -state=${state_path} -json`;

        if (stderr) throw new Error(stderr);

        return stdout;
    };

plug(async (bucket: string, key: string, opt: any) => {
  const aws_access_key_id = opt.auth.aws_access_key_id;
  const aws_secret_access_key = opt.auth.aws_secret_access_key;

  const state_path = await download_state(
    aws_access_key_id,
    aws_secret_access_key
  )(bucket, key);

  const state = await output_state(aws_access_key_id, aws_secret_access_key)(
    state_path
  );

  return state;
})
