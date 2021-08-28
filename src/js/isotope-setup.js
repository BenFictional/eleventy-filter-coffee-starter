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

  // bind filter button click
  var filtersElem = document.querySelector('.timeline-filter');
  filtersElem.addEventListener( 'click', function( event ) {
    // only work with buttons
    if ( !matchesSelector( event.target, 'button' ) ) {
      return;
    }
    var filterValue = event.target.getAttribute('data-filter');
    // use matching filter function
    filterValue = filterValue;
    iso.arrange({ filter: filterValue });
  });

  // change is-checked class on buttons
var buttonGroups = document.querySelectorAll('.timeline-filter');
for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup( buttonGroup );
}

function radioButtonGroup( buttonGroup ) {
  buttonGroup.addEventListener( 'click', function( event ) {
    // only work with buttons
    if ( !matchesSelector( event.target, 'button' ) ) {
      return;
    }
    buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
    event.target.classList.add('is-checked');
  });
}

}); // end imageLoaded

  