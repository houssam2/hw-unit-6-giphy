var animals = ["cat", "dog"];
addButton(animals[0], 0);
addButton(animals[1], 1);

$("#add-animal").on("click", function(event) {
    console.log("Entered #add-animal onClick");
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    if (animal === "") {return;}
    animals.push(animal);
    addButton(animal, animals.length-1);
    console.log(animals);
});


$(document).on("click", ".animal-btn", function(event) {
    console.log("Entered .animal-btn onClick");
    $("#animals-view").empty();

    var animal = $(this).attr("data-name");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=XrqEepeGHoEkU2NiDbKOu8PZVZIzghIV&limit=10&rating=g"
                    + "&q=" + animal;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var results = response.data;
        for (var i=0; i<results.length; ++i) {
            var animalImg = $("<img>");
            animalImg.attr({
                "src": results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still"
            });
            animalImg.addClass("animal-img");
            $("#animals-view").append(animalImg);
        }
    });
});

$(document).on("click", ".animal-img", function() {
    console.log("Entered .animal-img");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

function addButton(animal, animal_id) {
    console.log("Entered addButton");
    var btn = $("<button>");
    btn.attr({
        "type": "button",
        "data-name": animal
    });
    btn.addClass("btn btn-primary btn-sm animal-btn");
    btn.text(animal);
    $("#buttons-view").append(btn);
}