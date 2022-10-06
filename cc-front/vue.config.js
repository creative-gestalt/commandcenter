module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: process.env.NODE_ENV === "production",
  devServer: {
    port: 8082,
  },
};
