const Docker = require('dockerode')
const _ = require('lodash')
const { streamToString } = require('./utils')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

class Funcker {
    constructor(namespace, name, version) {
        this.namespace = namespace
        this.name = name
        this.version = version ?? 'latest'
        this.image = `${this.namespace}/${this.name}:${this.version}`
    }

    async run(...args) {
        const container = await docker.createContainer({
            name: this.name,
            Image: this.image,
            Cmd: args?.map(arg => JSON.stringify(arg)) || [],
            Env: [],
            HostConfig: {
                Binds: [`${process.cwd()}:/tmp/${this.name}`],
                AutoRemove: true,
            },
            Tty: true,
        })

        const stream = await container.attach({ stream: true, stdout: true, stderr: true })

        await container.start()

        return JSON.parse(await streamToString(stream))
    }
}

module.exports = {
    Funcker
}