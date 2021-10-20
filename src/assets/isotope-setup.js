// external js: isotope.pkgd.js
$(document).ready(function() {

  function getHashFilter() {
    var hash = location.hash;
    // get filter=filterName
    var matches = location.hash.match(/filter=([^&]+)/i);
    var hashFilter = matches && matches[1];
    return hashFilter && decodeURIComponent(hashFilter);
  }

  // init Isotope
  var $grid = $('.timeline').isotope({
    itemSelector: '.project',
    percentPosition: true,
    layoutMode: 'cellsByRow',
    cellsByRow: {
      columnWidth: '.project-sizer',
      rowHeight: '.project-sizer'
    }
  });
  
  // Function to check if filters have some results
  function checkResults(){
    var visibleItemsCount = $grid.data('isotope').filteredItems.length;
    console.log(filters);
    if( visibleItemsCount > 0 ){
      $('.no-results').hide();
    }
    else{
      $('.no-results').show();
    }
  }

  // store filter for each group
  var filters = {};

  $('.filters').on('click', '.filter-button', function() {
    var $this = $(this);
    // get group key
    var $buttonGroup = $this.parents('.button-group');
    var filterGroup = $buttonGroup.attr('data-filter-group');
    // set filter for group
    filters[filterGroup] = $this.attr('data-filter');
    // combine filters
    var filterValue = concatValues(filters);
    // set filter for Isotope
    $grid.isotope({ filter: filterValue });

    location.hash = 'filter=' + encodeURIComponent(filterValue);

  });

  // change is-checked class on buttons
  $('.button-group').each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });

  var isIsotopeInit = false;

  function onHashchange() {
    var hashFilter = getHashFilter();
    if (!hashFilter && isIsotopeInit) {
      return;
    }

    // filter isotope
    $grid.isotope({
      itemSelector: '.project',
      filter: hashFilter
    });
    $grid.isotope();
    checkResults();
    // set selected class on button
    // only on page load, if isotope hasn't inited yet
    if (!isIsotopeInit && hashFilter) {
      var buttonsFilterSelector = getButtonsFilterSelector(hashFilter);
      // trigger click to make it selected and act normal
      // sets correct filter state
      $('.filters').find(buttonsFilterSelector).trigger('click');
    }
    
    isIsotopeInit = true;
  }

  $(window).on('hashchange', onHashchange);
  // trigger event handler to init Isotope
  onHashchange();

  
// flatten object by concatting values
function concatValues(obj) {
  var value = '';
  for (var prop in obj) {
    value += obj[prop];
  }
  return value;
}

// get filter selectors from hash
function getButtonsFilterSelector(hashFilter){
  var filters = hashFilter.substring(1).split(".");
  var joinedFilters = filters.join('"], [data-filter=".');
  var selector = '[data-filter=".' + joinedFilters + '"]';
  return selector;
}
  
});