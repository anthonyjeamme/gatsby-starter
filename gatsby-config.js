const jsconfig = require('./jsconfig.json')

const getGatsbyPluginAliases = () => {
	if (!jsconfig.compilerOptions || !jsconfig.compilerOptions.paths) return {}

	return Object.entries(jsconfig.compilerOptions.paths)
		.map(([alias, paths]) => ({
			alias: alias.replace('/*', ''),
			path: `${__dirname}/${paths[0].replace('/*', '')}`
		}))
		.reduce((acc, cur) => {
			acc[cur.alias] = cur.path
			return acc
		}, {})
}

module.exports = {
	siteMetadata: {
		title: `Gatsby Starter`,
		description: `Anthony Jeamme personnal starter kit`,
		author: `@anthonyjeamme`
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png`
			}
		},
		{
			resolve: `gatsby-plugin-alias-imports`,
			options: {
				alias: getGatsbyPluginAliases(),
				extensions: ['js', 'scss']
			}
		},
		`gatsby-plugin-gatsby-cloud`,
		`gatsby-plugin-sass`
	]
}
