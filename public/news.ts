/// <reference path="../_all.d.ts" />

$(() => {
    var state = 'ready';
    var next = 0;
    
    

    function load_name_news() {
        state = 'loading';
        $.getJSON('/name-news', { offset: next }, (data: any, status: string) => {

            data.value.forEach(element => {

                let div = $('<article class="media">');
                let left = $('<div class="media-left"><a><img/></a></div>');
                let body = $('<div class="media-body"><h4 class="media-header"><a></a></h4><p></p></div>');

                $('a', body).html(element.name);
                $('a', body).attr('href', element.url);
                $('a', left).attr('href', element.url);

                if (typeof element.image != 'undefined') {
                    $('img', left).attr('src', element.image.thumbnail.contentUrl);
                }
                $('p', body).html(element.description);

                div.append(left);
                div.append(body);

                div.hide();

                $('.feed').append(div);

                div.slideDown();
            });

            $('.feed').highlight($('.my-name').val(),{
                wordsOnly: true,
                wordsBoundary: '[\\b\\W]',
                caseSensitive: true,
            });

            state = 'ready';
            next += 10;
        });
    }
    load_name_news();

	var win = $(window);
	var doc = $(document);

	// Each time the user scrolls
	win.scroll(function() {
		// Vertical end reached?
		if (doc.height() - window.innerHeight == win.scrollTop()) {
			// New column in the heading row
            if(state== 'ready'){
                load_name_news();
            }
		}
	});
});
