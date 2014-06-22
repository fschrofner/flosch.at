 $(window).bind("load", function () {
    var footer = $("#footer");
    var pos = footer.position();
    var height = $(window).height();
    height = height - pos.top;
    height = height - footer.height() - 4.8;
    if (height > 0) {
        footer.css({
            'margin-top': height + 'px'
        });
    }
    footer.css({
            'margin-bottom': 4.8 + 'px'
        });
});
