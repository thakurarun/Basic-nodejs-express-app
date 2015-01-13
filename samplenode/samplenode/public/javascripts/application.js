$(document).ready(function(){
    $(":text").textClear();
});
$(document).on('click','#registerBtn', function(event){
    var form =  $(event.target).parents("form:eq(0)");
    var userDetails = {};
    userDetails.fname = form[0].fname.value;
    userDetails.lname = form[0].lname.value;
    userDetails.email = form[0].email.value;
    $.post('/postuser',JSON.stringify(userDetails),function(res){
        if(res.success)
        {
            alert(res.message)
        }
    });
});
