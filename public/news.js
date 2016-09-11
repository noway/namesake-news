/// <reference path="../_all.d.ts" />
$(function () {
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
        });
    });
});
