const WebpackObfuscator = require("webpack-obfuscator");

const ObfuscationPlugin = new WebpackObfuscator({
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.5,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.3,
    debugProtection: false,
    debugProtectionInterval: 2000,
    disableConsoleOutput: true,
    identifierNamesGenerator: "hexadecimal",
    log: false,
    numbersToExpressions: true,
    selfDefending: true,
    simplify: false,
    splitStrings: false,
    stringArray: true,
});

module.exports = ObfuscationPlugin;
