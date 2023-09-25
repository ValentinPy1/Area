module.exports = {
    preset: 'react-native',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    globals: {
        'ts-jest': {
            babelConfig: true,
            diagnostics: false,
            isolatedModules: true
        }
    },
    cacheDirectory: '.jest/cache'
};
