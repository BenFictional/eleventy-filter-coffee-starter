---
layout: layouts/post.html
title: A new site with Eleventy
description:  Migrating from Wordpress and building a site.
date: 2022-03-04
featured_image: 
category: 
    - tutorials
---

I think this is the fourth big overhaul of benjaminandrew.net, which doesn't seem like all that many, but I honestly might be forgetting one. 

The site has been on Wordpress for the last couple versions, with the most redesign in 2017. That version of the site had some fun features, like the following giant page headers with animating SVG icons. I also used CSS Grid, back when it was brand new, for a particularly loose and asymmetrical homepage — something I've tried to stick to in the new design.

img

The old site eschewed a top navigation menu on the homepage, which I thought would be cool and provocative, but wound up regretting because the big clickable banners on the homepage did not signify their clickable potential clearly. Some other dated design chocies and a desire to adopt the increasingly popular tool of static site generators finally pushed me to start the design, or rather complete rebuild since I was moving from Wordpress to [Eleventy](https://www.11ty.dev/).

I'm no Javascript master, so Eleventy appealed to me because it can be so rudimentary in dealing with content as simple Markdown and HTML. I was also smitten with the tool's scrappy DIY attitude and its popularity among respected developers. The other big selling points of publishing with [Jamstack](https://jamstack.org/) tools, is that you get faster sites that don't burn as much energy, and you don't need to pay for expensive shared hosting or \(shudder\) open an FTP client. [Netlify](https://www.netlify.com/) wound up being my choice of hosting tool, with easy form handling and a reliable free tier. All you need is a GitHub repo to point it at, and your site is online for free \(not including a custom domain\).

So I used the [Export Media Library](https://wordpress.org/plugins/export-media-library/) plugin to download all my posts as Markdown files, and got to work looking through the many great [Eleventy starter projects](https://www.11ty.dev/docs/starter/).

I hybridized parts of Keerthi Yendamuri's [Filter Coffee starter](https://github.com/Yeshwanthyk/eleventy-filter-coffee-starter) and Tom Reinert's [11ty Tailwind starter](https://github.com/tomreinert/minimal-11ty-tailwind-starter) into my own [Cloudy Night starter site](https://github.com/BenFictional/Cloudy-Night-Starter), which includes a hacky way of running images through Cloudinary's free service for responsive and blazing fast images. 

## Cloudinary and Images

There are so many approaches to images these days, such as Eleventy's own [image plugin](https://www.11ty.dev/docs/plugins/image/), but I like that Cloudinary handles a lot of the behavior for you. The [Cloudinary Eleventy Helpers](https://www.npmjs.com/package/@jlengstorf/cloudinary-11ty-helpers) plugin by Jason Lengstorf does something similar, but I had already set mine up by the time I saw his. 😓

My Cloudinary shortcode uses the [fetch command](https://css-tricks.com/cloudinary-fetch-with-eleventy-respecting-local-development/), to inject a Cloudinary URL into any image path in the site. The following function is added to `eleventy.js`:

````
// Image shortcode
  config.addShortcode('img', function (path, alt, aspect) {

    // If the shortcode defines aspect as 'p' » set ratio="portrait", otherwise it's "landscape"
      var ratio = (aspect =="p") ? "portrait":"landscape";

      // Only run in production mode
      if (process.env.NODE_ENV === 'production') {
      return `<img src="https://res.cloudinary.com/benjand/image/fetch/q_auto,f_auto/https://ba-test.netlify.app/images/${path}" alt="${alt}" class="${ ratio }">`
      }

      // Local dev
      else {
      return `<img src="/images/${path}" alt="${alt}" class="${ ratio }">`
      }
  })
  ````

  When writing a post in Markdown, images can be added individually or within a special gallery element.

  ```
  // Single image
  {% img '2021/filename.jpg', 'Alt text' %}

  // Gallery
  <div class="gallery">
	{% img '2021/filename.jpg', 'Alt text', 'p' %}
	{% img '2021/filename.jpg', 'Alt text' %}
	{% img '2021/filename.jpg', 'Alt text' %}
 </div>
  ```

  I wanted the shortcode to be as concise as possible, so the only thin in there besides the filepath and alt text is an optional declaration of the image's aspect ratio. A lot of my Project pages include little grids of images, and by default all images receive a class of "landscape", but if you type that 'p' in there, the Javascript code above will label it with a class of "portrait" which affects it's display in the CSS grid. 

## Theming and Dark Mode 

The site has a dark mode, which is a feature I've been more aware of since our latest child has left me reading in the dark a lot in the middle of the night. I mostly followed this [tutorial by Ryan Feigenbaum](https://ryanfeigenbaum.com/dark-mode/), but any approach basically has you setting two sets of variables that get used depending on a class applied to the `<html>` element.

I defined a single color palette in SASS, so I could use lighten and darken on my primary theme colors, and then assigned those into CSS custom properties within the light and dark modes. You run into a lot of sematic choices with this, and I liked the approach of using `surface` and `element` in the custom properties to allow the names to gel with a variety of contexts. 

```
$paper: #FDF6EB;
$light: #fffdf9;
$dark: #2D272C;
$gray: #dbd6d2;
$light-gray: #E5E5E5;
$dark-gray: #a29b9b;
$extra-dark-gray: #575353;
$primary: #B4422B;
$primary-light: lighten($primary, 20%);
$primary-dark: darken($primary, 5%);

:root[color-mode="light"] {
  --surface: #{ $paper };
  --surface-emphasis: #{ $light };
  --element: #{ $dark };
  --element-subtle: #{ $gray };

  --primary: #{ $primary };
  --primary-soft: #{ $primary-light };
  --primary-emphasis: #{ $primary-dark };
}

:root[color-mode="dark"] {
  --surface: #{ $dark };
  --surface-emphasis: #{ $extra-dark-gray };
  --element: #{ $paper };
  --element-subtle: #{ $extra-dark-gray };

  --primary: #{ darken($primary, 5%) };
  --primary-soft: #{ $primary-dark };
  --primary-emphasis: #{ $primary-light };

}

```

For typography, I used a ratio to scale each font-size proportionally, and also used SASS variables for generic size units that are useful for margin, padding, and so on. I like to use SASS for variables that aren't goign to be changed dynamically by the users simply because they're faster to type.

```
// TYPE SCALE
$ratio: 1.25;  // Major third
$base-font-size: 18px;
$h6-size: $base-font-size;
$h5-size: $base-font-size * $ratio;
$h4-size: $h5-size * $ratio;
$h3-size: $h4-size * $ratio; 
$h2-size: $h3-size * $ratio;
$h1-size: $h2-size * $ratio;
$jumbo-size: $h1-size * $ratio;

// LAYOUT
$unit-xsml: 0.25rem;
$unit-sml: .5rem;
$unit-med: 1rem;
$unit-lrg: 3rem;
$unit-xl: 6rem;
$unit-xxl: 9rem;
$unit-xxxl: 18rem;
```
