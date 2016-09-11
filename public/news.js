/// <reference path="../_all.d.ts" />
$(function () {
    var state = 'ready';
    function load_name_news() {
        state = 'loading';
        $.getJSON('/name-news', function (data, status) {
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
                state = 'ready';
            });
        });
    }
    load_name_news();
    var win = $(window);
    var doc = $(document);
    var next = 0;
    // Each time the user scrolls
    win.scroll(function () {
        // Vertical end reached?
        /*
        if (doc.height() - win.height() == win.scrollTop()) {
            // New row
            var tr = $('<tr />').append($('<th />')).appendTo($('#spreadsheet'));

            // Current number of columns to create
            var n_cols = $('#spreadsheet tr:first-child th').length;
            for (var i = 0; i < n_cols; ++i)
                tr.append($('<td />'));
        }
        */
        // Horizontal end reached?
        if (doc.width() - win.width() == win.scrollLeft()) {
            // New column in the heading row
            if (state == 'ready') {
                load_name_news();
            }
        }
    });
});
