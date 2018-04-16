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
                var jsondata = JSON.parse(data);
                console.log(jsondata);
                sorting(jsondata);
            }
        });
    });
    function sorting(clockin_array){
        
    }
})