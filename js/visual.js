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
    
    // var content = window.location.hash.replace(/#/g,"").replace(/_/g," ").replace(/%20/," ") + ".html";
    var content = document.URL;
    alert( content );
    content = content.substr(content.indexOf(".html")+5).replace(/_/g," ").replace(/%20/," ") + ".html";
    alert( content );
    $.get( content, function( data ) {
        $( "#content" ).empty().html( data );
    }, "html")
    .fail(function() {
        alert( "error" );
    })
    .done(function( data ) {
    });
});