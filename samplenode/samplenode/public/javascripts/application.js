$(document).ready(function(){
    $(":text").textClear();
    pageCounter = 0;
    pageCounter = 0;
    totalRecords= 0;
    refreshCustomerList();
});
$(document).on('click','#registerBtn', function(event){
    var form =  $(event.target).parents("form:eq(0)");
    var userDetails = {};
    userDetails.fname = form[0].fname.value;
    userDetails.lname = form[0].lname.value;
    userDetails.email = form[0].email.value;
    $.post('/postuser',userDetails,function(res){
        if(res.success)
        {
            refreshCustomerList();
        }
    });
});

function refreshCustomerList()
{    
    $.get('/listcustomer?p='+pageCounter,function(response){
        var template = '<table class="table table-striped">';
        var h ='';
        if(response.data.length == 0)
            return 0;
        response.data.forEach(function(i,e){ 
            h += '<tr><td>'+i.fname+'</td><td>'+i.lname+'</td><td>'+i.email+'</td><td></tr>'
        });
        template = template + h + '</table>';
        $('div.list').html(template);
        $('div.list').append("Total: " +response.count)
        totalRecords = response.count;
    });
}
$(document).on('click','input.pre',function(ev){
    pageCounter--;
    if(pageCounter < 0)
    {
        pageCounter = 0;
    }
    refreshCustomerList();
});
$(document).on('click','input.next',function(ev){
    pageCounter++;
    var totalPages = Math.ceil(totalRecords/10);
    if(pageCounter >= totalPages)
        pageCounter = totalPages - 1;
    if(pageCounter < 0)
        pageCounter = 0;
    
    refreshCustomerList();
});