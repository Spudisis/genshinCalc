module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "./dist/bundle.js",
  },

  // Включить карты кода для отладки вывода webpack
  devtool: "source-map",

  resolve: {
    // Добавить разрешения '.ts' и '.tsx' к обрабатываемым
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.css$/, use: "css-loader" },
    ],

    preLoaders: [{ test: /\.js$/, loader: "source-map-loader" }],
  },
  mode: "development",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
