module.exports = [
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: 'url-loader?limit=10000&name=font/[hash].[ext]'
  },
  {
    test: /\.svg$/,
    loader: 'svg-inline-loader',
    options: {
      classPrefix: true,
      removeTags: true,
      removingTagAttrs: ['fill']
    }
  }
]
