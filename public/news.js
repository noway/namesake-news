/// <reference path="../_all.d.ts" />
$(function () {
    var state = 'ready';
    var next = 0;
    function load_name_news() {
        state = 'loading';
        $.getJSON('/name-news', { offset: next }, function (data, status) {
            data.value.forEach(function (element) {
                var div = $('<div>');
                var anchor = $('<a>');
                var img = $('<img>');
                var text = $('<p>');
                anchor.html(element.name);
                anchor.attr('href', element.url);
                if (typeof element.image != 'undefined') {
                    img.attr('src', element.image.thumbnail.contentUrl);
                }
                text.html(element.description);
                div.append(img);
                div.append(anchor);
                div.append(text);
                $('.feed').append(div);
            });
            state = 'ready';
            next += 10;
        });
    }
    load_name_news();
    var win = $(window);
    var doc = $(document);
    // Each time the user scrolls
    win.scroll(function () {
        // Vertical end reached?
        if (doc.height() - window.innerHeight == win.scrollTop()) {
            // New column in the heading row
            if (state == 'ready') {
                load_name_news();
            }
        }
    });
});
