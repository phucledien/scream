const withTM = require('next-transpile-modules')(['react-parallax-tilt'])

module.exports = withTM({
    async redirects() {
        return [
            {
                source: '/chat',
                destination: 'https://discord.gg/ygdefWwWzC',
                permanent: true
            },
            {
                source: '/discord',
                destination: 'https://discord.gg/ygdefWwWzC',
                permanent: true
            },
            {
                source: '/telegram',
                destination: 'https://t.me/screamsh',
                permanent: true
            },
            {
                source: '/github',
                destination: 'https://github.com/screamsh',
                permanent: true
            },
            {
                source: '/medium',
                destination: 'https://screamsh.medium.com',
                permanent: true
            },
            {
                source: '/twitter',
                destination: 'https://twitter.com/screamdotsh',
                permanent: true
            }
        ]
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true
    },
    webpack5: false
})
