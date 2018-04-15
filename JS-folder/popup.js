$(document).ready(function(){
        // Get the modal
        $("#dates").hide();
        $("#moneysearch_text").hide();
        var createmanagermodal = document.getElementById('managermodal_container');
        var createusermodal = document.getElementById('usermodal_container');
        var clockinmodal = document.getElementById('clockinmodal_container');
        var clockoutmodal = document.getElementById('clockoutmodal_container');
        var timefixmodal = document.getElementById('timefix_container');
        var emodal = document.getElementById('edit_modal');
        var report_generate_modal = document.getElementById('report_generate');
        // Get the button that opens the modal
        var createmanagerbtn = document.getElementById("createmanager");
        var createuserbtn = document.getElementById("createuser");
        var clockinbtn = document.getElementById("clockinbtn");
        var clockoutbtn = document.getElementById("clockoutbtn");
        var timefixbtn = document.getElementById("timefixbtn");
        var report = document.getElementById("report1");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        var span2 = document.getElementsByClassName("close2")[0];
        var span3 = document.getElementsByClassName("close3")[0];
        var span4 = document.getElementsByClassName("close4")[0];
        var span5 = document.getElementsByClassName("close5")[0];
        var span6 = document.getElementsByClassName("close6")[0];
        var span7 = document.getElementsByClassName("close7")[0];
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
        timefixbtn.onclick = function() {
            timefixmodal.style.display = "block";
        }
        report.onclick = function() {
            report_generate_modal.style.display = "block";
        }
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
        span6.onclick = function() {
            timefixmodal.style.display = "none";
        }
        span7.onclick = function() {
            report_generate_modal.style.display = "none";
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
            if (event.target == timefixmodal) {
                timefixmodal.style.display = "none";
            }
            if (event.target == report_generate_modal) {
                report_generate_modal.style.display = "none";
            }
        }
    });
