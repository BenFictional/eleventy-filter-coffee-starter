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

 // store filter for each group
 var filters = {};

 var filtersElem = document.querySelector('.filters');
 filtersElem.addEventListener( 'click', function( event ) {
   // check for only button clicks
  //  var isButton = event.target.classList.contains('button');
   if ( !matchesSelector( event.target, 'button' ) ) {
          return;
        }
 
   var buttonGroup = fizzyUIUtils.getParent( event.target, '.button-group' );
   var filterGroup = buttonGroup.getAttribute('data-filter-group');
   // set filter for group
   filters[ filterGroup ] = event.target.getAttribute('data-filter');
   // combine filters
   var filterValue = concatValues( filters );
   // set filter for Isotope
   iso.arrange({ filter: filterValue });
  
     // No results check
  //  var noResults = document.querySelector('.no-results');
  //  if ( grid.childNodes.length > 0) // Children exist, they are display: none
  //   { noResults.classList.remove('visible');}
  //  else 
  //  { noResults.classList.add('visible');}

 });
 
 // change is-checked class on buttons
 var buttonGroups = document.querySelectorAll('.button-group');
 
 for ( var i=0; i < buttonGroups.length; i++ ) {
   var buttonGroup = buttonGroups[i];
   var onButtonGroupClick = getOnButtonGroupClick( buttonGroup );
   buttonGroup.addEventListener( 'click', onButtonGroupClick );
 }
 
 function getOnButtonGroupClick( buttonGroup ) {
   return function( event ) {
     // check for only button clicks
    //  var isButton = event.target.classList.contains('button');
     if ( !matchesSelector( event.target, 'button' ) ) {
      return;
    }
     var checkedButton = buttonGroup.querySelector('.is-checked');
     checkedButton.classList.remove('is-checked')
     event.target.classList.add('is-checked');

     console.log("button state changed");
   }
 }
 
 // flatten object by concatting values
 function concatValues( obj ) {
   var value = '';
   for ( var prop in obj ) {
     value += obj[ prop ];
   }
   return value;
 }
}); // end imageLoaded