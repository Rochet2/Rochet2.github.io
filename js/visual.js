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
        $( "#content>div" ).empty().html( data );
        $(".download.video").click(function() {
            $("#video").fadeIn();
            $("#video>div>div").html("<iframe src='" + $(this).attr("src") + "?autoplay=1' frameborder='0' allowfullscreen></iframe>");
        });
        $(".download.img").click(function() {
            $("#video").fadeIn();
            $("#video>div>div").html("<img src='" + $(this).attr("src") + "' />");
        });
        $("#video").click(function() {
            $("#video>div>div").empty();
            $( this ).fadeOut();
        });
    }, "html")
    .fail(function( data ) {
        $( "#content>div" ).empty().html( "<h1>Error loading content</h1>" );
    })
});