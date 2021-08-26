// external js: isotope.pkgd.js, imagesloaded.pkgd.js

var grid = document.querySelector('.timeline');
var iso;

imagesLoaded( grid, function() {
  // init Isotope after all images have loaded
  iso = new Isotope( grid, {
    itemSelector: '.project',
    percentPosition: true,
    masonry: {
      columnWidth: 100
    }
  });
});
