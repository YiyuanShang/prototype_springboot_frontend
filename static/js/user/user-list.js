function loadUserList(){
    console.log("entering loadUserList()");

    $.ajax({
        url: "http://localhost:8080/users"
    }).then(function(data) {
        console.log(data);
    });
}