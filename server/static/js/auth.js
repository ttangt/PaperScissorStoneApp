$("a[name=card_toggle]").click(function(e) {
    e.preventDefault();

    var $form = $(this).parent();

    if ($form.attr("name") == "login_form") {
        var $card = $("div[name=login_card]");
        var $another_card = $("div[name=signup_card]"); 
    } else {
        var $card = $("div[name=signup_card]");
    var $another_card = $("div[name=login_card]");
    }

    // var $card = $("div[name=login_card]");
    // var $another_card = $("div[name=signup_card]");

    console.log("HERE");
    $card.addClass("error--hidden");
    $another_card.removeClass("error--hidden");
})

$("form[name=signup_form]").submit(function(e) {
    e.preventDefault();

    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();

    $.ajax({
        url: "/user/signup",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(res) {
            window.location.href = "/dashboard";
        },
        error: function(res) {
            $error.text(res.responseJSON.error).removeClass("error--hidden");
        }
    })
})

$("form[name=login_form]").submit(function(e) {
    e.preventDefault();

    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();

    $.ajax({
        url: "/user/login",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(res) {
            window.location.href = "/dashboard";
        },
        error: function(res) {
            $error.text(res.responseJSON.error).removeClass("error--hidden");
        }
    })
})