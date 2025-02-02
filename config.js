var config = {
  baseApiUrlSymf: "http://api.littlesis.org/",
  baseApiUrlRails: "http://littlesis.org/",
  lsApiKey: process.env.LS_API_KEY,
  externalNodeLinks: true,
  basePath: "story_maps",
  brandName: "LittleSis",
  brandUrl: "http://littlesis.org",
  brandImageUrl: "http://pai-littlesis.s3.amazonaws.com/images/system/lilsis-logo-trans-200.png",
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  navLinks: { 
    Oligrapher: "/oligrapher",
    Explore: {
      Maps: "/maps",
      Lists: "/lists",
      Groups: "/groups",
      Notes: "/notes",
      Users: "/users",
      Edits: "/users"
    },
    About: { 
      LittleSis: "/about",
      Features: "/features",
      'Our Team': "/team",
      Press: "/press",
      'Data API': "http://api.littlesis.org",
      'Source Code': "https://github.com/littlesis-org/littlesis",
      Disclaimer: "/disclaimer",
      'Contact Us': "/contact"
    }
  }
};

module.exports = config;