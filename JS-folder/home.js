$(document).ready(function(){
        // Get the modal
        var createmanagermodal = document.getElementById('managermodal_container');
        var createusermodal = document.getElementById('usermodal_container');
        var clockinmodal = document.getElementById('clockinmodal_container');
        var clockoutmodal = document.getElementById('clockoutmodal_container');
        var emodal = document.getElementById('edit_modal');
        // Get the button that opens the modal
        var createmanagerbtn = document.getElementById("createmanager");
        var createuserbtn = document.getElementById("createuser");
        var clockinbtn = document.getElementById("clockinbtn");
        var clockoutbtn = document.getElementById("clockoutbtn");
        //var editbtn = document.getElementById("edit_user");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        var span2 = document.getElementsByClassName("close2")[0];
        var span3 = document.getElementsByClassName("close3")[0];
        var span4 = document.getElementsByClassName("close4")[0];
        var span5 = document.getElementsByClassName("close5")[0];
        // When the user clicks the button, open the modal 
        createmanagerbtn.onclick = function() {    
            createmanagermodal.style.display = "block";
        }
        createuserbtn.onclick = function() {
            createusermodal.style.display = "block";
        }
        clockinbtn.onclick = function() {
            clockinmodal.style.display = "block";
        }
        clockoutbtn.onclick = function() {
            clockoutmodal.style.display = "block";
        }
        /*editbtn.onclick = function() {
            emodal.style.display = "block";
        }*/
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            createmanagermodal.style.display = "none";
        }
        span2.onclick = function() {
            emodal.style.display = "none";
        }
        span3.onclick = function() {
            createusermodal.style.display = "none";
        }
        span4.onclick = function() {
            clockinmodal.style.display = "none";
        }
        span5.onclick = function() {
            clockoutmodal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == createmanagermodal) {
                createmanagermodal.style.display = "none";
            }
            if (event.target == emodal) {
                emodal.style.display = "none";
            }
            if (event.target == createusermodal) {
                createusermodal.style.display = "none";
            }
            if (event.target == clockinmodal) {
                clockinmodal.style.display = "none";
            }
            if (event.target == clockoutmodal) {
                clockoutmodal.style.display = "none";
            }
        }

        

        $('#money').click(function(){
            $(".result").empty();
            $(".search-container").hide();
            $.ajax({
                method: "GET",
                url: "moneydata.php",
                type: "json",
                success: function(data)
                {
                    $("#createbuttons").hide();  
                    var jsondata = JSON.parse(data);
                    //console.log(jsondata);
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
                                class: 'delete',
                                text: 'Delete',
                                click: function() { 
                                    x = this.id;
                                    $(this).parent().parent().remove();
                                    console.log(x);
                                    $.ajax({
                                        type:"GET",
                                        url:"deletemoney.php",
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
/*
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
// The type of chart we want to create
type: 'bar',

// The data for our dataset
data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
    label: "Total Hours",
    backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(11, 95, 229)',
        'rgb(210, 229, 11)',
        'rgb(11, 229, 178)',
        'rgb(249, 4, 209)',
        'rgb(122, 249, 3)',
        'rgb(249, 39, 3)'],
    borderColor: 'rgb(255, 99, 132)',
    data: [12, 10, 20, 15, 20, 30, 45],
}]
},

// Configuration options go here
options: {
    responsive: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
    }
})
*/