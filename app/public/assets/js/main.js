
$(function () {

    $("signin-btn").on("click", function (event) {
        event.preventDefault();
        signIn();
    })

    $("signup-btn").on("click", function (event) {
        event.preventDefault();
        signUp();
    })

    $("search").on("click", function (event) {
        event.preventDefault();

        if ($("#option").val()) {
            var thing = "/" + $("#option").val()
        } else if ($("#search").val()) {
            var thing = "/" + $("#search").val()
        } else {
            var thing = "";
        }

        $.get("/search" + thing, search, function () {
        }).then(function() {
            console.log("Search completed")
        })
    })

    $("#submitpostplaceholder").on("click", function () {
        var form = new FormData();
        form.append("image", $('#fileInput')[0].files[0])

        console.log(form)

        $.ajax({
            url: "https://api.imgur.com/3/upload",
            type: "POST",
            datatype: "json",
            headers: {
                "Authorization": "Client-ID 8bc6ab7f6927702"
            },
            data: form,
            success: function (response) {

                var postData = {
                    title: $("#title").val(),
                    body: $("#body").val(),
                    imgLink: response.data.link,
                    location: $("#location").val(),
                    season: $("#season").val()
                }

                $.post("/api/posts", postData).then(function () {
                    console.log("Post created")
                })
            },
            cache: false,
            contentType: false,
            processData: false
        });
    })

    function signIn() {
        window.location.href = "/signin";
    }

    function signUp() {
        window.location.href = "/signup";
    }

    function search(signup) {
        $.post("/signup", signup, function () {
            window.location.href = "/dashboard";
        });
    }

})