import { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
	plugins: [
		`gatsby-plugin-sass`,
		// Injects react-helmet's tags into the build-time <head> so crawlers and
		// social scrapers (which run no JS) actually see title/description/OG.
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Min-Kyu Lee Portfolio`,
				short_name: `MK Portfolio`,
				start_url: `/`,
				description: `Min-Kyu Lee's portfolio — software developer`,
				lang: `en`,
				background_color: `#f7f0eb`,
				theme_color: `#a2466c`,
				display: `standalone`,
				icons: [
					{
						src: `/favicons/android-chrome-192x192.png`,
						sizes: `192x192`,
						type: `image/png`,
					},
					{
						src: `/favicons/android-chrome-512x512.png`,
						sizes: `512x512`,
						type: `image/png`,
					},
				],
			},
		},
	],
};

export default config;
