var opponent_img = document.getElementById("opponent_img");

var paper_choice = document.getElementById("paper");
var scissor_choice = document.getElementById("scissor");
var stone_choice = document.getElementById("stone");
const choices_array = [paper_choice, scissor_choice, stone_choice];

var opponent_img = document.getElementById("opponent_img");

const CHOICES = ["paper", "scissor", "stone"];

var result_display = document.getElementById("result");
var result = "nothing";

const go_back_btn = document.getElementById("goback");

// player click button
for (let i = 0; i < choices_array.length; i++) {
    choices_array[i].addEventListener("click", function(e) {
        e.preventDefault();

        const player_choice = choices_array[i].id;
        const opponent_choice = CHOICES[Math.floor(Math.random() * CHOICES.length)];

        $.ajax({
            url: "/game/judge",
            type: "POST",
            data: {player_choice : player_choice, opponent_choice: opponent_choice},
            dataType: "json",
            success: function(res) {
                const img_src = "../static/images/" + opponent_choice + "_opponent.png";
                opponent_img.src = img_src;
                result = res.result;
                result_display.innerHTML = result;
                // alert("The game result is "+ res.result);
                // window.location.href = "/dashboard";
            },
            error: function(res) {
                console.log("error");
            },
        })
    })  
}

go_back_btn.addEventListener("click", function(e) {
    e.preventDefault();

    $.ajax({
        url: "/game/refresh",
        type: "POST",
        data: {"a": "a"},
        dataType: "json",
        success: function(res) {
            // window.location.href = "/dashboard";
        },
        error: function(res) {
        },
        complete: function(data) {   
            window.location.href = "/dashboard";
        },
    })
});
