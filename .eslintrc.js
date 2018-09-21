module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		ecmaFeatures: {
		}
	},
	env: {
		es6: true,
		browser: true,
		node: true
	},
	globals: {
    'describe': false,
    'xdescribe': false,
		'it': false,
		'expect': false,
		'browser': false,
		'before': false,
		'after': false,
		'xit': false
	},
	extends: [
		'eslint:recommended',
	],
	plugins: ['mocha'],
	rules: {
		"mocha/no-exclusive-tests": "error"
	}
};
