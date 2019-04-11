$(function(){
    $("signin-btn").on("click", function (event){
        event.preventDefault();
        signIn();
    })
    $("signup-btn").on("click", function (event){
        event.preventDefault();
        signUp();
    })
    $("search").on("click", function(event){
        event.preventDefault();
        $.get("/search",search, function(){
            var option = $("#option").val()
            var search = $("#search").val()
        })
    })
    function signIn (){
        window.location.href = "/signin";
    }
    function signUp (){
        window.location.href = "/signup";
    }
    function search(signup) {
        $.post("/signup", signup, function() {
          window.location.href = "/dashboard";
        });
    }
    
})