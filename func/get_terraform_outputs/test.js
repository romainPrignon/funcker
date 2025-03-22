const { Funcker } = require('../../pkg/node')

const main = async () => {
  // const get_git_sha = new Funcker('libops', 'get_git_sha')
  const get_terraform_outputs = new Funcker('libops', 'get_terraform_outputs')

  // const res = await get_git_sha.run('HEAD')
  const res = await get_terraform_outputs.run('terraform-preprod', 'terraform', {
    auth: {
      aws_access_key_id: 'xx',
      aws_secret_access_key: 'xx'
    }
  })

  console.log('res', res)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
