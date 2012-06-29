jQuery(document).ready(function($) {
  jQuery('#edit-field-type, #node_ride_form_group_to, #node_ride_form_group_from, #edit-field-no-passengers, #edit-field-passengers')
  	.addClass('container-inline');

  update_from_cities();
  update_to_cities();
  
  jQuery('#edit-field-from-province-tid').change(update_from_cities);
  jQuery('#edit-field-to-province-tid').change(update_to_cities);
  
  // remove search rides attachment headers
  jQuery('.view-search-rides .attachment thead').remove();
});

function update_from_cities() {
	update_province_city_dependency('#edit-field-from-province-tid', '#edit-field-from-city-tid');
}

function update_to_cities() {
	update_province_city_dependency('#edit-field-to-province-tid', '#edit-field-to-city-tid');
}

function update_province_city_dependency(province_selector, city_selector) {
	tid = jQuery(province_selector).val();
	jQuery(city_selector).attr('disabled','disabled');
	

	if (tid != 'All') {
		jQuery.getJSON(Drupal.settings.basePath + 'misc/province/cities/' + tid, {},  
	    function (cities) {
		  currOption = jQuery(city_selector).val();
		  
	      jQuery(city_selector + ' option').remove();
	      jQuery.each(cities, function(key, value) {
	        jQuery(city_selector)
	        .prepend(jQuery('<option>', { value : key })
	          .text(value)); 
	      });
	      
	      var hasOption = jQuery(city_selector + ' option[value="' + currOption + '"]');
	      
	      if (hasOption.length != 0) {
	    	  jQuery(city_selector).val(currOption);  
	      }
	      
	      
	      jQuery(city_selector).removeAttr('disabled');
	    }); 
	}
	else {
		jQuery(city_selector).val('All');
	}
}
