$( document ).ready(function() {
    // SRC: https://gist.github.com/tsi/5137145
    // My micro jQuery templating engine
    // Usage:
    //
    //    <section data-html="content"></section>
    //
    // Will load <content.html> into <section>
 
    // Load external contents
    $("[data-html]").each(function() {
        el = $(this);
        var src = $(this).attr("data-html") + ".html";
        el.load(src);
    });
    
    var content = document.URL;
    var index = content.indexOf("?")+1;
    if (index <= 0)
    {
        content = "Home";
    }
    content = content.substr(index).replace(/%20/g,"_");
    index = content.indexOf("#");
    if (index > 0)
    {
        content = content.substr(0, index);
    }
    $(".active").removeClass( "active" );
    $("." + content + "_active").addClass( "active" );
    content = content.replace(/_/g," ");
    document.title = content + " | RochetCode";
    $.get( "/pages/" + content + ".html", function( data ) {
        $( "#content" ).empty().html( data );
    }, "html")
    .fail(function( data ) {
        $( "#content" ).empty().html( "<h1>Error loading content</h1>" );
    })
});