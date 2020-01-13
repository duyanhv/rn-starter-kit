/* eslint-disable no-null/no-null */
module.exports = {
	dependencies: {
		'some-unsupported-package': {
			platforms: {
				android: null, // disable Android platform, other platforms will still autolink if provided
				ios: null,
			},
		},
	},
};
