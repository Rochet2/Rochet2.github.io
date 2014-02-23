$( document ).ready(function() {
    // SRC: https://gist.github.com/tsi/5137145
    // My micro jQuery templating engine
    // Usage:
    //
    //    <section data-html="content"></section>
    //
    // Will load <content.html> into <section>
 
    $(document).ready(function() {
        // Load external contents
        $("[data-html]").each(function() {
            el = $(this);
            var src = $(this).attr("data-html") + ".html";
            el.load(src);
        });
    });
});