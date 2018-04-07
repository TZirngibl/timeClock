$(function() {
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
