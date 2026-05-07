module.exports = {
    apps: [
        {
            name: 'small-agent',
            script: 'bun',
            args: 'run src/server.ts',
            watch: false,
            restart_delay: 2000,
            env: {
                NODE_ENV: 'production',
                PORT: '3000',
                TELEGRAM_BOT_TOKEN: '',
                TELEGRAM_WEBHOOK_SECRET: '',
            },
        },
    ],
};
