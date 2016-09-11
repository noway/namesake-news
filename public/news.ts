/// <reference path="../_all.d.ts" />

$(() => {
    $.getJSON('/name-news', (data: any, status: string) => {
        data.value.forEach(element => {

            let div = $('<div>');

            let anchor = $('<a>');
            let img = $('<img>');
            let text = $('<p>');

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
