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
                console.log(jsondata2);
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
                    console.log(result);
                    calculation(result);
                }
            }
        });
    });
    function calculation(pre_arr){
        
    }
})