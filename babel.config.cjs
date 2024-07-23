const buildTarget = process.env.BUILD_TARGET;

module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-typescript"
    ],
    plugins: [
        [
            "module-resolver",
            {
                root: ["./dist"],
                alias: buildTarget === 'esm' ? {
                    "./data/bible.json": "../data/bible.json",
                    "./utils/abbreviations": "../utils/abbreviations",
                    "./utils/validation": "../utils/validation"
                } : {
                    "./data/bible.json": "./data/bible.json",
                    "./utils/abbreviations": "./utils/abbreviations",
                    "./utils/validation": "./utils/validation"
                }
            }
        ]
    ]
};