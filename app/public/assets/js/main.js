
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
        $.get("/search", search, function () {
            var option = $("#option").val()
            var search = $("#search").val()
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
                console.log(response);
                var photo = response.data.link;
                var photo_hash = response.data.deletehash;
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