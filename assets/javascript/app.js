// Initial array of gifs
var topics = ["Kobe Bryant", "Michael Jordan", "Lebron James", "Stephen Curry"];

// displaygifInfo function re-renders the HTML to display the appropriate content
function displaygifInfo() {

  var gif = $(this).attr("data-name");
  var queryURL ="https://api.giphy.com/v1/gifs/search?q="
                + gif + "&limit=10&rating=g&api_key=jXApSDkPiCb9oYlPNE9WHunMxV9RtNk5";

  // Creating an AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var results = response.data;

    $("#gifs-view").empty();

    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url)
                .attr("data-still", results[i].images.fixed_height_still.url)
                .attr("data-animate", results[i].images.fixed_height.url)
                .attr("data-state","still")
                .addClass("gif");

        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        $("#gifs-view").append(gifDiv);
    }
  });

}

// Function for displaying gif data
function renderButtons() {

  // Deleting the gifs prior to adding new gifs
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of gifs
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("gif-btn");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}

// This function handles events where a gif button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var gif = $("#gif-input").val().trim();
  topics.push(gif);
  renderButtons();
});

$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displaygifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();