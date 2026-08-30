// vue.config.js
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    host: "localhost",
    port: 8080,
    hot: true,
    liveReload: true,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    allowedHosts: "all",
  },
  publicPath: "/",
});
