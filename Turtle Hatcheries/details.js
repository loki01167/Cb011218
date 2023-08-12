//Variables
const fullname=document.getElementById("full_name");
const mobileNumber = document.getElementById("mobile_number");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const confirmEmail = document.getElementById("confirm_email");
const form = document.getElementById("details_form");
const continue_button = document.getElementById("conti_purchase_det");
const summary_table=document.getElementById("sum_table");


//Adding event listners
fullname.addEventListener("input", () => 
{
  fullname_validation();
  Allvalidation();
});

email.addEventListener("input", () => 
{
  email_validation();
  Allvalidation();
});

confirmEmail.addEventListener("input", () => 
{
  c_email_validation();
  Allvalidation();
});

mobileNumber.addEventListener("input",()=>
{
  mobile_number_validation();
  Allvalidation();

});

window.addEventListener("load",load_summary_table);

//Load summary table
function load_summary_table()
{
  /*selected_date.innerText=localStorage.getItem("selectedDate");
  selectedduration.innerText=localStorage.getItem("selectedduration");
  selectedtime.innerText=localStorage.getItem("time");*/
  summary_table.innerHTML = localStorage.getItem("table");

}


// Fullname Validation
function fullname_validation()
{

   const fullname_value=fullname.value.trim(); 
   const fullname_valid=/^[A-Za-z]+$/;
   const fullname_err=document.getElementById('full_name_err');

   if(fullname_value=="")
   {
    fullname_err.innerHTML="Fullname is required";

   }
   else if(!fullname_valid.test(fullname_value))
   {
     fullname_err.innerHTML="Invalid Fullname";
   }
   else
   {
     fullname_err.innerHTML="";    
   }
}


//Email Validation
function email_validation()
{

  const emailAddressValue=email.value.trim(); 

  const validEmailAddress = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailAddressErr=document.getElementById('email_err');

  if (emailAddressValue=="")
  {
    emailAddressErr.innerHTML="Email address is required";
  }
  else if (!validEmailAddress.test(emailAddressValue))
  {
    emailAddressErr.innerHTML="Email address should be in a valid format with @ symbol";
  }
  else
  {
    emailAddressErr.innerHTML="";
  }

}

//Confirm Email Validation 
function c_email_validation()
{
  const c_emailAddressValue =confirmEmail.value.trim();
  const emailAddressValue=email.value.trim();

  const valid_c_email_address = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const c_emailAddressErr=document.getElementById('c_email_err');

  if (c_emailAddressValue=="")
  {
    c_emailAddressErr.innerHTML="Confirm email address is required"
  }
  else if (!valid_c_email_address.test(c_emailAddressValue))
  {
    c_emailAddressErr.innerHTML="Email address should be in a valid format with @symbol"
  }
  else if (emailAddressValue !== c_emailAddressValue)
  {
    c_emailAddressErr.innerHTML="Email and the confrim email do not match"
  }
  else
  {
    c_emailAddressErr.innerHTML="";
  }

}

//Mobile Number Validation
function mobile_number_validation()
{
  const mobile_number_value=mobileNumber.value.trim();
  const valid_mobie_number= /^[0-9]*$/;
  const mobile_number_err=document.getElementById("mobile_number_err");

  if (mobile_number_value=="")
  {
    mobile_number_err.innerHTML="Mobile number is required";
  }
  else if (!valid_mobie_number.test(mobile_number_value))
  {
    mobile_number_err.innerHTML="Mobile number must be a number";
  }
  else if (mobile_number_value.length!=10)
  {
    mobile_number_err.innerHTML="Mobile number must have atleats 10 digits";
  }
  else
  {
    mobile_number_err.innerHTML="";
  }
  
}



/*All validation*/
const Allvalidation = () => {
  const fullname_err = document.getElementById('full_name_err');
  const emailAddressErr = document.getElementById('email_err');
  const c_emailAddressErr = document.getElementById('c_email_err');
  const mobile_number_err=document.getElementById('mobile_number_err');     

  const fullname_value = fullname.value.trim();
  const emailAddressValue = email.value.trim();
  const c_emailAddressValue = confirmEmail.value.trim();
  const mobile_number_value=mobileNumber.value.trim();

  const allisvalid =
    fullname_err.innerHTML === "" &&
    emailAddressErr.innerHTML === "" &&
    c_emailAddressErr.innerHTML === "" &&
    mobile_number_err.innerHTML===""&&
    fullname_value !== "" &&
    emailAddressValue !== "" &&
    c_emailAddressValue !== ""&&
    mobile_number_value!=="";

  continue_button.disabled = !allisvalid;
};

continue_button.addEventListener("click", ()=>
{

  let summary_table=document.getElementById("sum_table");
  let rows = summary_table.getElementsByTagName("tr");
    
    let tbody = document.createElement("tbody");
    
    for (let i = 3; i < rows.length; i++) 
    {
      let newRow = document.createElement("tr");
      newRow.innerHTML = rows[i].innerHTML;
      tbody.appendChild(newRow);
    }

    localStorage.setItem("sumtableupdated" , tbody.innerHTML);

  const fullname_value = fullname.value.trim();
  const emailAddressValue = email.value.trim();
  const gender_value = gender.value.trim();
  const mobile_number_value=mobileNumber.value.trim();

  
  localStorage.setItem("fullname" , fullname_value)
  localStorage.setItem("email" , emailAddressValue)
  localStorage.setItem("gender" , gender_value)
  localStorage.setItem("Mobile Number",mobile_number_value)
})



