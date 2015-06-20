$(document).ready(function () {
    $(":text").textClear();
    pageCounter = 0;
    pageCounter = 0;
    totalRecords= 0;
    refreshCustomerList();
});
$(document).on('click','#registerBtn', function(event){
    var form =  $(event.target).parents("form:eq(0)");
    var userDetails = {};
    if(form[0].cid.value != '') //update
    {
        userDetails.cid = form[0].cid.value;
    }
    userDetails.fname = form[0].fname.value;
    userDetails.lname = form[0].lname.value;
    userDetails.email = form[0].email.value;
    $.post('/api/postuser',userDetails,function(res){
        if(res.success)
        {
            refreshCustomerList();
        }
    });
    ResetForm();
});
function ResetForm()
{
    var myForm = $("#customerForm:eq(0)")[0];
    myForm.fname.value = '';
    myForm.lname.value = '';
    myForm.email.value = '';
    myForm.cid.value = '';
}
function refreshCustomerList()
{    
    $.get('/api/listcustomer?p='+pageCounter,function(response){
        var template = '<table class="table table-striped">';
        var h ='';
        if(response.data.length == 0)
            return 0;
        response.data.forEach(function(i,e){ 
            h += '<tr><td>'+i.fname+'</td><td>'+i.lname+'</td><td>'+i.email+'</td><td><td><button class="btn btn-lg btn-primary edit-customer" type="button" data-cid='+i._id+'>Edit</button><button class="btn btn-lg btn-danger remove-customer" type="button" data-cid='+i._id+'>Remove</button></td></tr>'
        });
        template = template + h + '</table>';
        $('div.list').html(template);
        totalRecords = response.count;
        $("#pageNumber").val(pageCounter * 1)
        $('#TotalRecords').html("Total:"+totalRecords)
    });
}
$(document).on("click",'.edit-customer',function(ev){
    ev.stopPropagation();
    var id = this.getAttribute('data-cid')
    $.get('/api/getsingle?id='+id,function(response){
        if(response.count == 1) //valid data, method should return only one record per request.
        {
            FillForm(response.data[0])
        }
    })
});

function FillForm(data){
    var myForm = $("#customerForm:eq(0)")[0];
    myForm.fname.value = data.fname;
    myForm.lname.value = data.lname;
    myForm.email.value = data.email;
    myForm.cid.value = data._id;
}

$(document).on("click",'.remove-customer',function(ev){
    ev.stopPropagation();
    var id = this.getAttribute('data-cid')
    $.get('/api/deletesingle?id='+id,function(response){
        refreshCustomerList();
    })
});


$(document).on('click','a.pre',function(ev){
    ev.preventDefault();
    pageCounter--;
    if(pageCounter < 0)
    {
        pageCounter = 0;
    }
    refreshCustomerList();
});
$(document).on('click','a.next',function(ev){
    ev.preventDefault();
    pageCounter++;
    var totalPages = Math.ceil(totalRecords/10);
    if(pageCounter >= totalPages)
        pageCounter = totalPages - 1;
    if(pageCounter < 0)
        pageCounter = 0;
    refreshCustomerList();
});
$(document).on("click","#goToPage",function(ev){
    ev.preventDefault();
    pageCounter = $.trim($("#pageNumber").val());
    refreshCustomerList();
});
$(document).on("click","input#FindCustomer",function(ev){
    var valueToSearch = $.trim($("#searchText").val());
    var whereToSearch = $("#searchDdl").val();
    var filter ={ "column" : whereToSearch,"value": valueToSearch}
    FindCustomerBasedOnCriteria(filter)
});
function FindCustomerBasedOnCriteria(filter)
{    
    pageCounter = 0;
    $.post('/api/findcustomers?p='+pageCounter,filter,function(response){
        var template = '<table class="table table-striped">';
        var h ='';
        if(response.data.length == 0)
            return 0;
        response.data.forEach(function(i,e){ 
            h += '<tr><td>'+i.fname+'</td><td>'+i.lname+'</td><td>'+i.email+'</td><td><td><button class="btn btn-lg btn-primary edit-customer" type="button" data-cid='+i._id+'>Edit</button><button class="btn btn-lg btn-danger remove-customer" type="button" data-cid='+i._id+'>Remove</button></td></tr>'
        });
        template = template + h + '</table>';
        $('div.list').html(template);
        totalRecords = response.count;
        $("#pageNumber").val(pageCounter * 1)
        $('#TotalRecords').html("Total:"+totalRecords)
    });
}
