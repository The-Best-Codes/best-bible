const buildTarget = process.env.BUILD_TARGET;

module.exports = {
    presets: [
        "@babel/preset-typescript",
        [
            "@babel/preset-env",
            {
                modules: buildTarget === 'esm' ? false : 'commonjs'
            }
        ]
    ],
    env: {
        cjs: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: "commonjs"
                    }
                ]
            ]
        },
        esm: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false
                    }
                ]
            ]
        }
    }
};