(function() {
	
	function imgClickGalery(name) {
	    var $active;

	    var $imgs = $(name);

	    $imgs.on('click', function (event) {
	        var $this = $(this);
	        var _this = event.target;
	        var dynamicArr = [];
	        var ind = -1;

	        $this.find('img').each(function (index) {
	            // forming an array
	            if ($(this).is(_this)) {
	                ind = index;
	            }
	            dynamicArr.push({
	                'src': $(this).attr('src')
	            });
	        });

	        var Galery = $this.lightGallery({
	            dynamic: true,
	            dynamicEl: dynamicArr,
	            enableDrag: false,
	            index: ind
	            //enableTouch: false
	        });

	        Galery.on('onAfterOpen.lg', function () {/*event before Load lightGalery*/
	            $active = $this;
	            console.log($active);
	            $(document)
	                .on('mouseenter', '.lg-object', function () {
	                    $(this)
	                        .closest('.lg')
	                        .find('.lg-toolbar')
	                        .addClass('image-hovered');
	                    $(this)
	                        .closest('.lg')
	                        .find('.lg-next')
	                        .addClass('image-hovered');
	                })
	                .on('mouseleave', '.lg-object', function () {
	                    $(this)
	                        .closest('.lg')
	                        .find('.lg-toolbar')
	                        .removeClass('image-hovered');
	                    $(this)
	                        .closest('.lg')
	                        .find('.lg-next')
	                        .removeClass('image-hovered');
	                });
	        });
	    });

	    /*click img -> next slide lightGallery*/
	    $(document).on('click', '.lg-object', function (event) {
	        $active.data('lightGallery').goToNextSlide();
	    });

	    /*close lightGallery*/
	    $(document).on('click', function (event) {
	        if ($(event.target).hasClass('lg-inner')) {
	            $active.data('lightGallery').destroy();
	        }
	    });
	}

	if (!$.fn.imgClickGalery || ($.fn.imgClickGalery && !$.fn.imgClickGalery.Constructor)) {
		$.fn.imgClickGalery = imgClickGalery;
	}
}());