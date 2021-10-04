var grid = document.querySelector('.timeline');
var projects = document.querySelector('.project');
var iso;
var hashID = window.location.hash.substring(1);


// Hash function
function getHashFilter() {
  var hash = location.hash;
  var matches = location.hash.match( /filter=([^&]+)/i );
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent( hashFilter );
}

// Primary Isotope settings
imagesLoaded( grid, function() {
  // init Isotope after all images have loaded
  iso = new Isotope( grid, {
    itemSelector: '.project',
    percentPosition: true,
    layoutMode: 'cellsByRow',
    cellsByRow: {
      columnWidth: '.project-sizer',
      rowHeight: '.project-sizer'
    }
  });

 // store filter for each group
 var filters = {};

 // Is Isotope running? 
 var isIsotopeInit = false;

 // Filter on button click
 var filtersElem = document.querySelector('.filters');
 filtersElem.addEventListener( 'click', function( event ) {
   // check for only button clicks
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
   
   // Add class to visible

  iso.on( 'arrangeComplete', function( filteredItems ) {
    var filteredItems = iso.getFilteredItemElements();
    projects.classList.remove('filtered');
    filteredItems.forEach(function(item) { item.classList.add('filtered')});
  });



   
   // Set hash and remove period from string
   location.hash = 'filter=' + encodeURIComponent( filterValue.replace('.', '') );
   
  // No results check
  var noResults = document.querySelector('.no-results');
  if (iso.filteredItems.length == 0) {
    noResults.classList.add('visible');
  }
  else {
    noResults.classList.remove('visible');

  }  

 }); // end button-click action
 
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

     // Hash Update
     var hashFilter = getHashFilter();
    if ( !hashFilter && isIsotopeInit ) {
      return;
    }
 
    isIsotopeInit = true;
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