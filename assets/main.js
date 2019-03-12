$(document).ready(function() {
  var topics = [];
  function displayEmotions() {
    $("#gifArea").empty();
    var x = $(this).data("search");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      x +
      "&api_key=4wyZSUZyExEou6uZdMcGUFmn5de82VA9";
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < 10; i++) {
        var showDiv = $("<div>");
        showDiv.addClass("gifContainer");
        var rating = results[i].rating;
        var defaultAnimatedSrc = results[i].images.fixed_height.url;
        var staticSrc = results[i].images.fixed_height_still.url;

        var p = $("<p>").text("Rating: " + rating);
        var showImage = $("<img>");
        showImage.attr("src", staticSrc);
        showImage.addClass("emotionsGiphy");
        showImage.attr("data-state", "still");
        showImage.attr("data-still", staticSrc);
        showImage.attr("data-animate", defaultAnimatedSrc);

        showDiv.append(showImage);
        showDiv.append(p);

        $("#gifArea").prepend(showDiv);
      }
    });
  }
  $("#addShow").on("click", function(event) {
    event.preventDefault();
    var newShow = $("#emotionsInput")
      .val()
      .trim();
    topics.push(newShow);
    console.log(topics);
    $("#emotionsInput").val("");
    displayButtons();
  });
  function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "show");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }
  displayButtons();

  $(document).on("click", "#show", displayEmotions);
  $(document).on("click", ".emotionsGiphy", stopPlayGifs);
  function stopPlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }
});
