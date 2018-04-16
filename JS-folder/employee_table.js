$(document).ready(function(){
    $('#search_text').keyup(function(){
        var search = $(this).val();
        if(search != '')
        {
            $(".result").empty();
            load_data(search);
            $("#createbuttons").show();  
        }
        else
        {
            $(".result").empty();
            loadfulltable();
            $("#createbuttons").show();  			
        }
    });
    $('#managers').click(function(){
        $(".result").empty();
        $("#dates").hide();
        $("#createbuttons").show();
        $("#search_text").show();
        $("#moneysearch_text").hide();               
        loadfulltable();
    });
    loadfulltable();
    function loadfulltable(){
        var edit = document.getElementById('edit_modal');
        $.ajax({
        method: "GET",
        url: "PHP-folder/tables/employee_table/full_table.php",
        type: "json",
        success: function(data){
            var jsondata = JSON.parse(data);
            $("#createbuttons").show();  
            $("#yatable").append('<tr>'
                +'<th class="column" data-column="column1" data-label="Id">Id</th>'
                +'<th class="column" data-column="column2" data-label="Name">Name</th>'
                +'<th class="column" data-column="column3" data-label="Pin">Pin</th>'
                +'<th class="column" data-column="column4" data-label="Email">Email</th>'
                +'<th class="column" data-column="column5" data-label="Dept">Dept</th>'
                +'<th class="column" data-column="column6" data-label="Create Date">Create Date</th>'
                +'<th class="column" data-column="column7" data-label="Create By">Create By</th>'
                +'<th class="column" data-column="column8" data-label="Modify Date">Modify Date</th>'
                +'<th class="column" data-column="column9" data-label="Modify By">Modify By</th>'
                +'<th class="column" data-column="column10" data-label="Wage">Wage</th>'
                +'<th class="column" data-column="column11" data-label="OT Wage">OT Wage</th>'
                +'<th class="column" data-column="column12">Edit/Delete</th></tr>'
            );
            for(var x = 0; x < jsondata.length; x++){
                var idx = jsondata[x]['id'];
                var deletebutton = $('<button/>',
                    {
                        id: idx,
                        class: 'delete tablebtn',
                        text: 'Delete',
                        click: function() {
                            x = this.id; 
                            $.ajax({
                                type:"GET",
                                url:"PHP-folder/tables/employee_table/delete.php",
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
                        class: 'edit-user tablebtn',
                        text: 'Edit',
                        click: function() {
                            x = this.id;
                            $.ajax({
                                type: "GET",
                                url:"PHP-folder/tables/employee_table/edit/edit.php",
                                data:{id: x},
                                success:function(data1)
                                {
                                    var jsondata1 = JSON.parse(data1);
                                    for(var x = 0; x < jsondata.length; x++){
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
                            edit.style.display = "block";
                        }
                    });
                    var historybutton = $('<button/>',
                    {
                        id: idx,
                        class: 'history tablebtn',
                        text: 'History',
                        click: function() {
                            x = this.id;
                            $.ajax({
                                type: "GET",
                                url:"PHP-folder/tables/employee_table/history/history.php",
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
                            edit.style.display = "block";
                        }
                    });
                $(".result").append('<tr class="row100">'
                + '<td id="columnid" class="column" data-column="column1" data-label="Id">' + jsondata[x]['id'] + '</td>'
                + '<td id="columnname" class="column" data-column="column2" data-label="Name">' + jsondata[x]['name'] + '</td>'
                + '<td id="columnpin" class="column" data-column="column3" data-label="Pin">' + jsondata[x]['pin'] + '</td>'
                + '<td id="columnemail" class="column" data-column="column4" data-label="Email">' + jsondata[x]['email'] + '</td>'
                + '<td id="columndept" class="column" data-column="column5" data-label="Dept">' + jsondata[x]['dept'] + '</td>'
                + '<td id="columncreatedate" class="column" data-column="column6" data-label="Create Date">' + jsondata[x]['create_date'] + '</td>'
                + '<td id="columncreateby" class="column" data-column="column7" data-label="Create By">' + jsondata[x]['create_by'] + '</td>'
                + '<td id="columnlastmodifydate" class="column" data-column="column8" data-label="Modify Date">' + jsondata[x]['lastmodify_date'] + '</td>'
                + '<td id="columnlastmodifyby" class="column" data-column="column9" data-label="Modify By">' + jsondata[x]['lastmodify_by'] + '</td>'
                + '<td id="columnwage" class="column" data-column="column10" data-label="Wage">' + jsondata[x]['wage'] + '</td>'
                + '<td id="columnwageot" class="column" data-column="column11" data-label="OT Wage">' + jsondata[x]['wage_ot'] + '</td>'
                + '<td id="columndelete" class="column" data-column="column12" data-label="Delete"></td></tr>');
                $(".result").find('td').last().append(deletebutton).append(editbutton).append(historybutton);
            }        
        }
      });
    }

/*
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////Load search table//////////////////////////////
//////////////////////////////////////////////////////////////////////////////
*/
    function load_data(query){
        var edit = document.getElementById('edit_modal');
        $.ajax({
            url:"PHP-folder/tables/employee_table/search_table.php",
            method:"post",
            data:{query:query},
            success:function(data)
            {
                var jsondata = JSON.parse(data);
                $("#yatable").append('<tr>'
                    +'<th class="column" data-column="column1" data-label="Id">Id</th>'
                    +'<th class="column" data-column="column2" data-label="Name">Name</th>'
                    +'<th class="column" data-column="column3" data-label="Pin">Pin</th>'
                    +'<th class="column" data-column="column4" data-label="Email">Email</th>'
                    +'<th class="column" data-column="column5" data-label="Dept">Dept</th>'
                    +'<th class="column" data-column="column6" data-label="Create Date">Create Date</th>'
                    +'<th class="column" data-column="column7" data-label="Create By">Create By</th>'
                    +'<th class="column" data-column="column8" data-label="Modify Date">Modify Date</th>'
                    +'<th class="column" data-column="column9" data-label="Modify By">Modify By</th>'
                    +'<th class="column" data-column="column10" data-label="Wage">Wage</th>'
                    +'<th class="column" data-column="column11" data-label="OT Wage">OT Wage</th>'
                    +'<th class="column" data-column="column12">Edit/Delete</th></tr>'
                );
                for(var x = 0; x < jsondata.length; x++){
                    var idx = jsondata[x]['id'];
                    var deletebutton = $('<button/>',
                        {
                            id: idx,
                            class: 'delete tablebtn',
                            text: 'Delete',
                            click: function() { 
                                x = this.id;
                                $.ajax({
                                    type:"GET",
                                    url:"PHP-folder/tables/employee_table/delete.php",
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
                            class: 'edit-user tablebtn',
                            text: 'Edit',
                            click: function() {
                                x = this.id;
                                console.log(x);
                                $.ajax({
                                    type: "GET",
                                    url:"PHP-folder/tables/employee_table/edit/edit.php",
                                    data:{id: x},
                                    success:function(data1)
                                    {
                                        var jsondata1 = JSON.parse(data1);
                                        for(var x = 0; x < jsondata.length; x++){
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
                                edit.style.display = "block";
                            }
                        });
                        var historybutton = $('<button/>',
                        {
                            id: idx,
                            class: 'history tablebtn',
                            text: 'History',
                            click: function() {
                                x = this.id;
                                console.log(x);
                                $.ajax({
                                    type: "GET",
                                    url:"PHP-folder/tables/employee_table/history/history.php",
                                    data:{id: x},
                                    success:function(data2)
                                    {
                                        var jsondata2 = JSON.parse(data2);
                                        console.log(jsondata2)
                                        for(var x = 0; x < jsondata.length; x++){
                               
                                        }
                                    }
                                });
                                edit.style.display = "block";
                            }
                        });
                    $(".result").append('<tr class="row100">'
                        + '<td id="columnid" class="column" data-column="column1" data-label="Id">' + jsondata[x]['id'] + '</td>'
                        + '<td id="columnname" class="column" data-column="column2" data-label="Name">' + jsondata[x]['name'] + '</td>'
                        + '<td id="columnpin" class="column" data-column="column3" data-label="Pin">' + jsondata[x]['pin'] + '</td>'
                        + '<td id="columnemail" class="column" data-column="column4" data-label="Email">' + jsondata[x]['email'] + '</td>'
                        + '<td id="columndept" class="column" data-column="column5" data-label="Dept">' + jsondata[x]['dept'] + '</td>'
                        + '<td id="columncreatedate" class="column" data-column="column6" data-label="Create Date">' + jsondata[x]['create_date'] + '</td>'
                        + '<td id="columncreateby" class="column" data-column="column7" data-label="Create By">' + jsondata[x]['create_by'] + '</td>'
                        + '<td id="columnlastmodifydate" class="column" data-column="column8" data-label="Modify Date">' + jsondata[x]['lastmodify_date'] + '</td>'
                        + '<td id="columnlastmodifyby" class="column" data-column="column9" data-label="Modify By">' + jsondata[x]['lastmodify_by'] + '</td>'
                        + '<td id="columnwage" class="column" data-column="column10" data-label="Wage">' + jsondata[x]['wage'] + '</td>'
                        + '<td id="columnwageot" class="column" data-column="column11" data-label="OT Wage">' + jsondata[x]['wage_ot'] + '</td>'
                        + '<td id="columndelete" class="column" data-column="column12" data-label="Delete"></td></tr>');
                    $(".result").find('td').last().append(deletebutton).append(editbutton).append(historybutton);
                } 
            }
        });
    }
/*
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////calculate//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
*/
    function calculate(result_clockin){
        var result_time = []; var block = [];
        var name = result_clockin[0]['name']; var pin = result_clockin[0]['pin']; 
        var wage= result_clockin[0]['wage'];  var wage_ot= result_clockin[0]['wage_ot']; 
        var time_in; var time_out; var total_regular_time; var total_time_second = 0;
                                   var total_pay_regular;  var total_pay_over; var total_pay_date;
                                   var total_over_time;
        for(var i = 0; i < result_clockin.length; i++){
            var count = 0;
            var expect_status = 'in';
            for(var j = 0; j < result_clockin[i]['history'].length; j++){
                if(result_clockin[i]['history'][j]['status'] == expect_status){
                    switch(expect_status){
                        case 'in':
                            time_in = result_clockin[i]['history'][j]['time'];
                            expect_status ='out';
                            count++;
                            break;
                        case 'out':
                            time_out = result_clockin[i]['history'][j]['time'];
                            expect_status ='in';
                            count++;
                            break;
                    }
                    if(count == 2){
                        var startTime = moment(time_in, 'hh.mm');
                        var endTime = moment(time_out, 'hh.mm');

                        var totalSec = endTime.diff(startTime, 'seconds');
                        var result = moment().startOf('day').seconds(totalSec).format('H.mm');
                        total_time_second = total_time_second + totalSec;
                        count = 0;
                        block.push({
                            'status_in': 'in',
                            "time_in": time_in,
                            'status_out': 'out',
                            "time_out": time_out,
                            "time-block": result,
                        });
                    }
                }
            }
            if(total_time_second > 14400){
                total_overtime = 144000 - total_time_second;
            }
            else{
                total_overtime = 0
            }
            total_pay_regular = (wage/3600)*total_time_second;
            total_pay_over = (wage_ot/3600)*total_overtime;
            total_pay_date = total_pay_regular + total_pay_over;
            total_regular_time = moment().startOf('day').seconds(total_time_second).format('H.mm');
            total_over_time = moment().startOf('day').seconds(total_overtime).format('H.mm');
            result_time.push({
                'date': result_clockin[i]['date'],
                'blocks': block,
                'working_hour': total_regular_time,
                'overtime': total_over_time,
                "regular pay": total_pay_regular,
                "overtime pay": total_pay_over,
                'total pay': total_pay_date,

            });
            block = [];
        }
        console.log(result_time);
    }
});
