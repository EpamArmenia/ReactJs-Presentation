var path = require("path");
module.exports = {
    entry: {
        main: ["./ClientApp/boot-client.jsx"]
    },
    output: {
        path: path.join(__dirname, "wwwroot"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, include: /ClientApp/, loader: "babel-loader" }
        ]
    },
    plugins: []
}