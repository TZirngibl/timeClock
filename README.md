# timeClock
Time Clock
*(1): DELETE EMPLOYEE
    Passing: ID of the employee type GET
    URL: "/timeclock/timeclock/PHP-folder/tables/employee_table/delete.php""
    Event: 
        + Remove the emloyee

*(2) DELETE RECORD
    Passing: ID of the record type GET
    URL: "/timeclock/timeclock/PHP-folder/tables/clockin_table/delete_money.php"
    Event: 
        + Remove the record

*(3): EDIT EMPLOYEE
    Passing: ID of the employee type GET
    URL: "/timeclock/timeclock/PHP-folder/tables/employee_table/edit.php"
    Event:
        + Pop up edit modal 
        + Show all employee's info

*(4): DElETE EMPLOYEE
    Passing: ID of the employee type GET
    URL: "/timeclock/timeclock/PHP-folder/tables/employee_table/delete.php"
    Event:
        + Delete Employee from database
        + Remove employee from table on the website

*(4): Generate Report
    Passing: ID of the employee, start date, and type of the report
    Type: GET
    URL: "PHP-folder/report/report.php"
    Event:
        + Create Report based on the start date, report type, and id