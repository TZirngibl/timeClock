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

    //REPORT GENERATOR
    //Make default as bi-weekly type
    $("#payInt").val("Bi-Weekly");
    var id; 
    var startdate;
    //when the button with the id #generate_btn clicked it will collect the start date and the report type 
    $(".modal-content").on("click", "#generate_btn",function(){
        var overtime_type = $("#payInt").val();
        id = $("#pin_generate").val();
        startdate = $("#datetimepicker1").val();
        //--Ajax call report.php to get the array with the clockin history--//
        $.ajax({
            method: "GET",
            type: "json",
            url:"PHP-folder/report/report.php",
            data:{
                type: overtime_type, // type of report 
                id: id, // id of the employee
                startdate: startdate // start date
            },
            // return back the array with all the information of the employee/employees(if id is emplty)
            // including the clockin history
            success:function(data)
            {
                var result = [];
                var jsondata2 = JSON.parse(data); // conver json file to array
                console.log(jsondata2);
                //start the loop with all the employees 
                for(var y = 0; y < jsondata2.length; y++){ 
                    var pass_arr =[];
                    var clockin_history = [];
                    var history = [];
                    //set current date as a first date the employee clock-in
                    var current_date = jsondata2[y]['history'][0]['date'];
                    //start the loop the with all the clock-in date the employees made  
                    for(var x = 0; x < jsondata2[y]['history'].length; x++){
                        // if the next date on the array still the same date add the status and time in the same index
                        // to the array called clockin_history
                        // the loop going to do this until the next day
                        while(jsondata2[y]['history'][x]['date'] == current_date){
                            clockin_history.push({
                                'status': jsondata2[y]['history'][x]['status'],
                                'time': jsondata2[y]['history'][x]['time']
                            });
                            x++;
                            if(x >= jsondata2[y]['history'].length){
                                break;
                            }
                        }
                        //before going to the next day the code will push all the clock-in history to an array 
                        // the code also lable the array with the date
                        history.push({
                            'date': current_date,
                            'history': clockin_history
                        });
                        clockin_history = [];
                        if(x < jsondata2[y]['history'].length){
                            //update the current_date to the next date
                            current_date = jsondata2[y]['history'][x]['date'];
                        }
                        x--;
                    }
                    //finally push everything to the result array 
                    result.push({
                        'start_date' : jsondata2[y]['start_date'],
                        'end_date' : jsondata2[y]['end_date'],
                        'id': jsondata2[y]['id'],
                        'dept' : jsondata2[y]['dept'],
                        'pin': jsondata2[y]['pin'],
                        'name': jsondata2[y]['name'],
                        'wage': jsondata2[y]['wage'],
                        'wage_ot': jsondata2[y]['wage_ot'],
                        'type': jsondata2[y]['type'],
                        'history': history
                    });
                }
                //pass the array to calculation method
                calculation(result);
            }
        });
    });
    //Caculation Method will calculate the total working-time after eveytime the employee clockin and clockout
    function calculation(result_clockin){
        //varify some variables
        var result_time = []; 
        var block = []; 
        var final = [];
        var name = result_clockin[0]['name'];     
        var pin = result_clockin[0]['pin']; 
        var pay_type= result_clockin[0]['type']; 
        var time_in; 
        var time_out; 
        var total_regular_time; 
        //start the loop for each of employee                   
        for(var a = 0; a < result_clockin.length; a++){
            var total_time_second = 0;
            // start loop for each day
            for(var b = 0; b < result_clockin[a]['history'].length; b++){
                var total_time_date = 0;
                var count = 0;
                //all the employees should clock-in when the day start 
                //so the expect status is "in"
                var expect_status = 'in';
                for(var c = 0; c < result_clockin[a]['history'][b]['history'].length; c++){
                    // if the current the status 
                    if(result_clockin[a]['history'][b]['history'][c]['status'] == expect_status){
                        switch(expect_status){
                            case 'in':
                                time_in = result_clockin[a]['history'][b]['history'][c]['time'];
                                expect_status ='out';
                                count++;
                                break;
                            case 'out':
                                time_out = result_clockin[a]['history'][b]['history'][c]['time'];
                                expect_status ='in';
                                count++;
                                break;
                        }
                    }   
                    else{
                        count = 1;
                        switch(expect_status){
                            case 'in':
                                time_in = result_clockin[a]['history'][b]['history'][c]['time'];
                                block.push({
                                    'status_in': 'in',
                                    "time_in": time_in,
                                    'status_out': "empty",
                                    "time_out": "empty",
                                    "time-block": 0,
                                });
                                break;
                            case 'out':
                                time_out = result_clockin[a]['history'][b]['history'][c]['time'];
                                block.push({
                                    'status_in': "empty",
                                    "time_in": "empty",
                                    'status_out': 'out',
                                    "time_out": time_out,
                                    "time-block": 0,
                                });
                                break;
                        }
                    }
                    if(count == 2){
                        var startTime = moment(time_in, 'hh.mm');
                        var endTime = moment(time_out, 'hh.mm');

                        var totalSec = endTime.diff(startTime, 'seconds');
                        var result = moment().startOf('day').seconds(totalSec).format('H.mm');
                        total_time_second = total_time_second + totalSec;
                        total_time_date = total_time_date + totalSec;
                        count = 0;
                        block.push({
                            'status_in': 'in',
                            "time_in": time_in,
                            'status_out': 'out',
                            "time_out": time_out,
                            "time-block": result,
                        });
                        break;
                    }
                }
                //finish punch time for one day
                ////////////////////////////////
                total_regular_time = moment().startOf('day').seconds(total_time_date).format('H.mm');
                result_time.push({
                    'date': result_clockin[a]['history'][b]['date'],
                    'blocks': block,
                    'working_hour': total_regular_time,
                    'calculate': total_time_date
                });
                block = [];
            }//finish all days report
            /////////////////////////
            final.push({
                'start_date' : result_clockin[a]['start_date'],
                'end_date' : result_clockin[a]['end_date'],
                'id': result_clockin[a]['id'],
                'pin': result_clockin[a]['pin'],
                'dept': result_clockin[a]['dept'],
                'name': result_clockin[a]['name'],
                'type': result_clockin[a]['type'],
                'wage': result_clockin[a]['wage'],
                'wage_ot': result_clockin[a]['wage_ot'],
                'history': result_time ,
            });
            result_time = [];
        }//finish report of one person
        //////////////////////////////
        create(final);
    }
    //////////////////create pdf file////////////////////////
    ////////////////////////////////////////////////////////
    function create(print){
        var doc = new jsPDF();
        doc.setFontSize(8);
        var weekDay;
        console.log(print);
        for(var i = 0; i <print.length; i++)
        {
            var first_day = print[i]['start_date'];
            var myfirst_day = moment(first_day).format('YYYY-MM-DD');
            var check_first = moment(first_day)
            var mylast_day = moment(first_day, 'YYYY-MM-DD').add(6, 'days').format('YYYY-MM-DD');
            var check_last = moment(first_day, 'YYYY-MM-DD').add(6, 'days')
            var con =moment(check_first).format('YYYY-MM-DD');
            var con2 = moment(check_last).format('YYYY-MM-DD');
            var week_total = 0;
            var week_overtime = 0;
            var total_hours = 0;
            //INSERT CURRENT TIMESTAMP HERE

            doc.setLineWidth(0.5);
            doc.line(10, 8, 200, 8);
            doc.setFontSize(12);
            var type = print[i]['type'];
            var start_date = print[i]['start_date'];
            var end_date = print[i]['end_date'];
            var range = type + " Report: " + "from      " +  start_date + "     to      " + end_date; 

            //TIME CARD DATE RANGE HERE
            doc.text(25, 13, range);

            doc.setLineWidth(1);
            doc.line(10, 15, 200, 15);
            doc.setLineWidth(.25);
            doc.line(10, 17, 200, 17);

            var public_info = " Name: " + print[i]['name'] + "   ID: " + print[i]['id'] + "   DEPT: " + print[i]['dept'];
            doc.setFontSize(12);
            //NAME, ID, PIN, DEPT, Default
            doc.text(10, 21, public_info);

            var private_info = "Wage:       Reg  " + print[i]['wage'] + "         OT:  " + print[i]['wage_ot'];
            //Wages, Regular total, OT Total
            doc.text(125, 21, private_info);

            doc.setLineWidth(0.5);
            doc.line(10, 24, 200, 24);
            var week_range = print[i]['name']+ "        Week From:      " + con + "     To       " + con2;
            doc.text(25, 29, week_range);;
            doc.line(10, 31, 200, 31);

            doc.line(10, 24, 10, 295);
            doc.line(10, 288, 200, 288);
            var week_range = print[i]['name']+ "        End Week From:      " + con + "     To       " + con2;
            doc.text(25, 293, week_range);;
            doc.line(10, 295, 200, 295);
            doc.line(200, 24, 200, 295);

            var date_y = 35;
            doc.setLineWidth(.25);
            doc.setFontSize(8);
            for(var y = 0; y < print[i]['history'].length; y++){
                var date = print[i]['history'][y]['date'];
                var myDate = moment(date).format('YYYY-MM-DD');
                var final_date = moment(date).format('dddd');
                var check_date = moment(date);
                //check if the day still in week range
                if(check_date >= check_first && check_date <= check_last){
                    week_total = week_total + print[i]['history'][y]['calculate'];
                    total_hours = total_hours + week_total;
                }
                else{
                    week_total = week_total /60/60;
                    week_overtime = week_total - 40;
                    if(week_overtime > 0)
                    {
                        var overtime_string = "OverTime: " + week_overtime;
                    }
                    else{
                        var overtime_string = "OverTime: " + 0;
                    }
                    var week_string = "Total Regular Hours:  " + week_total;
                    doc.text(35, date_y, week_string);
                    date_y = date_y + 3;
                    doc.line(34, date_y, 113, date_y);
                    date_y = date_y + 4;
                    doc.text(35, date_y, overtime_string);
                    date_y = date_y + 3;
                    week_total = print[i]['history'][y]['calculate'];
                    check_first = moment(check_last, 'YYYY-MM-DD').add(1, 'days');
                    check_last = moment(check_first, 'YYYY-MM-DD').add(6, 'days');
                    var con =moment(check_first).format('YYYY-MM-DD');
                    var con2 = moment(check_last).format('YYYY-MM-DD');

                    doc.addPage();
                    doc.setFontSize(12);
                    date_y = 7;
                    var week_range = print[i]['name']+ "        Week From:      " + con + "     To       " + con2;
                    doc.line(10, date_y, 200, date_y);
                    date_y = date_y + 5;
                    doc.text(35, date_y, week_range);
                    date_y = date_y + 2;
                    doc.line(10, date_y, 200, date_y);
                    date_y = date_y + 4;
                    doc.line(10, 7, 10, 295);
                    doc.line(10, 288, 200, 288);
                    var week_range = print[i]['name']+ "        End Week From:      " + con + "     To       " + con2;
                    doc.text(25, 293, week_range);;
                    doc.line(10, 295, 200, 295);
                    doc.line(200, 7, 200, 295);
                    doc.setFontSize(8);
                }
                var title = final_date + "        " + date;
                doc.text(35, date_y, title);
                date_y = date_y + 1;
                doc.line(34, date_y, 113, date_y);
                date_y = date_y + 4;
                for(var x = 0; x < print[i]['history'][y]['blocks'].length; x++)
                {
                    var info_in =  date + "        " + print[i]['history'][y]['blocks'][x]['status_in'] + "       "  + print[i]['history'][y]['blocks'][x]['time_in'];
                    var info_out =  date + "                    " + print[i]['history'][y]['blocks'][x]['status_out'] + "       "  + print[i]['history'][y]['blocks'][x]['time_out']; 
                    doc.text(35, date_y, info_in);
                    date_y = date_y + 3;
                    doc.text(35, date_y, info_out);
                    date_y = date_y + 3;
                    var time_block ="Total time block:    " + print[i]['history'][y]['blocks'][x]['time-block'];
                    doc.text(35, date_y, time_block);
                    date_y = date_y + 4;
                }
                date_y = date_y + 3;
                var time_date = "Total Working of Day:    " + print[i]['history'][y]['working_hour'];
                doc.text(35, date_y, time_date);
                date_y = date_y + 3;
                doc.line(34, date_y, 113, date_y);
                date_y = date_y + 4;
            }
            week_total = week_total /60/60;
            week_overtime = week_total - 40
            if(week_overtime > 0)
            {
                var overtime_string = "OverTime: " + week_total;
            }
            else{
                var overtime_string = "OverTime: " + 0;
            }
            var week_string = "Total Regular Hours:  " + week_total;
            doc.text(35, date_y, week_string);
            date_y = date_y + 3;
            doc.line(34, date_y, 113, date_y);
            date_y = date_y + 4;
            doc.text(35, date_y, overtime_string);
            date_y = date_y + 3;
            doc.addPage();
        }
    doc.save("EmployeeReport.pdf")
    } //end REPORTS GENERATOR


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
                    + '<td class="col-md-2">' + jsondata[x]['name'] + '</td>'
                    + '<td class="col-md-2">' + jsondata[x]['pin'] + '</td>'
                    + '<td class="col-md-2">' + jsondata[x]['status'] + '</td>'
                    + '<td class="col-md-2">' + jsondata[x]['time'] + '</td>'
                    + '<td class="col-md-2"><Button class="deleterecord btn-link" id="' + idx + '">Delete</button></td></tr>');
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
            + '<td class="col-md-2">' + jsondata2[x]['name'] + '</td>'
            + '<td class="col-md-2">' + jsondata2[x]['pin'] + '</td>'
            + '<td class="col-md-2">' + jsondata2[x]['status'] + '</td>'
            + '<td class="col-md-2">' + jsondata2[x]['time'] + '</td>'
            + '<td class="col-md-2"><Button class="deleterecord btn-link" id="' + idx + '">Delete</button></td></tr>');
            }
        }
    });
}//end quicksearchreports function
