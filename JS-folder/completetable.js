$(document).ready(function(){
    $('#search_text').keyup(function(){
        var search = $(this).val();
        if(search != '')
        {
            $(".result").empty();
            load_data(search);
        }
        else
        {
            $(".result").empty();
            loadfulltable();			
        }
    });
    $('#managers').click(function(){
        $(".result").empty();
        $(".search-container").show();                
        loadfulltable();
    });
    loadfulltable();
    function loadfulltable(){
        var edit = document.getElementById('edit_modal');
        $.ajax({
        method: "GET",
        url: "employee-table/full-table.php",
        type: "json",
        success: function(data){
            var jsondata = JSON.parse(data);
            //console.log(jsondata);
            $("#yatable").append('<tr>'
                +'<th class="column" data-column="column1" data-label="Id">Id</th>'
                +'<th class="column" data-column="column2" data-label="Name">Name</th>'
                +'<th class="column" data-column="column3" data-label="Pin">Pin</th>'
                +'<th class="column" data-column="column4" data-label="Email">Email</th>'
                +'<th class="column" data-column="column5" data-label="Dept">Dept</th>'
                +'<th class="column" data-column="column6" data-label="Create Date">Create Date</th>'
                +'<th class="column" data-column="column7" data-label="Create By">Create By</th>'
                +'<th class="column" data-column="column8" data-label="Modify Date">Modify Date</th>'
                +'<th class="column" data-column="column9" data-label="Modify By">Modify By</th>'
                +'<th class="column" data-column="column10" data-label="Wage">Wage</th>'
                +'<th class="column" data-column="column11" data-label="OT Wage">OT Wage</th>'
                +'<th class="column" data-column="column12">Edit/Delete</th></tr>'
            );
            for(var x = 0; x < jsondata.length; x++){
                var idx = jsondata[x]['id'];
                var deletebutton = $('<button/>',
                    {
                        id: idx,
                        class: 'delete tablebtn',
                        text: 'Delete',
                        click: function() { 
                            $.ajax({
                                type:"GET",
                                url:"delete.php",
                                data:{id: x},
                                success:function()
                                {
                                    swal("Hello world!");
                                }
                            });
                            $(this).parent().parent().remove();
                        }
                    });
                    var editbutton = $('<button/>',
                    {
                        id: idx,
                        class: 'edit-user tablebtn',
                        text: 'Edit',
                        click: function() {
                            x = this.id;
                            $.ajax({
                                type: "GET",
                                url:"Edit/edit.php",
                                data:{id: x},
                                success:function(data1)
                                {
                                    var jsondata1 = JSON.parse(data1);
                                    for(var x = 0; x < jsondata.length; x++){
                                        $("#idchange").val(jsondata1[x]['id']);
                                        $("#namechange").val(jsondata1[x]['name']);
                                        $("#pinchange").val(jsondata1[x]['pin']);
                                        $("#emailchange").val(jsondata1[x]['email']);
                                        $("#deptchange").val(jsondata1[x]['dept']);
                                        $("#wagechange").val(jsondata1[x]['wage']);
                                        $("#wage_otchange").val(jsondata1[x]['wage_ot']);
                                    }
                                }
                            })
                            edit.style.display = "block";
                        }
                });
                $(".result").append('<tr class="row100">'
                + '<td id="columnid" class="column" data-column="column1" data-label="Id">' + jsondata[x]['id'] + '</td>'
                + '<td id="columnname" class="column" data-column="column2" data-label="Name">' + jsondata[x]['name'] + '</td>'
                + '<td id="columnpin" class="column" data-column="column3" data-label="Pin">' + jsondata[x]['pin'] + '</td>'
                + '<td id="columnemail" class="column" data-column="column4" data-label="Email">' + jsondata[x]['email'] + '</td>'
                + '<td id="columndept" class="column" data-column="column5" data-label="Dept">' + jsondata[x]['dept'] + '</td>'
                + '<td id="columncreatedate" class="column" data-column="column6" data-label="Create Date">' + jsondata[x]['create_date'] + '</td>'
                + '<td id="columncreateby" class="column" data-column="column7" data-label="Create By">' + jsondata[x]['create_by'] + '</td>'
                + '<td id="columnlastmodifydate" class="column" data-column="column8" data-label="Modify Date">' + jsondata[x]['lastmodify_date'] + '</td>'
                + '<td id="columnlastmodifyby" class="column" data-column="column9" data-label="Modify By">' + jsondata[x]['lastmodify_by'] + '</td>'
                + '<td id="columnwage" class="column" data-column="column10" data-label="Wage">' + jsondata[x]['wage'] + '</td>'
                + '<td id="columnwageot" class="column" data-column="column11" data-label="OT Wage">' + jsondata[x]['wage_ot'] + '</td>'
                + '<td id="columndelete" class="column" data-column="column12" data-label="Delete"></td></tr>');
                $(".result").find('td').last().append(deletebutton).append(editbutton);
            }        
        }
      });
    }

/*
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////Load search table//////////////////////////////
//////////////////////////////////////////////////////////////////////////////
*/
    function load_data(query){
        var edit = document.getElementById('edit_modal');
        $.ajax({
            url:"employee-table/search-table.php",
            method:"post",
            data:{query:query},
            success:function(data)
            {
                var jsondata = JSON.parse(data);
                //console.log(jsondata);
                $("#yatable").append('<tr>'
                    +'<th class="column" data-column="column1" data-label="Id">Id</th>'
                    +'<th class="column" data-column="column2" data-label="Name">Name</th>'
                    +'<th class="column" data-column="column3" data-label="Pin">Pin</th>'
                    +'<th class="column" data-column="column4" data-label="Email">Email</th>'
                    +'<th class="column" data-column="column5" data-label="Dept">Dept</th>'
                    +'<th class="column" data-column="column6" data-label="Create Date">Create Date</th>'
                    +'<th class="column" data-column="column7" data-label="Create By">Create By</th>'
                    +'<th class="column" data-column="column8" data-label="Modify Date">Modify Date</th>'
                    +'<th class="column" data-column="column9" data-label="Modify By">Modify By</th>'
                    +'<th class="column" data-column="column10" data-label="Wage">Wage</th>'
                    +'<th class="column" data-column="column11" data-label="OT Wage">OT Wage</th>'
                    +'<th class="column" data-column="column12">Edit/Delete</th></tr>'
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
                                console.log(x);
                                $.ajax({
                                    type:"GET",
                                    url:"delete.php",
                                    data:{id: x},
                                    success:function()
                                    {
                                        swal("Hello world!");
                                    }
                                });
                                $(this).parent().parent().remove();
                            }
                        });
                        var editbutton = $('<button/>',
                        {
                            id: idx,
                            class: 'edit-user tablebtn',
                            text: 'Edit',
                            click: function() {
                                x = this.id;
                                $.ajax({
                                    type: "GET",
                                    url:"Edit/edit.php",
                                    data:{id: x},
                                    success:function(data1)
                                    {
                                        var jsondata1 = JSON.parse(data1);
                                        for(var x = 0; x < jsondata.length; x++){
                                            $("#idchange").val(jsondata1[x]['id']);
                                            $("#namechange").val(jsondata1[x]['name']);
                                            $("#pinchange").val(jsondata1[x]['pin']);
                                            $("#emailchange").val(jsondata1[x]['email']);
                                            $("#deptchange").val(jsondata1[x]['dept']);
                                            $("#wagechange").val(jsondata1[x]['wage']);
                                            $("#wage_otchange").val(jsondata1[x]['wage_ot']);
                                        }
                                    }
                                })
                                edit.style.display = "block";
                            }
                    });
                    $(".result").append('<tr class="row100">'
                        + '<td id="columnid" class="column" data-column="column1" data-label="Id">' + jsondata[x]['id'] + '</td>'
                        + '<td id="columnname" class="column" data-column="column2" data-label="Name">' + jsondata[x]['name'] + '</td>'
                        + '<td id="columnpin" class="column" data-column="column3" data-label="Pin">' + jsondata[x]['pin'] + '</td>'
                        + '<td id="columnemail" class="column" data-column="column4" data-label="Email">' + jsondata[x]['email'] + '</td>'
                        + '<td id="columndept" class="column" data-column="column5" data-label="Dept">' + jsondata[x]['dept'] + '</td>'
                        + '<td id="columncreatedate" class="column" data-column="column6" data-label="Create Date">' + jsondata[x]['create_date'] + '</td>'
                        + '<td id="columncreateby" class="column" data-column="column7" data-label="Create By">' + jsondata[x]['create_by'] + '</td>'
                        + '<td id="columnlastmodifydate" class="column" data-column="column8" data-label="Modify Date">' + jsondata[x]['lastmodify_date'] + '</td>'
                        + '<td id="columnlastmodifyby" class="column" data-column="column9" data-label="Modify By">' + jsondata[x]['lastmodify_by'] + '</td>'
                        + '<td id="columnwage" class="column" data-column="column10" data-label="Wage">' + jsondata[x]['wage'] + '</td>'
                        + '<td id="columnwageot" class="column" data-column="column11" data-label="OT Wage">' + jsondata[x]['wage_ot'] + '</td>'
                        + '<td id="columndelete" class="column" data-column="column12" data-label="Delete"></td></tr>');
                    $(".result").find('td').last().append(deletebutton).append(editbutton);
                } 
            }
        });
    }
});