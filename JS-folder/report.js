$(document).ready(function(){
    $("#overtime_amount").val(80);
    $("#type").val("Bi-Weekly");
    $("#type").on("change",function(){
        if($("#type").val() == "Weekly"){
            $("#overtime_amount").val(40);
            overtime_type = $("#type").val();
            overtime_amount = $("#overtime_amount").val();
        }
        else if($("#type").val() == "Bi-Weekly"){
            $("#overtime_amount").val(80);
            overtime_type = $("#type").val();
            overtime_amount = $("#overtime_amount").val();
        }
        else if($("#type").val() == "Monthly"){
            $("#overtime_amount").val(160);
            overtime_type = $("#type").val();
            overtime_amount = $("#overtime_amount").val();
        }
    });
    $("#generate_btn").click(function(){
        overtime_type = $("#type").val();
        overtime_amount = $("#overtime_amount").val();
        console.log(overtime_type);
        $.ajax({
            type: "get",
            url:"PHP-folder/report/report.php",
            data:{ot: overtime_type, om: overtime_amount},
            type: "json",
            success:function(data)
            {
                var jsondata = JSON.parse(data);
                console.log(jsondata);
            }
        });
    });
})