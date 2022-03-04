---
layout: layouts/project.html
title: CAESAR Mission Proposal
description: Branding for proposed NASA mission
date: 2018-08-14
featured_image: /2018/caesar-promo-50.jpg
featured_alt: A spacecraft and blue teal logo reading CAESAR with intersecting rings. 
featured_project: false
tags: 
  - projects
project_type: 
  - client design
media:
  - graphic design
  - web
---

After being a [fake astronaut](http://benjaminandrew.net/project/mythonaut/), a [time-traveling scientist](http://benjaminandrew.net/project/chronoecology-corps/), and an [anti-futurist](http://benjaminandrew.net/project/the-rebellion-for-autonomous-future-2/), my obsession with science fiction has finally put me in league with actual space-faring NASA scientists. For the past two years I've been doing occasional design work for a NASA mission proposal called [CAESAR](http://caesar.cornell.edu)—for Comet Astrobiology Exploration SAmple Return (yes, apparently now you can use two letters of a word for an acronym).

The proposal is one of two finalists for upcoming missions, and it's organized by an international team of scientists and engineers. Throughout the first round of the competition, most of the information about CAESAR was kept under wraps, but the public website I developed for the project is finally live, so the curtain has been lifted on some of the work I've done for the project.

It's exciting that the folks leading this project recognize the importance of graphic design and digital media, and I've greatly enjoyed my look into the development of the space-faring comet-grabbing robot named CAESAR.

 
{% img '2018/caear-brand-showcase-2.png', 'CAESAER wordmark logo with blue, teal, purple color swatches.' %}

 
Having worked with science students at Johns Hopkins and Penn State, I'm familiar with the tragicomic design scientists create for conference posters and publication. I teach occasional workshops about poster design, and try to equip young scientists with basic design skills and software know-how, but for larger projects like CAESAR it's probably wise for the team to bring in a hired hun like me to develop the branding identity for the suite of figures and publications involved in the ongoing project.

 

The CAESAR logo shows a stylized comet breaking apart into concentric circles, in reference to the mission's objective of bringing home a piece of [Churyumov-Gerasimenko](http://caesar.cornell.edu/comet/). It also resembles the blue-tinged ion drive that will power the ship on its 14 year journey.

{% img '2018/caesar-website-home.png', 'A website showing CAESAR spacecraft and text' %}

The website uses a dark theme (because space) to create a bit of drama in the presentation of scientific details. The page headers and some design elements on the home page use circles to echo the concentric rings of the logo—and the ellipses of the mission's trajectory, which I think a terrific graphic element.

The top section of the home page uses some fun CSS effects to create the rotating rings and dynamic text. The rings are just SVG's set to rotate with CSS animations, and the video is simply cropped with border-radius!

The shadowy header text is a little more complicated, but I made a CodePen that demos the technique.

<p class="codepen" data-height="627" data-theme-id="0" data-slug-hash="VQEJvG" data-default-tab="css,result" data-user="BenFictional" data-pen-title="Animated Shadow Text">See the Pen <a href="https://codepen.io/BenFictional/pen/VQEJvG/">Animated Shadow Text</a> by Benjamin Andrew (<a href="https://codepen.io/BenFictional">@BenFictional</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

The text's container element is set to [background-clip: text](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip) and then I created a gradient background element that's much larger than the actual element, and animated it with CSS. The enormous gradient just needs to begin and end with black so it can loop seamlessly.
