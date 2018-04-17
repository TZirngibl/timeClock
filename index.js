$(function() {
    $("#reportspage").hide();
    loademployeetable();
    loadmanagertable();
    loadreporttable();

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
            var deletebutton = $('<button/>',
                {
                    id: idx,
                    class: 'delete btn-link',
                    text: 'Delete',
                    click: function() {
                        x = this.id; 
                        $.ajax({
                            type:"GET",
                            url:"/timeclock/timeclock/PHP-folder/tables/employee_table/delete.php",
                            data:{id: x},
                            success:function()
                            {
                                
                            }
                        });
                        $(this).parent().parent().remove();
                    }
                });
                var editbutton = $('<button/>',
                {
                    
                    id: idx,
                    class: 'btn-link',
                    text: 'Edit',
                    'data-toggle': 'modal',
                    'data-target': '#editEmployee',
                    click: function() {
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
                        })
                    }
                });
                /*var historybutton = $('<button/>',
                {
                    id: idx,
                    class: 'btn-primary',
                    text: 'History',
                    click: function() {
                        x = this.id;
                        $.ajax({
                            type: "GET",
                            url:"/timeclock/timeclock/PHP-folder/tables/employee_table/history/history.php",
                            data:{id: x},
                            success:function(data2)
                            {
                                var jsondata2 = JSON.parse(data2);
                                console.log(jsondata2);
                                var current_date = jsondata2[0]['date'];
                                var clockin_history = [];
                                var index = 0;
                                var result = [];
                                var result_index = 0;
                                for(var x = 0; x < jsondata2.length; x++){
                                    while(jsondata2[x]['date'] == current_date){
                                        clockin_history.push({
                                            'status': jsondata2[x]['status'],
                                            'time': jsondata2[x]['time']
                                        });
                                        x++;
                                        if(x >= jsondata2.length){
                                            break;
                                        }
                                    }
                                    result.push({
                                        'pin': jsondata2[0]['pin'],
                                        'name': jsondata2[0]['name'],
                                        'wage': jsondata2[0]['wage'],
                                        'wage_ot': jsondata2[0]['wage_ot'],
                                        'date': current_date,
                                        'history': clockin_history
                                    })
                                    console.log(jsondata2[0]['wage']);
                                    clockin_history = [];
                                    if(x < jsondata2.length){
                                        current_date = jsondata2[x]['date'];
                                    }
                                    index = 0;
                                    x--;
                                }
                                console.log(result);
                                calculate(result);
                            }
                        })
                    }
                });*/
                $("#employeetablebody").append('<tr>'
                + '<td>' + jsondata[x]['name'] + '</td>'
                + '<td>' + jsondata[x]['pin'] + '</td>'
                + '<td>' + jsondata[x]['email'] + '</td>'
                + '<td>' + jsondata[x]['dept'] + '</td>'
                + '<td>' + jsondata[x]['create_date'] + '</td>'
                + '<td>' + jsondata[x]['create_by'] + '</td>'
                + '<td>' + jsondata[x]['lastmodify_date'] + '</td>'
                + '<td>' + jsondata[x]['lastmodify_by'] + '</td>'
                + '<td>' + jsondata[x]['wage'] + '</td>'
                + '<td>' + jsondata[x]['wage_ot'] + '</td>'
                + '<td></td></tr>');                                                               //.append(historybutton)
                $("#employeetablebody").find('td').last().append(deletebutton).append(editbutton);
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
            var deletebutton = $('<button/>',
                {
                    id: idx,
                    class: 'delete btn-link',
                    text: 'Delete',
                    click: function() {
                        x = this.id; 
                        $.ajax({
                            type:"GET",
                            url:"/timeclock/timeclock/PHP-folder/tables/employee_table/delete.php",
                            data:{id: x},
                            success:function()
                            {
                                
                            }
                        });
                        $(this).parent().parent().remove();
                    }
                });
                var editbutton = $('<button/>',
                {
                    
                    id: idx,
                    class: 'btn-link',
                    text: 'Edit',
                    'data-toggle': 'modal',
                    'data-target': '#editEmployee',
                    click: function() {
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
                        })
                    }
                });
                /*var historybutton = $('<button/>',
                {
                    id: idx,
                    class: 'btn-primary',
                    text: 'History',
                    click: function() {
                        x = this.id;
                        $.ajax({
                            type: "GET",
                            url:"/timeclock/timeclock/PHP-folder/tables/employee_table/history/history.php",
                            data:{id: x},
                            success:function(data2)
                            {
                                var jsondata2 = JSON.parse(data2);
                                console.log(jsondata2);
                                var current_date = jsondata2[0]['date'];
                                var clockin_history = [];
                                var index = 0;
                                var result = [];
                                var result_index = 0;
                                for(var x = 0; x < jsondata2.length; x++){
                                    while(jsondata2[x]['date'] == current_date){
                                        clockin_history.push({
                                            'status': jsondata2[x]['status'],
                                            'time': jsondata2[x]['time']
                                        });
                                        x++;
                                        if(x >= jsondata2.length){
                                            break;
                                        }
                                    }
                                    result.push({
                                        'pin': jsondata2[0]['pin'],
                                        'name': jsondata2[0]['name'],
                                        'wage': jsondata2[0]['wage'],
                                        'wage_ot': jsondata2[0]['wage_ot'],
                                        'date': current_date,
                                        'history': clockin_history
                                    })
                                    console.log(jsondata2[0]['wage']);
                                    clockin_history = [];
                                    if(x < jsondata2.length){
                                        current_date = jsondata2[x]['date'];
                                    }
                                    index = 0;
                                    x--;
                                }
                                console.log(result);
                                calculate(result);
                            }
                        })
                    }
                });*/
                $("#employeetablebody").append('<tr>'
                + '<td>' + jsondata[x]['name'] + '</td>'
                + '<td>' + jsondata[x]['pin'] + '</td>'
                + '<td>' + jsondata[x]['email'] + '</td>'
                + '<td>' + jsondata[x]['dept'] + '</td>'
                + '<td>' + jsondata[x]['create_date'] + '</td>'
                + '<td>' + jsondata[x]['create_by'] + '</td>'
                + '<td>' + jsondata[x]['lastmodify_date'] + '</td>'
                + '<td>' + jsondata[x]['lastmodify_by'] + '</td>'
                + '<td>' + jsondata[x]['wage'] + '</td>'
                + '<td>' + jsondata[x]['wage_ot'] + '</td>'
                + '<td></td></tr>');
                $("#employeetablebody").find('td').last().append(deletebutton).append(editbutton);//.append(historybutton);
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
            var deletebutton = $('<button/>',
                {
                    id: idx,
                    class: 'delete btn-link',
                    text: 'Delete',
                    click: function() {
                        x = this.id; 
                        $.ajax({
                            type:"GET",
                            url:"/timeclock/timeclock/PHP-folder/tables/manager_table/delete.php",
                            data:{id: x},
                            success:function()
                            {
                                
                            }
                        });
                        $(this).parent().parent().remove();
                    }
                });
                $("#managertablebody").append('<tr>'
                + '<td>' + jsondata[x]['name'] + '</td>'
                + '<td>' + jsondata[x]['email'] + '</td>'
                + '<td>' + jsondata[x]['level'] + '</td>'
                + '<td>' + jsondata[x]['create_date'] + '</td>'
                + '<td>' + jsondata[x]['create_by'] + '</td>'
                + '<td>' + jsondata[x]['lastmodify_date'] + '</td>'
                + '<td>' + jsondata[x]['lastmodify_by'] + '</td>'
                + '<td>' + jsondata[x]['expire_date'] + '</td>'
                + '<td></td></tr>');
                $("#managertablebody").find('td').last().append(deletebutton);
        }        
    }
  });
}// end DEFAULT MANAGER TABLE
// EMPLOYEE SEARCH TABLE
function load_managerdata(query){
    $.ajax({
    url: "/timeclock/timeclock/PHP-folder/tables/manager_table/search_table.php",
    method: "post",
    data:{query:query},
    success: function(data){
        var jsondata = JSON.parse(data); 
        for(var x = 0; x < jsondata.length; x++){
            var idx = jsondata[x]['id'];
            var deletebutton = $('<button/>',
                {
                    id: idx,
                    class: 'delete btn-link',
                    text: 'Delete',
                    click: function() {
                        x = this.id; 
                        $.ajax({
                            type:"GET",
                            url:"/timeclock/timeclock/PHP-folder/tables/manager_table/delete.php",
                            data:{id: x},
                            success:function()
                            {
                                $(this).parent().parent().remove();
                            }
                        });
                    }
                });
                $("#managertablebody").append('<tr>'
                + '<td>' + jsondata[x]['name'] + '</td>'
                + '<td>' + jsondata[x]['email'] + '</td>'
                + '<td>' + jsondata[x]['level'] + '</td>'
                + '<td>' + jsondata[x]['create_date'] + '</td>'
                + '<td>' + jsondata[x]['create_by'] + '</td>'
                + '<td>' + jsondata[x]['lastmodify_date'] + '</td>'
                + '<td>' + jsondata[x]['lastmodify_by'] + '</td>'
                + '<td>' + jsondata[x]['expire_date'] + '</td>'
                + '<td></td></tr>');
                $("#managertablebody").find('td').last().append(deletebutton);
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
                var test = $('<button/>',
                    {
                        id: idx,
                        class: 'btn-link',
                        text: 'Delete',
                        click: function() { 
                            x = this.id;
                            console.log(x);
                            $.ajax({
                                type:"GET",
                                url:"/timeclock/timeclock/PHP-folder/tables/clockin_table/delete_money.php",
                                data:{id: x},
                                success:function()
                                {
                                    
                                }
                                
                        });
                        $(this).parent().parent().remove();
                        }

                    });
                    $("#reporttablebody").append('<tr>'
                    + '<td>' + jsondata[x]['status'] + '</td>'
                    + '<td>' + jsondata[x]['punch_timestamp'] + '</td>'
                    + '<td></td></tr>');
                    $("#reporttablebody").find('td').last().append(test);
            }        
        }
    });// end DEFAULT REPORTS TABLE

}
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
            //console.log(jsondata2);
        for(var x = 0; x < jsondata2.length; x++){
            var idx = jsondata2[x]['id'];
            var test = $('<button/>',
                {
                    id: idx,
                    class: 'btn-link',
                    text: 'Delete',
                    click: function() { 
                        x = this.id;   
                        $.ajax({
                            type:"GET",
                            url:"PHP-folder/tables/clockin_table/delete_money.php",
                            data:{id: x},
                            success:function()
                            {
                                $(this).parent().parent().remove();
                            }
                        });
                    }
                });
                $("#reporttablebody").append('<tr class="row100">'
                + '<td>' + jsondata2[x]['status'] + '</td>'
                + '<td>' + jsondata2[x]['punch_timestamp'] + '</td>'
                + '<td></td></tr>');
                $("#reporttablebody").find('td').last().append(test);
            }
        }
    });
}
