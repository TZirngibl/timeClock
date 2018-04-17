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
                var jsondata2 = JSON.parse(data);
                for(var y = 0; y < jsondata2.length; y++){
                    var clockin_history = [];
                    var index = 0;
                    var result = [];
                    var history = [];
                    var result_index = 0;
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
                        index = 0;
                        x--;
                    }
                    result.push({
                        'pin': jsondata2[y]['pin'],
                        'name': jsondata2[y]['name'],
                        'wage': jsondata2[y]['wage'],
                        'wage_ot': jsondata2[y]['wage_ot'],
                        'type': jsondata2[y]['type'],
                        'overtime_limit': jsondata2[y]['overtime_limit'],
                        'history': history
                    })
                    calculation(result);
                }
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
            var total_time = 0; 
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
            total_time = total_time_second + overtime_second;
            total_pay_regular = (wage/3600)*total_time_second;
            total_pay_over = (wage_ot/3600)*total_overtime;
            var total_time_regular = moment().startOf('day').seconds(total_time_second).format('H.mm');
            var total_time_over = moment().startOf('day').seconds(total_overtime).format('H.mm');
            total_pay = total_pay_regular + total_pay_over;
            final.push({
                'pin': result_clockin[a]['pin'],
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
                'total_pay': total_pay
            });
            result_time = [];
            console.log(final);
        }//finish report of one person
        //////////////////////////////
    }
})