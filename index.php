<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="index.css">
<!-- Latest compiled and minified JavaScript -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<title>CRST Timeclock</title>
</head>
<body>
<!--NAVBAR-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">Timeclock</a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Report</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Clock In</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Clock Out</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Logout</a>
            </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
<!-- Button trigger ADD MANAGER modal -->
    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#addManager">
    Add Manager
    </button>
<!-- Button trigger ADD EMPLOYEE modal -->
    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#addEmployee">
    Add Employee
    </button>
<!-- Button trigger EDIT EMPLOYEE modal -->
    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#editEmployee">
    Edit Employee
    </button>
<!--MANAGER AND EMPLOYEE TABLES-->
<!--MANAGERS-->
<h5>Managers</h5>
    <div class="table-responsive-sm">
        <table class="table">
            <thead class="table-dark">
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Pass</th>
                <th>Level</th>
                <th>Create Date</th>
                <th>Create By</th>
                <th>Modify Date</th>
                <th>Modify By</th>
                <th>Expire Date</th>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Joey No Ajax</td>
                    <td>jnojax@gmail.com</td>
                    <td>fakepasswordhaha</td>
                    <td>m</td>
                    <td>MM-DD-YYYY</td>
                    <td>Creator</td>
                    <td>MM-DD-YYYY</td>
                    <td>Modifier</td>
                    <td>seconds until expiry</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>HonkyNoJax</td>
                    <td>yerrr@yahoo.com</td>
                    <td>fakepasswordhaha2</td>
                    <td>u2</td>
                    <td>MM-DD-YYYY2</td>
                    <td>Creator2</td>
                    <td>MM-DD-YYYY2</td>
                    <td>Modifier2</td>
                    <td>seconds until expiry2</td>
                </tr>
            </tbody>
        </table>
    </div>
<!--EMPLOYEES-->
<h5>Employees</h5>
    <div class="table-responsive-md">
        <table class="table">
            <thead class="table-dark">
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>PIN</th>
                <th>Dept</th>
                <th>Create Date</th>
                <th>Create By</th>
                <th>Modify Date</th>
                <th>Modify By</th>
                <th>Wage</th>
                <th>OTWage</th>
                <th>Edit/Delete</th>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Tim Zirngibl</td>
                    <td>tzirn@yerr.com</td>
                    <td>555</td>
                    <td>100</td>
                    <td>MM-DD-YYYY</td>
                    <td>Creator</td>
                    <td>MM-DD-YYYY</td>
                    <td>Modifier</td>
                    <td>15</td>
                    <td>20</td>
                    <td>Edit/Delete Links</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Hoang Nguyen</td>
                    <td>backendiswackend@hoang.com</td>
                    <td>444</td>
                    <td>100</td>
                    <td>MM-DD-YYYY</td>
                    <td>Creator</td>
                    <td>MM-DD-YYYY</td>
                    <td>Modifier</td>
                    <td>1</td>
                    <td>2</td>
                    <td>Edit/Delete Links</td>
                </tr>
            </tbody>
        </table>
</div>
<!--ADD MANAGER Modal -->
    <div class="modal fade" id="addManager" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Manager</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group row">
                    <input id= "idchange"  type="hidden" name="id" readonly/>

                    <label for="name" class="col-sm-2 col-form-label">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="name" placeholder="Name">
                    </div>

                    <label for="email" class="col-sm-2 col-form-label">Email: </label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="email" placeholder="Email">
                    </div>

                    <label for="inputPassword" class="col-sm-2 col-form-label">Password:</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                    </div>
                    
                    <label for="isManager" class="col-sm-2 col-form-label">Manager: </label>
                    <div class="col-sm-10">
                    <select class="form-control" id="isManager">
                    <option>Yes</option>
                    <option>No</option>
                    </select>
                    </div>
                </div>
                </form>
            </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Add Manager</button>
        </div>
        </div>
    </div>
    </div>
<!--ADD EMPLOYEE Modal -->
    <div class="modal fade" id="addEmployee" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Employee</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group row">
                    <input id= "idchange"  type="hidden" name="id" readonly/>

                    <label for="name" class="col-sm-2 col-form-label">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="name" placeholder="Name">
                    </div>

                    <label for="pin" class="col-sm-2 col-form-label">PIN:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="pin" placeholder="PIN">
                    </div>

                    <label for="email" class="col-sm-2 col-form-label">Email: </label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="email" placeholder="Email">
                    </div>

                    <label for="dept" class="col-sm-2 col-form-label">Dept:</label>
                    <div class="col-sm-10">
                        <input type="int" class="form-control" id="dept" placeholder="Dept">
                    </div>

                    <label for="wage" class="col-sm-2 col-form-label">Wage:</label>
                    <div class="col-sm-10">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                        <input type="int" class="form-control" id="wage" placeholder="Wage">
                        </div>
                    </div>

                    <label for="ot_wage" class="col-sm-2 col-form-label">OTWage:</label>
                    <div class="col-sm-10">
                        <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                        <input type="int" class="form-control" id="ot_wage" placeholder="OT Wage">
                        </div>
                    </div>
                </div>
                </form>
            </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Add Employee</button>
        </div>
        </div>
    </div>
    </div>
<!--EDIT EMPLOYEE Modal -->
    <div class="modal fade" id="editEmployee" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit Employee</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group row">
                    <input id= "idchange"  type="hidden" name="id" readonly/>

                    <label for="name" class="col-sm-2 col-form-label">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="name" placeholder="Name">
                    </div>

                    <label for="pin" class="col-sm-2 col-form-label">PIN:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="pin" placeholder="PIN">
                    </div>

                    <label for="email" class="col-sm-2 col-form-label">Email: </label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="email" placeholder="Email">
                    </div>

                    <label for="inputPassword" class="col-sm-2 col-form-label">Dept:</label>
                    <div class="col-sm-10">
                        <input type="" class="form-control" id="dept" placeholder="Dept">
                    </div>

                    <label for="wage" class="col-sm-2 col-form-label">Wage:</label>
                    <div class="col-sm-10">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                        <input type="int" class="form-control" id="wage" placeholder="Wage">
                        </div>
                    </div>

                    <label for="ot_wage" class="col-sm-2 col-form-label">OTWage:</label>
                    <div class="col-sm-10">
                        <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                        <input type="int" class="form-control" id="ot_wage" placeholder="OT Wage">
                        </div>
                    </div>
                </div>
                </form>
            </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>
<!-- CLOCK IN Modal -->
<div class="modal fade" id="clockIn" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        PIN:
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Clock In</button>
      </div>
    </div>
  </div>
</div>
<!-- CLOCK OUT Modal -->
<div class="modal fade" id="clockOut" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        PIN:
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Clock Out</button>
      </div>
    </div>
  </div>
</div>
<!--EDIT/DELETE BUTTON GROUP HERE-->
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary">Edit</button>
  <button type="button" class="btn btn-secondary">Delete</button>
</div>

</body>
</html>