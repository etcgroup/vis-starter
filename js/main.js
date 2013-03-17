//Execute the code below once jQuery thinks the DOM is loaded
$(document).ready(function() {

    //We will add a bit of HTML to the top of the body
    $('body').prepend('<h1>jQuery is running!<h1>');

    //Select all of the divs with class='row'
    var rows = $('div.row');

    //Set some css properties on the rows
    rows.css({
        'border': '1px solid #333',
        'background-color': '#fdffab'
    });

    //Foolishly, we will delete any row when the mouse click's on it
    //More on jQuery events: http://api.jquery.com/category/events/
    rows.on('click', function() {
        //Call the delete function (below)
        //'this' is the element (the row) that was clicked
        deleteElement(this);
    });

    //Deletes an element from the DOM
    function deleteElement(element) {
        //Wrap the raw element in jQuery, then use jQuery's remove()
        $(element).remove();
    }

});