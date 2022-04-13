import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
const dirname = path.resolve();

export default {
    entry: {
        index: './src/index.ts'
    },
    devtool: 'inline-source-map',
    mode:'development',
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'],
            //     exclude: /node_modules/,
            // }
        ],
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\/]node_modules[\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(dirname, 'dist'),
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks:['index']
        })
    ],
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(dirname, '.webpack_cache')
    },
};