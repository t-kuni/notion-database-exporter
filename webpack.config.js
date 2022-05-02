module.exports = {
    target : 'node',
    node   : {
        __dirname: true,
    },
    entry  : {
        example: './src/example.ts',
    },
    module : {
        rules: [
            {
                test   : /\.tsx?$/,
                use    : [
                    {
                        loader : 'thread-loader',
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            workers    : require('os').cpus().length - 1,
                            // poolTimeout: Infinity // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
                        },
                    },
                    {
                        loader : 'ts-loader',
                        options: {
                            happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                        }
                    }
                ],
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [],
};