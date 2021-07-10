const API_SERVER_ADDR = "http://localhost:8088";
function loadUserList(){
    console.log("entering loadUserList()");

    $.ajax({
        method:"GET",
        url: API_SERVER_ADDR + "/users",
        // statusCode: {
        //     404: function() {
        //         console.log( "page not found" );
        //     },
        //     500: function () {
        //         console.log("internal error")
        //     }
        // }
    }).done(function(data) {
        console.log("user list:" + data);
        data.forEach(user => {
            $("#tbody_userlist").append("<tr>"
                + "<td>" + user.userId + "</td>"
                + "<td>" + user.name + "</td>"
                + "<td>" + user.age + "</td>"
                + "<td>" + user.membership + "</td>"
                + "<td><a href='javascript:void(0)' id='editUserButton_" + user.userId + "'>Edit</a></td>"
                + "<td><a href='javascript:void(0)' id='deleteUserButton_" + user.userId + "'>Delete</a></td>"
                + "tr>");
            $("#editUserButton_" + user.userId).click(function (){
                showEditUserForm(user.userId);
            });
            $("#deleteUserButton_" + user.userId).click(function (){
                showDeleteUserForm(user.userId);
            });

        })

    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("textStatus:" + textStatus + " errorThrown:" + errorThrown);

    }).always(function(){
        console.log("complete")
    });
}

function showEditUserForm(userId){
    alert("entering showEditUserForm() userId:" + userId);
    window.sessionStorage.setItem("userId", userId);
    window.location.href = API_SERVER_ADDR + "/public/user/user_edit.html"
}

function showDeleteUserForm(userId){
    alert("entering showDeleteUserForm() userId:" + userId);
    window.sessionStorage.setItem("userId", userId);
    window.location.href = API_SERVER_ADDR + "/public/user/user_delete.html"
}
