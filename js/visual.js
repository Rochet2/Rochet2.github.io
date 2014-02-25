$( document ).ready(function() {
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
        $(".video").click(function() {
            $("#video>iframe").prop("src", $(this).attr("src"));
            $("#video").fadeIn();
        });
        $("#video").click(function() {
            $( this ).fadeOut();
        });
    }, "html")
    .fail(function( data ) {
        $( "#content" ).empty().html( "<h1>Error loading content</h1>" );
    })
});