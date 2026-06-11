// vue.config.js
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    host: "0.0.0.0", // Allow LAN & localhost access
    port: 8080, // You can change this if needed
    hot: true, // Hot Module Replacement
    liveReload: true, // Fallback live reload
    client: {
      overlay: {
        warnings: false, // Optional: Hide warnings if you don't want them
        errors: true,
      },
    },
    allowedHosts: "all", // ⚠️ Can REMOVE this safely (optional)
  },
});
