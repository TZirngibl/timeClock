$(document).ready(function(){
    $("#overtime_amount").val(80);
    $("#type").val("Bi-Weekly");
    var overtime_amount; var overtime_amount; var id; var startdate;
    $("#type").on("change",function(){
        if($("#type").val() == "Weekly"){
            $("#overtime_amount").val(40);
        }
        else if($("#type").val() == "Bi-Weekly"){
            $("#overtime_amount").val(80);
        }
        else if($("#type").val() == "Monthly"){
            $("#overtime_amount").val(160);
        }
    });
    $("#generate_btn").click(function(){
        overtime_type = $("#type").val();
        overtime_amount = $("#overtime_amount").val();
        id = $("#pin_generate").val();
        startdate = $("#datepicker3").val();
        //--Ajex call report.php to get the array with the clockin history--//
        console.log($("#pin_generate").val());
        $.ajax({
            method: "GET",
            type: "json",
            url:"PHP-folder/report/report.php",
            data:{
                type: overtime_type, 
                limit: overtime_amount,
                id: id,
                startdate: startdate},
            success:function(data)
            {
                var result = [];
                var jsondata2 = JSON.parse(data);
                for(var y = 0; y < jsondata2.length; y++){
                    var pass_arr =[];
                    var clockin_history = [];
                    //var result = [];
                    var history = [];
                    var current_date = jsondata2[y]['history'][0]['date'];
                    for(var x = 0; x < jsondata2[y]['history'].length; x++){
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
                        history.push({
                            'date': current_date,
                            'history': clockin_history
                        });
                        clockin_history = [];
                        if(x < jsondata2[y]['history'].length){
                            current_date = jsondata2[y]['history'][x]['date'];
                        }
                        x--;
                    }
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
                        'overtime_limit': jsondata2[y]['overtime_limit'],
                        'history': history
                    });
                }
                calculation(result);
            }
        });
    });
    function calculation(result_clockin){
        var result_time = []; var block = []; var final = [];
        var name = result_clockin[0]['name'];     var pin = result_clockin[0]['pin']; 
        var wage = result_clockin[0]['wage'];      var wage_ot= result_clockin[0]['wage_ot'];
        var pay_type= result_clockin[0]['type'];  var amount_overtime = result_clockin[0]['overtime_limit'];  
        var time_in; var time_out; 
        var total_regular_time;
        var overtime_second = amount_overtime*60*60;                           
        for(var a = 0; a < result_clockin.length; a++){
            var total_time_second = 0;
            var total_pay_regular = 0;  
            var total_pay_over = 0;
            var total_pay = 0;
            for(var b = 0; b < result_clockin[a]['history'].length; b++){
                var total_time_date = 0;
                var count = 0;
                var expect_status = 'in';
                for(var c = 0; c < result_clockin[a]['history'][b]['history'].length; c++){
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
                    }
                }//finish punch time for one day
                ////////////////////////////////
                total_regular_time = moment().startOf('day').seconds(total_time_date).format('H.mm');
                result_time.push({
                    'date': result_clockin[a]['history'][b]['date'],
                    'blocks': block,
                    'working_hour': total_regular_time,
                });
                block = [];
            }//finish all days report
            /////////////////////////
            if(total_time_second > overtime_second){
                total_overtime = overtime_second - total_time_second;
            }
            else{
                total_overtime = 0;
            }
            var total_time_both_second = total_time_second + total_overtime;
            total_pay_regular = (wage/3600)*total_time_second;
            total_pay_over = (wage_ot/3600)*total_overtime;
            var total_time_regular = total_time_second/60/60;
            var total_time_over = total_overtime/60/60;
            var total_time_both = total_time_both_second/60/60;
            total_pay = total_pay_regular + total_pay_over;
            final.push({
                'start_date' : result_clockin[a]['start_date'],
                'end_date' : result_clockin[a]['end_date'],
                'id': result_clockin[a]['id'],
                'pin': result_clockin[a]['pin'],
                'dept': result_clockin[a]['dept'],
                'name': result_clockin[a]['name'],
                'wage': result_clockin[a]['wage'],
                'wage_ot': result_clockin[a]['wage_ot'],
                'type': result_clockin[a]['type'],
                'overtime_limit': result_clockin[a]['overtime_limit'],
                'history': result_time ,
                'total_regular_hour': total_time_regular,
                'total_pay_regular': total_pay_regular,
                'total_over_hours': total_time_over,
                'total_pay_over': total_pay_over,
                'total_working_hour': total_time_both,
                'total_pay': total_pay
            });
            result_time = [];
        }//finish report of one person
        //////////////////////////////
        console.log(final);
        create(final);
    }
    //////////////////create pdf file////////////////////////
    ////////////////////////////////////////////////////////
    function create(print){
        var doc = new jsPDF();
        doc.setFontSize(8);

        for(var i = 0; i <print.length; i++)
        {
            //INSERT CURRENT TIMESTAMP HERE
            doc.text(10, 10, 'x/x/xxxx x:xx:xx PM');

            doc.setLineWidth(0.5);
            doc.line(10, 11, 200, 11);
            doc.setFontSize(10);
            var start_date = print[i]['start_date'];
            var end_date = print[i]['end_date'];
            var range = "Time Cards/Day Report - " + "from " +  start_date + " to " + end_date; 

            //TIME CARD DATE RANGE HERE
            doc.text(25, 15, range);

            doc.setLineWidth(1);
            doc.line(10, 17, 200, 17);
            doc.setLineWidth(.25);
            doc.line(10, 18, 200, 18);

            var public_info = " Name: " + print[i]['name'] + "   ID: " + print[i]['id'] + "   DEPT: " + print[i]['dept'];
            doc.setFontSize(8);
            //NAME, ID, PIN, DEPT, Default
            doc.text(10, 21, public_info);
            //Wages, Regular total, OT Total
            doc.text(155, 21, 'Wages:       Reg 79:19       OT: 0:00');
            //Report week date ... REG WAGES ... OT WAGES ... Weekly Total: 
            doc.text(10, 24, '(Week of 20150219)                Reg 42:13       OT 0:00             Weekly Total: $0.00');


            //!------------------------------------FIRST WEEK STARTS HERE--------------------------------------!
            //MONDAY STARTS HERE
            doc.line(54, 25, 113, 25);
            //Monday's info
            doc.text(55, 28, 'Mon   Daily Total:    Reg 11:59      OT 0:00 ');
            //All clock in/out on monday
            doc.text(35, 32, 'Mon 2/9/2018      9:00AM      Hol         7:30        Presidents dat');
            doc.text(35, 35, 'Mon 2/9/2018      9:16AM      In');
            doc.text(35, 38, 'Mon 2/9/2018      1:45PM          Out     4:29');
            //MONDAY ENDS HERE

            //TUESDAY STARTS HERE
            doc.line(54, 40, 113, 40);
            //Tuesday's info
            doc.text(55, 43, 'Tue   Daily Total:    Reg 6:30      OT 0:00 ');
            //All clock in/out on tuesday
            doc.text(35, 47, 'Tue 2/10/2018      9:10AM      In');
            doc.text(35, 50, 'Tue 2/10/2018     12:57PM         Out     3:22');
            doc.text(35, 53, 'Tue 2/10/2018      1:22PM      In');
            doc.text(35, 56, 'Tue 2/10/2018      4:05PM          Out     2:43');
            //TUESDAY ENDS HERE


            //WEDNESDAY STARTS HERE
            doc.line(54, 58, 113, 58);
            //Wednesday's info
            doc.text(55, 61, 'Wed   Daily Total:    Reg 8:15      OT 0:00 ');
            //All clock in/out on wednesday
            doc.text(35, 65, 'Wed 2/11/2018      9:11AM      In');
            doc.text(35, 68, 'Wed 2/11/2018     12:18PM         Out     3:07');
            doc.text(35, 71, 'Wed 2/11/2018     12:39PM      In');
            doc.text(35, 74, 'Wed 2/11/2018      5:47PM          Out     5:08');
            //WEDNESDAY ENDS HERE


            //THURSDAY STARTS HERE
            doc.line(54, 75, 113, 75);
            //Thursday's info
            doc.text(55, 78, 'Thu   Daily Total:    Reg 7:38      OT 0:00 ');
            //All clock in/out on thursday
            doc.text(35, 82, 'Thu 2/12/2018      9:10AM      In');
            doc.text(35, 85, 'Thu 2/12/2018     12:32PM         Out     3:22');
            doc.text(35, 88, 'Thu 2/12/2018     12:51PM      In');
            doc.text(35, 91, 'Thu 2/12/2018      5:07PM          Out     4:16');
            //THURSDAY ENDS HERE

            //FRIDAY STARTS HERE
            doc.line(54, 92, 113, 92);
            //Friday's info
            doc.text(55, 95, 'Fri   Daily Total:    Reg 7:51      OT 0:00 ');
            //All clock in/out on friday
            doc.text(35, 99, 'Fri 2/12/2018      9:17AM      In');
            doc.text(35, 102, 'Fri 2/12/2018     5:08PM         Out     7:51');
            //FRIDAY ENDS HERE
            doc.addPage();
        }
    doc.save("EmployeeReport.pdf")
    }
})