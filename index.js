$(function() {
    loademployeetable();
    loadmanagertable();
    loadreporttable();
    $("#reportspage").hide();
    //Search Employee Table Function
    $('#employeesearch').keyup(function(){
        var search = $(this).val();
        if(search != '')
        {
            $("#employeetablebody").empty();
            load_data(search);  
        }
        else
        {
            $("#employeetablebody").empty();
            loademployeetable(); 			
        }
    });// end Search Employee Table Function
    //Search Manager Table Function
    $('#managersearch').keyup(function(){
        var searchmanager = $(this).val();
        if(searchmanager != '')
        {
            $("#managertablebody").empty();
            load_managerdata(searchmanager);  
        }
        else
        {
            $("#managertablebody").empty();
            loadmanagertable(); 			
        }
    });// end Search Manager Table Function
    $("#overtimelimit").val(80);
    $("#payInt").on("change",function(){
        if($("#payInt").val() == "Weekly"){
            $("#overtimelimit").val(40);
        }
        else if($("#payInt").val() == "Bi-Weekly"){
            $("#overtimelimit").val(80);
        }
        else if($("#payInt").val() == "Monthly"){
            $("#overtimelimit").val(160);
        }
    });

    $('#datetimepicker1').datepicker({
      uiLibrary: 'bootstrap4',
      language: 'pt-BR'
    });

    $('#datetimepicker2').datepicker({
        uiLibrary: 'bootstrap4',
        language: 'pt-BR'
      });

    $('#datetimepicker3').datepicker({
        uiLibrary: 'bootstrap4',
        language: 'pt-BR'
      });
    $('#newclockdate').datepicker({
        uiLibrary: 'bootstrap4',
        language: 'pt-BR'
    });
    $('#newclocktime').timepicker({
        uiLibrary: 'bootstrap4',
        language: 'pt-BR',
    });
    $('#quickstart').datepicker({
        uiLibrary: 'bootstrap4',
        language: 'pt-BR',
    });
    $('#quickend').datepicker({
        uiLibrary: 'bootstrap4',
        language: 'pt-BR',
    });
    $("#reportcontainer").click(function(){
        $("#home-page-wrapper").hide();
        $("#reportspage").show();
    });
    
    $(".homepage").click(function(){
        $("#home-page-wrapper").show();
        $("#reportspage").hide();
    });
    //if a delete button is pressed
    $(".container-fluid").on("click", ".deleteemp", function() {
        //alert("Are you sure you want to delete this?");
        x = this.id; 
        $(this).parent().parent().remove();
        console.log(x);
        $.ajax({
            type:"GET",
            url:"/timeclock/timeclock/PHP-folder/tables/employee_table/delete.php",
            data:{id: x},
            success:function()
            {
                
            }
        });
     });

     $(".container-fluid").on("click", ".deleterecord", function() { 
        //alert("Are you sure you want to delete this?");
        x = this.id;
        $(this).parent().parent().remove();
        console.log(x);
        $.ajax({
            type:"GET",
            url:"/timeclock/timeclock/PHP-folder/tables/clockin_table/delete_money.php",
            data:{id: x},
            success:function()
            {
                
            }
        });
     });
     $(".container-fluid").on("click", ".edit", function() { 
        x = this.id;
        $.ajax({
            type: "GET",
            url:"/timeclock/timeclock/PHP-folder/tables/employee_table/edit/edit.php",
            data:{id: x},
            success:function(data1)
            {
                var jsondata1 = JSON.parse(data1);
                for(var x = 0; x < jsondata1.length; x++){
                    $("#idchange").val(jsondata1[x]['id']);
                    $("#namechange").val(jsondata1[x]['name']);
                    $("#pinchange").val(jsondata1[x]['pin']);
                    $("#emailchange").val(jsondata1[x]['email']);
                    $("#deptchange").val(jsondata1[x]['dept']);
                    $("#wagechange").val(jsondata1[x]['wage']);
                    $("#wage_otchange").val(jsondata1[x]['wage_ot']);
                }
            }
        });
        });
        $(".container-fluid").on("click", ".deletemanager", function() { 
            x = this.id;
            $(this).parent().parent().remove();
            $.ajax({
                type: "GET",
                url:"/timeclock/timeclock/PHP-folder/tables/manager_table/delete.php",
                data:{id: x},
                success:function(data1)
                {
                }
            });
            });
    });
