$(document).ready(function(){
    
    $('#submitdates').click(function(){
        var startdate = $('#datepicker').val();
        var enddate = $('#datepicker2').val();
        $(".result").empty();
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
                $("#yatable").append('<tr>'
                +'<th class="column" data-column="column1" data-label="Id">ID</th>'
                +'<th class="column" data-column="column2" data-label="EmployeeId">Employee ID</th>'
                +'<th class="column" data-column="column3" data-label="Status">Status</th>'
                +'<th class="column" data-column="column4" data-label="Timestamp">Timestamp</th>'
                +'<th class="column" data-column="column5">Edit/Delete</th></tr>'
            );
            for(var x = 0; x < jsondata2.length; x++){
                var idx = jsondata2[x]['id'];
                var test = $('<button/>',
                    {
                        id: idx,
                        class: 'deletenofloat',
                        text: 'Delete',
                        click: function() { 
                            x = this.id;
                            $(this).parent().parent().remove();
                            console.log(x);
                            $.ajax({
                                type:"GET",
                                url:"PHP-folder/tables/clockin_table/delete_money.php",
                                data:{id: x},
                                success:function()
                                {
                                    
                                }
                            });
                        }
                    });
                    $(".result").append('<tr class="row100">'
                    + '<td id="columnid" class="column" data-column="column1" data-label="Id">' + jsondata2[x]['id'] + '</td>'
                    + '<td id="columnemployeeid" class="column" data-column="column12" data-label="EmployeeId">' + jsondata2[x]['employee_id'] + '</td>'
                    + '<td id="columnstatus" class="column" data-column="column3" data-label="Status">' + jsondata2[x]['status'] + '</td>'
                    + '<td id="columntimestamp" class="column" data-column="column4" data-label="Timestamp">' + jsondata2[x]['punch_timestamp'] + '</td>'
                    + '<td id="columndelete" class="column" data-column="column5" data-label="Delete"></td></tr>');
                    $(".result").find('td').last().append(test);
                }
            }
        })
    })

    $('#money').click(function(){
        $(".result").empty();
        $("#createbuttons").hide();
        $("#search_text").hide();
        $("#moneysearch_text").show();
        $.ajax({
            method: "GET",
            url: "PHP-folder/tables/clockin_table/full_money_table.php",
            type: "json",
            success: function(data)
            {
                $("#dates").show();  
                var jsondata = JSON.parse(data);
                console.log(jsondata);
                $("#yatable").append('<tr>'
                    +'<th class="column" data-column="column1" data-label="Id">ID</th>'
                    +'<th class="column" data-column="column2" data-label="EmployeeId">Employee ID</th>'
                    +'<th class="column" data-column="column3" data-label="Status">Status</th>'
                    +'<th class="column" data-column="column4" data-label="Timestamp">Timestamp</th>'
                    +'<th class="column" data-column="column5">Edit/Delete</th></tr>'
                );
                for(var x = 0; x < jsondata.length; x++){
                    var idx = jsondata[x]['id'];
                    var test = $('<button/>',
                        {
                            id: idx,
                            class: 'deletenofloat',
                            text: 'Delete',
                            click: function() { 
                                x = this.id;
                                $(this).parent().parent().remove();
                                console.log(x);
                                $.ajax({
                                    type:"GET",
                                    url:"PHP-folder/tables/clockin_table/delete_money.php",
                                    data:{id: x},
                                    success:function()
                                    {
                                        
                                    }
                                });
                            }
                        });
                        $(".result").append('<tr class="row100">'
                        + '<td id="columnid" class="column" data-column="column1" data-label="Id">' + jsondata[x]['id'] + '</td>'
                        + '<td id="columnemployeeid" class="column" data-column="column12" data-label="EmployeeId">' + jsondata[x]['employee_id'] + '</td>'
                        + '<td id="columnstatus" class="column" data-column="column3" data-label="Status">' + jsondata[x]['status'] + '</td>'
                        + '<td id="columntimestamp" class="column" data-column="column4" data-label="Timestamp">' + jsondata[x]['punch_timestamp'] + '</td>'
                        + '<td id="columndelete" class="column" data-column="column5" data-label="Delete"></td></tr>');
                        $(".result").find('td').last().append(test);
                }        
            }
        });
    });
});