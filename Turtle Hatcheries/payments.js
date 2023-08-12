const card_num = document.getElementById("card_number");
const exp_date = document.getElementById("exp_date");
const cvc_cvv = document.getElementById("cvc_cvv");
const name_card = document.getElementById("name_on_card");
const pay_button = document.getElementById("pay_button");
const summary_table=document.getElementById("sum_table");
const pay_text=document.getElementById("pay_text");



//Adding event listners
card_num.addEventListener("input", () => 
{
  cardnumber_validation();
  Allvalidation();
});

exp_date.addEventListener("input",()=>
{
   exp_date_validation();
   Allvalidation();

});

cvc_cvv.addEventListener("input",()=>
{
   cvc_cvv_validation();
   Allvalidation();
})

name_card.addEventListener("input",()=>
{
   name_card_validation();
   Allvalidation();
})
//Load summary table
window.addEventListener("load",load_summary_table);
function load_summary_table()
{
  summary_table.innerHTML = localStorage.getItem("table");
}

//Load the text on the button
window.addEventListener("load",pay_load);
function pay_load()
{

}
//Card Number Validation
function cardnumber_validation()
{
   const card_number_value= card_num.value.trim();
   const card_num_reg = /^[0-9]+$/;
   const card_number_err=document.getElementById('card_number_err');


   if (card_number_value==="")
   {
      card_number_err.innerHTML="Card number is required";
   }
   else if (!card_num_reg.test(card_number_value))
   {
      card_number_err.innerHTML="Invalid card number";
   }
   else if (card_number_value.length !== 16)
   {
      card_number_err.innerHTML="Invalid card number";
   }
   else
   {
      card_number_err.innerHTML="";  
   }

}

//Expiry Date validation
function exp_date_validation()
{
   const exp_date_value = exp_date.value.trim();
   const expiry_date_reg = /^(0[1-9]|1[0-2])\/\d{2}$/;
   const exp_date_err=document.getElementById("exp_date_err");


   const currentDate = new Date();
   const [enteredMonth, enteredYear] = exp_date_value.split('/').map(item => parseInt(item, 10));
   const currentYear = currentDate.getFullYear() % 100;
   const currentMonth = currentDate.getMonth() + 1;

   if (exp_date_value==="")
   {
      exp_date_err.innerHTML="Expiry date is required";
   }
   else if (!expiry_date_reg.test(exp_date_value))
   {
      exp_date_err.innerHTML="Invalid Expiry Date (use MM/YY format)"
   }
   else if (enteredYear < currentYear || (enteredYear === currentYear && enteredMonth < currentMonth))
    {
      exp_date_err.innerHTML="Card has expired";
    }
    else
    {
      exp_date_err.innerHTML="";  

    }
   
}

//CVC CVV Validation
function cvc_cvv_validation()
{
     const cvc_cvv_value=cvc_cvv.value.trim();
     const cvc_cvv_reg = /^[0-9]+$/;
     const cvc_cvv_err=document.getElementById("cvc_cvv_err");

     if (cvc_cvv_value==="")
     {
        cvc_cvv_err.innerHTML="CVC/CVV is required";
     }
     else if (!cvc_cvv_reg.test(cvc_cvv_value)) 
     {
         cvc_cvv_err.innerHTML = "Invalid CVC/CVV";
     }
     else if (cvc_cvv_value.length !== 3) 
     {
      cvc_cvv_err.innerHTML = "Invalid CVC/CVV";
     }
     else
     {
      cvc_cvv_err.innerHTML = "";
     }
}

//Name on card validation 
function name_card_validation()
{
   const name_card_value=name_card.value.trim();
   const card_name_reg = /^[A-Za-z ]+$/;
   const cardname_err=document.getElementById("card_name_err");

   if (name_card_value==="")
   {
      cardname_err.innerHTML="Card name is required";
   }
   else if (!card_name_reg.test(name_card_value)) 
   {
      cardname_err.innerHTML="Invalid Card Name (use only alphabetic characters)";
   }
   else
   {
      cardname_err.innerHTML="";
   }
}


/*All validation*/
const Allvalidation = () => 
{

   const card_number_err=document.getElementById('card_number_err');
   const exp_date_err=document.getElementById("exp_date_err");
   const cvc_cvv_err=document.getElementById("cvc_cvv_err");
   const cardname_err=document.getElementById("card_name_err");

   const card_number_value= card_num.value.trim();
   const exp_date_value = exp_date.value.trim();
   const cvc_cvv_value=cvc_cvv.value.trim();
   const name_card_value=name_card.value.trim();

 
   const allisvalid =(
      card_number_err.innerHTML===""&&
      exp_date_err.innerHTML===""&&
      cvc_cvv_err.innerHTML===""&&
      cardname_err.innerHTML===""&&
      card_number_value!==""&&
      exp_date_value!==""&&
      cvc_cvv_value!==""&&
      name_card_value!==""
      );
      

   pay_button.disabled = !allisvalid;
 };

 
      pay_button.addEventListener("click", ()=>{
      const card_number_value= card_num.value.trim();
      const exp_date_value = exp_date.value.trim();
      const cvc_cvv_value=cvc_cvv.value.trim();
      const name_card_value=name_card.value.trim();

   
 
 })

 //Load total payable to the button
window.addEventListener("load",load_pay);

function load_pay()
{
   pay_text.innerText= localStorage.getItem("totalpayable");

}



