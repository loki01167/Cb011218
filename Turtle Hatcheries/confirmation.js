const summary_table=document.getElementById("sum_table");
const fullname=document.getElementById("full_name");
const mobileNumber = document.getElementById("mobile_number");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const current_date = document.getElementById("current_date");
const time = document.getElementById("time");
const duration = document.getElementById("duration");
const mobile = document.getElementById("mobile");

//Load summary table
window.addEventListener("load",load_summary_table);
function load_summary_table()
{
   fullname.innerText = localStorage.getItem("fullname");
   current_date.innerText = localStorage.getItem("selectedDate");
   time.innerText = localStorage.getItem("time")
   duration.innerText = localStorage.getItem("selectedduration")
   mobile.innerText = localStorage.getItem("Mobile Number")
   email.innerText = localStorage.getItem("email")
   gender.innerText = localStorage.getItem("gender")
   summary_table.innerHTML += localStorage.getItem("sumtableupdated");
}

