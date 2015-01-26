// http://codyhouse.co/gem/side-team-member-bio/

jQuery(document).ready(function($){
	var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

	//open team-member bio
	$('#reveal-gallery').find('ul a').on('click', function(event){
		event.preventDefault();
		var selected_member = $(this).data('type');
		$('.reveal-panel.'+selected_member+'').addClass('slide-in');
		$('.reveal-panel__close').addClass('is-visible');

		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( is_firefox ) {
			$('main').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
		} else {
			$('main').addClass('slide-out');
			$('body').addClass('overflow-hidden');
		}

	});

	//close team-member bio
	$(document).on('click', '.reveal__overlay, .reveal-panel__close', function(event){
		event.preventDefault();
		$('.reveal-panel').removeClass('slide-in');
		$('.reveal-panel__close').removeClass('is-visible');

		if( is_firefox ) {
			$('main').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('main').removeClass('slide-out');
			$('body').removeClass('overflow-hidden');
		}
	});
});
