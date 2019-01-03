module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/recommended'
	],
	plugins: [
		'jsdoc',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'vue/html-indent': 'off',
		'vue/max-attributes-per-line': [
			'error', {
				'singleline': 3,
				'multiline': {
					'max': 2,
					'allowFirstLine': true,
				},
			},
		],
		'jsdoc/check-tag-names': 1,
		'jsdoc/check-types': 1,
		'jsdoc/no-undefined-types': 1,
		'jsdoc/valid-types': 1,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	settings: {
		jsdoc: {

		}
	}
};
