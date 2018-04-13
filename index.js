$(function() {
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
    $('#datetimepicker1').datetimepicker({
      uiLibrary: 'bootstrap4',
      language: 'pt-BR'
    });
    $('#datetimepicker2').datetimepicker({
        uiLibrary: 'bootstrap4',
        language: 'pt-BR'
      });
      $('#datetimepicker3').datetimepicker({
        uiLibrary: 'bootstrap4',
        language: 'pt-BR'
      });
    $("#reportspage").hide();
    $("#reportcontainer").click(function(){
        $("#home-page-wrapper").hide();
        $("#reportspage").show();
    });
    $(".homepage").click(function(){
        $("#home-page-wrapper").show();
        $("#reportspage").hide();
    });
});

