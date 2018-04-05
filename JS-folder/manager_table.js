
$(document).ready(function(){
    function loadfulltable(){
        $.ajax({
        method: "GET",
        url: "PHP-folder/tables/manager_table/full_table.php",
        type: "json",
        success: function(data){
            var jsondata = JSON.parse(data);
            $(".result").append('<div id ="manager_search">'
            + '<input type="text" name="manager_search" id="managersearchbar" placeholder=" Search Managers by Name" class="form-control search_text" />'
             +'</div>' 
                + '<h3>Managers</h3>');
            $("#yatable").append('<tr>'
                +'<th class="column" data-column="column1" data-label="Id">Id</th>'
                +'<th class="column" data-column="column2" data-label="Name">Name</th>'
                +'<th class="column" data-column="column3" data-label="Email">Email</th>'
                +'<th class="column" data-column="column4" data-label="Level">Level</th>'
                +'<th class="column" data-column="column5" data-label="Create Date">Create Date</th>'
                +'<th class="column" data-column="column6" data-label="Create By">Create By</th>'
                +'<th class="column" data-column="column7" data-label="Modify Date">Modify Date</th>'
                +'<th class="column" data-column="column8" data-label="Modify By">Modify By</th>'
                +'<th class="column" data-column="column10" data-label="Expire">Expire Date</th>'
                +'<th class="column" data-column="column11">Edit/Delete</th></tr>'
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
                            $(this).parent().parent().remove();
                            $.ajax({
                                type:"GET",
                                url:"PHP-folder/tables/manager_table/delete.php",
                                data:{id: x},
                                success:function()
                                {
                                
                                }
                            });
                        }
                    });
                $(".result").append('<tr class="row100">'
                    + '<td id="columnid" class="column" data-column="column1" data-label="Id">' + jsondata[x]['id'] + '</td>'
                    + '<td id="columnname" class="column" data-column="column2" data-label="Name">' + jsondata[x]['name'] + '</td>'
                    + '<td id="columnemail" class="column" data-column="column3" data-label="Email">' + jsondata[x]['email'] + '</td>'
                    + '<td id="columnlevel" class="column" data-column="column4" data-label="Level">' + jsondata[x]['level'] + '</td>'
                    + '<td id="columncreatedate" class="column" data-column="column5" data-label="Create Date">' + jsondata[x]['create_date'] + '</td>'
                    + '<td id="columncreateby" class="column" data-column="column6" data-label="Create By">' + jsondata[x]['create_by'] + '</td>'
                    + '<td id="columnlastmodifydate" class="column" data-column="column7" data-label="Modify Date">' + jsondata[x]['lastmodify_date'] + '</td>'
                    + '<td id="columnlastmodifyby" class="column" data-column="column8" data-label="Modify By">' + jsondata[x]['lastmodify_by'] + '</td>'
                    + '<td id="columnexpire" class="column" data-column="column9" data-label="Expire">' + jsondata[x]['expire_date'] + '</td>'
                    + '<td id="columndelete" class="column" data-column="column10" data-label="Delete"></td></tr>');
                $(".result").find('td').last().append(deletebutton)
            } 
        }
      });
    }
    loadfulltable();
    function load_data(query){
        $.ajax({
            url:"PHP-folder/tables/manager_table/full_table.php",
            method:"post",
            data:{query:query},
            success:function(data)
            {
                var jsondata = JSON.parse(data);
                $(".result").append('<div id ="managersearchbar">'
                + '<input type="text" name="search_text" id="search_text" placeholder=" Search Employees by Name" class="form-control search_text" />'
                 +'</div>' 
                    + '<h3>Managers</h3>');
                $("#yatable").append('<tr>'
                    +'<th class="column" data-column="column1" data-label="Id">Id</th>'
                    +'<th class="column" data-column="column2" data-label="Name">Name</th>'
                    +'<th class="column" data-column="column3" data-label="Email">Email</th>'
                    +'<th class="column" data-column="column4" data-label="Level">Level</th>'
                    +'<th class="column" data-column="column5" data-label="Create Date">Create Date</th>'
                    +'<th class="column" data-column="column6" data-label="Create By">Create By</th>'
                    +'<th class="column" data-column="column7" data-label="Modify Date">Modify Date</th>'
                    +'<th class="column" data-column="column8" data-label="Modify By">Modify By</th>'
                    +'<th class="column" data-column="column10" data-label="Expire">Expire Date</th>'
                    +'<th class="column" data-column="column11">Edit/Delete</th></tr>'
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
                                $(this).parent().parent().remove();
                                $.ajax({
                                    type:"GET",
                                    url:"PHP-folder/tables/manager_table/delete.php",
                                    data:{id: x},
                                    success:function()
                                    {
                                    
                                    }
                                });
                            }
                        });
                    $(".result").append('<tr class="row100">'
                        + '<td id="columnid" class="column" data-column="column1" data-label="Id">' + jsondata[x]['id'] + '</td>'
                        + '<td id="columnname" class="column" data-column="column2" data-label="Name">' + jsondata[x]['name'] + '</td>'
                        + '<td id="columnemail" class="column" data-column="column3" data-label="Email">' + jsondata[x]['email'] + '</td>'
                        + '<td id="columnlevel" class="column" data-column="column4" data-label="Level">' + jsondata[x]['level'] + '</td>'
                        + '<td id="columncreatedate" class="column" data-column="column5" data-label="Create Date">' + jsondata[x]['create_date'] + '</td>'
                        + '<td id="columncreateby" class="column" data-column="column6" data-label="Create By">' + jsondata[x]['create_by'] + '</td>'
                        + '<td id="columnlastmodifydate" class="column" data-column="column7" data-label="Modify Date">' + jsondata[x]['lastmodify_date'] + '</td>'
                        + '<td id="columnlastmodifyby" class="column" data-column="column8" data-label="Modify By">' + jsondata[x]['lastmodify_by'] + '</td>'
                        + '<td id="columnexpire" class="column" data-column="column9" data-label="Expire">' + jsondata[x]['expire_date'] + '</td>'
                        + '<td id="columndelete" class="column" data-column="column10" data-label="Delete"></td></tr>');
                    $(".result").find('td').last().append(deletebutton)
                } 
            }
        });
    }
    $('#managersearchbar').keyup(function(){
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
});