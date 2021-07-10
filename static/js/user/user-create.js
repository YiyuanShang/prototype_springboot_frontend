const API_SERVER_ADDR = "http://localhost:8088";
function addUser(){
    console.log("entering addUser()");
    var name = $("#name").val();
    var age = $("#age").val();
    var membership = $("input[name='membership']:checked").val();

    var obj = {
        name : name,
        age : age,
        membership : membership
    };

    var param = JSON.stringify(obj);
    console.log("user json:" + param);
    alert("user json:" + param);

    $.ajax({
        method: "POST",
        url: API_SERVER_ADDR + "/users",
        data: param,
        contentType: "application/json",
        async   :	false,

        statusCode: {
            201: function (){
                alert("Create succeeded!");
                setTimeout(function(){
                    window.location.href = API_SERVER_ADDR + "/public/user/user_list.html"; }, 2000);
            },
            404: function() {
                console.log( "page not found" );
            },
            500: function () {
                console.log("internal error")
            }
        }
    }).done(function (data){
        console.log("returned data:" + Object.entries(data));
        alert("Create succeeded!");
        setTimeout(function(){
            alert("Backing to user list");
            window.location.href = API_SERVER_ADDR + "/public/user/user_list.html"; }, 2000);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("textStatus:" + textStatus + " errorThrown:" + errorThrown);
        // get custom error message from response text
        alert(jqXHR.responseText + "! Create failed!");
    }).always(function(){
        console.log("Create complete")
    });
}