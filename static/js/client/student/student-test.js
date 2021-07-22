function filterSearch(){

    var student = {
        stuId : 1,
        isMember : true
    }
    var param = JSON.stringify(student);
    console.log("param=" + param);
    $.ajax({
        url: "http://localhost:8080/students/filterStr",
        data: param,


    }).done(function( data ) {
        console.log(data);
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        console.log(textStatus);
    }).always(function (){
        console.log("complete");
    })
}