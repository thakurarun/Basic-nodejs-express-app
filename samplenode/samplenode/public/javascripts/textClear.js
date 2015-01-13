/* ===================================================
 * textClear.js v0.0.3
 * jQuery Plugin to clear input field text on fly - like as provided in Internet Explorer 10
 * 
 *==========================================================================================
 * The MIT License (MIT)
 * 
 * Copyright(c)2013 Exex Zian
 * 
 * =========================================================================================
 * Requires: textClearStyle.css and jQuery.js
 * =========================================================================================
 */
(function ($) {
    $.fn.textClear = function () {
        $(this).on({
            'keypress': function (e) {
                $(this).addClass('crossClear');
            },
            'focusout': function () {
                $(this).removeClass('crossClear');
            },
            'focus': function () {
                if ($(this).val().length > 0)
                    $(this).addClass('crossClear');
            }
        });
    }
})(jQuery);
$(document).on('click', '.crossClear', function (ev) {
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    if (ev.isPropagationStopped() && $(ev.target).hasClass('crossClear')) {
        var mousePosInElement = ev.pageX - $(ev.target).offset().left + 10;
        if (mousePosInElement > $(ev.target).width()) {
            $(ev.target).val('');
            $(ev.target).removeClass('crossClear');
        }
    }
});