//DEFAULT EMPLOYEE TABLE
function loademployeetable(){
    $.ajax({
    method: "GET",
    url: "/timeclock/timeclock/PHP-folder/tables/employee_table/full_table.php",
    type: "json",
    success: function(data){
        var jsondata = JSON.parse(data);
        for(var x = 0; x < jsondata.length; x++){
            var idx = jsondata[x]['id'];
                $("#employeetablebody").append('<tr>'
                + '<td class="col-md-2">' + jsondata[x]['name'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['pin'] + '</td>'
                + '<td class="col-md-3">' + jsondata[x]['email'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['dept'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['lastmodify_date'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['lastmodify_by'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['wage'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['wage_ot'] + '</td>'
                + '<td class="col-md-1"><Button class="btn-link deleteemp" id="' + idx + '">Delete</button><Button class="btn-link edit" data-toggle="modal" data-target="#editEmployee" id="' + idx + '">Edit</Button></td></tr>');
        }        
    }
  });
}// end DEFAULT EMPLOYEE TABLE

// EMPLOYEE SEARCH TABLE
function load_data(query){
    $.ajax({
    url: "/timeclock/timeclock/PHP-folder/tables/employee_table/search_table.php",
    method: "post",
    data:{query:query},
    success: function(data){
        var jsondata = JSON.parse(data); 
        for(var x = 0; x < jsondata.length; x++){
            var idx = jsondata[x]['id'];
            $("#employeetablebody").append('<tr>'
                + '<td class="col-md-2">' + jsondata[x]['name'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['pin'] + '</td>'
                + '<td class="col-md-3">' + jsondata[x]['email'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['dept'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['lastmodify_date'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['lastmodify_by'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['wage'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['wage_ot'] + '</td>'
                + '<td class="col-md-1"><Button class="deleteemp btn-link" id="' + idx + '">Delete</button><Button class="edit btn-link" data-toggle="modal" data-target="#editEmployee"  id="' + idx + '">Edit</button></td></tr>');
        }        
    }
  });
}// end EMPLOYEE SEARCH TABLE

// DEFAULT MANAGER TABLE
function loadmanagertable(){
    $.ajax({
    method: "GET",
    url: "/timeclock/timeclock/PHP-folder/tables/manager_table/full_table.php",
    type: "json",
    success: function(data){
        var jsondata = JSON.parse(data);
        for(var x = 0; x < jsondata.length; x++){
            var idx = jsondata[x]['id'];
            $("#managertablebody").append('<tr>'
            + '<td class="col-md-2">' + jsondata[x]['name'] + '</td>'
            + '<td class="col-md-3">' + jsondata[x]['email'] + '</td>'
            + '<td class="col-md-1">' + jsondata[x]['level'] + '</td>'
            + '<td class="col-md-1">' + jsondata[x]['create_date'] + '</td>'
            + '<td class="col-md-1">' + jsondata[x]['create_by'] + '</td>'
            + '<td class="col-md-1">' + jsondata[x]['lastmodify_date'] + '</td>'
            + '<td class="col-md-1">' + jsondata[x]['lastmodify_by'] + '</td>'
            + '<td class="col-md-1">' + jsondata[x]['expire_date'] + '</td>'
            + '<td class="col-md-1"><Button class="deletemanager btn-link" id="'+idx+'">Delete</button></td></tr>');
        }        
    }
  });
}// end DEFAULT MANAGER TABLE
// MANAGER SEARCH TABLE
function load_managerdata(query){
    $.ajax({
    url: "/timeclock/timeclock/PHP-folder/tables/manager_table/search_table.php",
    method: "post",
    data:{query:query},
    success: function(data){
        var jsondata = JSON.parse(data); 
        for(var x = 0; x < jsondata.length; x++){
            var idx = jsondata[x]['id'];
                $("#managertablebody").append('<tr>'
                + '<td class="col-md-2">' + jsondata[x]['name'] + '</td>'
                + '<td class="col-md-3">' + jsondata[x]['email'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['level'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['create_date'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['create_by'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['lastmodify_date'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['lastmodify_by'] + '</td>'
                + '<td class="col-md-1">' + jsondata[x]['expire_date'] + '</td>'
                + '<td class="col-md-1"> <Button class="deletemanager btn-link" id="'+idx+'"> Delete </button> </td> </tr>');
        }        
    }
  });
}// end MANAGER SEARCH TABLE
// DEFAULT REPORTS TABLE
function loadreporttable(){
    $.ajax({
        method: "GET",
        url: "/timeclock/timeclock/PHP-folder/tables/clockin_table/full_money_table.php",
        type: "json",
        success: function(data)
        {
            var jsondata = JSON.parse(data);
            console.log(jsondata);
            for(var x = 0; x < jsondata.length; x++){
                var idx = jsondata[x]['id'];
                $("#reporttablebody").append('<tr>'
                    + '<td class="col-md-4">' + jsondata[x]['status'] + '</td>'
                    + '<td class="col-md-4">' + jsondata[x]['punch_timestamp'] + '</td>'
                    + '<td class="col-md-4"><Button class="deleterecord btn-link" id="' + idx + '">Delete</button></td></tr>');
            }        
        }
    });
}// end DEFAULT REPORTS TABLE
function quicksearchReports(){
    var startdate = $('#quickstart').val();
    var enddate = $('#quickend').val();
    $("#reporttablebody").empty();
    $.ajax({
        method: "GET",
        url: "PHP-folder/tables/clockin_table/search_money_table.php",
        type: "json",
        data: {poststart: startdate, postend: enddate},
        success: function(data)
        {
            console.log(startdate);
            var jsondata2 = JSON.parse(data);
        for(var x = 0; x < jsondata2.length; x++){
            var idx = jsondata2[x]['id'];
            $("#reporttablebody").append('<tr>'
                + '<td class="col-md-4">' + jsondata2[x]['status'] + '</td>'
                + '<td class="col-md-4">' + jsondata2[x]['punch_timestamp'] + '</td>'
                + '<td class="col-md-4"><Button class="deleterecord btn-link" id="' + idx + '">Delete</button></td></tr>');
            }
        }
    });
}//end quicksearchreports function
