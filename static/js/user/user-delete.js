const API_SERVER_ADDR = "http://localhost:8088";
function loadUserInfo(){
    var userId = window.sessionStorage.getItem("userId");
    console.log("get userId:" + userId);

    //load user information
    $.ajax({
        method: "GET",
        url: API_SERVER_ADDR + "/users/" + userId,
        statusCode: {
            404: function() {
                console.log( "page not found" );
            },
            500: function () {
                console.log("internal error")
            }
        }
    }).done(function (data){
        console.log("user:" + Object.entries(data));
        $("#userId").val(data.userId);
        $("#name").val(data.name);
        $("#age").val(data.age);
        $("input[name='membership'][value='" + data.membership + "']").attr("checked", true);

    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("textStatus:" + textStatus + " errorThrown:" + errorThrown);
    }).always(function(){
        console.log("complete")
    });

}

function deleteUser(){
    console.log("entering deleteUser()");
    var userId = $("#userId").val();
    var name = $("#name").val();
    var age = $("#age").val();
    var membership = $("input[name='membership']:checked").val();

    var obj = {
        userId : userId,
        name : name,
        age : age,
        membership : membership
    };

    var param = JSON.stringify(obj);
    console.log("user json:" + param);
    alert("user json:" + param);

    $.ajax({
        method:"DELETE",
        url: API_SERVER_ADDR + "/users",
        data: param,
        contentType: "application/json",
        async: false,
        statusCode: {
            200: function (){
                alert("Delete succeeded!");
                window.sessionStorage.removeItem("userId");
                setTimeout(function(){
                    window.location.href = API_SERVER_ADDR + "/public/user/user_list.html";
                    return false;}, 2000);
            },
            404: function() {
                console.log( "page not found" );
            },
            500: function () {
                console.log("internal error")
            }
        }
    }).done(function(data) {
        console.log("returned data:" + data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("textStatus:" + textStatus + " errorThrown:" + errorThrown);
    }).always(function(){
        console.log("update complete");
    });
}
