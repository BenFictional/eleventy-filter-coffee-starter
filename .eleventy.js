const filters = require('./utils/filters.js');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const slugify = require("slugify");

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (config) => {

  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/media');
  config.addPassthroughCopy('src/images');

  config.addPlugin(eleventyNavigationPlugin);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });

  // Make dates readable
  const {
    DateTime
  } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    config.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yy-MM-dd');
    });

    config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toLocaleString(DateTime.DATE_MED);
  });

  config.addFilter("yearOnly", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat("yyyy");
  });

  // Image shortcode
  config.addShortcode('img', function (path, alt, aspect) {

    // If the shortcode defines aspect as 'p' » set ratio="portrait", otherwise it's "landscape"
      var ratio = (aspect =="p") ? "portrait":"landscape";

      // Only run in production mode
      if (process.env.PROD === 'true') {
      return `<img src="https://res.cloudinary.com/benjand/image/fetch/q_auto,f_auto/https://ba-test.netlify.app/images/${path}" alt="${alt}" class="${ ratio }">`
      }

      // Local dev
      else {
      return `<img src="/images/${path}" alt="${alt}" class="${ ratio }">`
      }
  })

  // Get current year
  config.addShortcode("year", () => `${new Date().getFullYear()}`);


  // Slugs
  config.addFilter("slug", (str) => {
    if (!str) {
      return;
    }
  
    return slugify(str, {
      lower: true,
      replacement: '-'
    });
  });
  
  // Project media list
  config.addFilter("uniqueMedia", (array) => {
    let media = new Set()
    for (const p of array) {
      if (p.data && p.data.media) {
        for (const mediaItem of p.data.media) {
          media.add(mediaItem)
        }
      }
    }
    return [...media]
  })

   // Project type list
   config.addFilter("uniqueTypes", (array) => {
    let types = new Set()
    for (const p of array) {
      if (p.data && p.data.project_type) {
        for (const typeItem of p.data.project_type) {
          types.add(typeItem)
        }
      }
    }
    return [...types]
  })

  // Featured projects
  config.addCollection('featuredProjects', collection => {
    return collection.getFilteredByGlob('./src/projects/**/*.md')
      .filter(
        post => post.data.featured_project
      )
      .sort((a,b) => {
        return a.data.post_weight - b.data.post_weight;
      });
   });


  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
    passthroughFileCopy: true
  };
};
