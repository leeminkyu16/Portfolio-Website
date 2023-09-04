import { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
	plugins: [
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `GatsbyJS`,
				short_name: `GatsbyJS`,
				start_url: `/`,
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
