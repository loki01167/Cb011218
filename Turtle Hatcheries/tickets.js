//Calender
const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const calendarBody = document.getElementById("calendarBody");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function updateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    monthYear.textContent = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(new Date(currentYear, currentMonth, 1));

    let dayCounter = 1;
    let calendarHtml = "";

    for (let i = 0; i < 6; i++) {
        calendarHtml += "<tr>";

        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDay.getDay()) || dayCounter > daysInMonth) {
                calendarHtml += "<td></td>";
            } else {
                const date = new Date(currentYear, currentMonth, dayCounter);
                const isSelected = date.toDateString() === currentDate.toDateString() ? "selected" : "";

                calendarHtml += `<td class="${isSelected}" onclick="selectDate(this, ${dayCounter})">${dayCounter}</td>`;
                dayCounter++;
            }
        }

        calendarHtml += "</tr>";
    }

    calendarBody.innerHTML = calendarHtml;
}

function prevMonth() 
{
    currentMonth--;
    if (currentMonth < 0) 
    {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
}

function nextMonth()
 {
    currentMonth++;
    if (currentMonth > 11) 
    {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

function selectDate(cell, day) {
  const selectedCells = document.querySelectorAll(".selected");
  selectedCells.forEach(selectedCell => {
      selectedCell.classList.remove("selected");
  });

  const selectedDate = new Date(currentYear, currentMonth, day);
  const today = new Date(); // Get today's date

  // Check if the selected date is today or a future date
  if (selectedDate >= today) {
      currentDate = selectedDate;
      cell.classList.add("selected");

      // Store the selected date in local storage
      localStorage.setItem('selectedDate', currentDate.toDateString());

      // Update the displayed selected date
      selected_date.innerText = currentDate.toDateString();
  }
}







// Load stored date if available
const storedDate = localStorage.getItem('selectedDate');
if (storedDate) 
{
    currentDate = new Date(storedDate);
}

updateCalendar();

const selected_date = document.getElementById("selected_date");
selected_date.innerText=localStorage.getItem("selectedDate");

// Duration update and storing
const time = document.getElementById("time");
const selectedtime = document.getElementById("selectedtime"); // Existing element
const selectedtimes = document.getElementById("selectedduration"); // New element
const peakHours = [4, 5, 6, 9, 10, 11]; // Peak hours values

time.addEventListener("change", selectedduration);

function selectedduration() {
  localStorage.removeItem("peakHoursCount");
  localStorage.removeItem("normalHoursCount");
  const selectElement = document.getElementById("time");
  const selectedOptions = Array.from(selectElement.options).filter(option => option.selected);

  localStorage.setItem("Duration", selectedOptions.map(option => option.value).join(','));

  // Count for selected choice
  let peak_h_count = 0;
  let normal_h_count = 0;
  const total_h_count = selectedOptions.length;

  const selectedTimeTexts = selectedOptions.map(option => option.innerText);
  
  selectedTimeTexts.forEach(selectedTimeText => {
    const isSelectedPeak = peakHours.includes(Number(selectedOptions.find(option => option.innerText === selectedTimeText).value));
    if (isSelectedPeak) {
      peak_h_count++;
      localStorage.setItem("peakHoursCount" , peak_h_count);
    } else {
      normal_h_count++;
      localStorage.setItem("normalHoursCount" , normal_h_count);

    }
  });

  // Update the existing element
  selectedtime.innerText = `${selectedTimeTexts.join(', ')}`; 
  // Update the new element
  selectedtimes.innerText = `${total_h_count} hrs (${normal_h_count} Normal : ${peak_h_count} Peak)`; 
  let selectedtimeperiod = selectedtimes.innerText;
  localStorage.setItem("selectedduration" , selectedtimeperiod)
  //Storing the time to call 
  localStorage.setItem("time" , selectedtime.innerText );
  cal_charge();
}

const conti_purchase_btn = document.getElementById("conti_purchase");

conti_purchase_btn.addEventListener("click", ()=>
{
  const sum_table_store=document.getElementById("sum_table");
  localStorage.setItem("table" , sum_table_store.innerHTML)
});
/**********************************************************************************************************************************/
window.addEventListener("load" , ()=>{
  localStorage.clear();
  localStorage.setItem("normalHoursCount" , 1);
  localStorage.setItem("sl_adult_charge" , 0);
  localStorage.setItem("sl_child_charge" , 0);
  localStorage.setItem("foreigner_child_charge" , 0);
  localStorage.setItem("foreigner_adult_charge" , 10);
  localStorage.setItem("foreigneradult_count" , 1);
})
/*Guests counter*/

/*SL ADULT*/
const plus1 = document.querySelector(".plus1"),
minus1 = document.querySelector(".minus1"),
num1 = document.querySelector(".num1");

    let a = 0;

    plus1.addEventListener("click", ()=>
    {
      a++;
      a = (a < 10) ? + a : a;
      num1.innerText = a;
      localStorage.setItem("count" , num1.innerText);
      update_sl_adult();
      total_payable();
      localStorage.setItem("sladult_count" , a);
    });

    minus1.addEventListener("click", ()=>
    {
      if(a > 0)
      {
        a--;
        a = (a < 10) ? + a : a;
        num1.innerText = a;
      }
      localStorage.setItem("count" , num1.innerText);
      update_sl_adult();
      total_payable();
      localStorage.setItem("sladult_count" , a);
    });

    function update_sl_adult()
    {
      const sumtable = document.getElementById("sum_table");
      const rows = sumtable.querySelectorAll("tr");
      normal_h_count = localStorage.getItem("normalHoursCount");
      peak_h_count= localStorage.getItem("peakHoursCount");
      let foundRow = null;

      for (let i = 0; i < rows.length; i++) 
      {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        const span = cells[0].querySelector("span");
        if (cells.length === 2 && span && span.textContent === "SL Adult") 
        {
          foundRow = row;
          break;
        }
      }
      let count = localStorage.getItem("count");

      if (count > 0)
      {
      if (foundRow) 
      {
        // If a row exists, update the charge
        const charge = '$'+(((normal_h_count*4)+(peak_h_count*6))*count);
        const sl_adult_charge = (((normal_h_count*4)+(peak_h_count*6))*count);
        localStorage.setItem('sl_adult_charge' , sl_adult_charge);
        const updatedcategoryName = count + ` <span>SL Adult</span>`;
        foundRow.cells[1].innerText = charge;
        foundRow.cells[0].innerHTML = updatedcategoryName;
      } 
    else 
    {
        // If no row exists, add a new row before the Total Payable row
        const newRow = sumtable.insertRow(rows.length - 1);
        const categoryCell = newRow.insertCell(0);
        const chargeCell = newRow.insertCell(1);
        
        categoryCell.innerHTML = count + ` <span>SL Adult</span>` ;
        const sl_adult_charge = (((normal_h_count*4)+(peak_h_count*6))*count);
        localStorage.setItem('sl_adult_charge' , sl_adult_charge);
        const charge = '$'+ ((normal_h_count*4)+(peak_h_count*6))*count;
        chargeCell.innerText = charge;
    }
  } 
  else 
  {
    // Remove the row if ticketCount is zero
  for (let i = 0; i < rows.length; i++) 
  {
  const row = rows[i];
  const cells = row.getElementsByTagName("td");
  if (cells.length === 2) 
  {
    const span = cells[0].querySelector("span");
    if (span && span.textContent === "SL Adult")
     {
      sumtable.deleteRow(i);
      break;
    }
  }
  }
  }
  }
/**********************************************************************************************************************************/


/*SL CHILD*/
const plus2 = document.querySelector(".plus2"),
minus2 = document.querySelector(".minus2"),
num2 = document.querySelector(".num2");


    let b = 0;

    plus2.addEventListener("click", ()=>
    {
      b++;
      b = (b < 10) ? + b : b;
      num2.innerText = b;
      localStorage.setItem("count" , num2.innerText);
      update_sl_child();
      total_payable();
      localStorage.setItem("slchild_count" , b);
    });

    minus2.addEventListener("click", ()=>
    {
      if(b > 0)
      {
        b--;
        b = (b< 10) ? + b : b;
        num2.innerText = b;
        localStorage.setItem("count" , num2.innerText);
        update_sl_child();
        total_payable();
        localStorage.setItem("slchild_count" , b);
      }
    });


    function update_sl_child()
    {
      const sumtable = document.getElementById("sum_table");
      const rows = sumtable.querySelectorAll("tr");
      normal_h_count = localStorage.getItem("normalHoursCount");
      peak_h_count= localStorage.getItem("peakHoursCount");
      let foundRow = null;

      for (let i = 0; i < rows.length; i++) 
      {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        const span = cells[0].querySelector("span");
        if (cells.length === 2 && span && span.textContent === "SL Child") 
        {
          foundRow = row;
          break;
        }
      }
      let count = localStorage.getItem("count");

      if (count > 0)
      {
      if (foundRow) 
      {
        // If a row exists, update the charge
        const sl_child_charge =(((normal_h_count*2)+(peak_h_count*3))*count);
        localStorage.setItem('sl_child_charge' , sl_child_charge);
        const charge ='$'+ (((normal_h_count*2)+(peak_h_count*3))*count);
        const updatedcategoryName = count + ` <span>SL Child</span>`;
        foundRow.cells[1].innerText = charge;
        foundRow.cells[0].innerHTML = updatedcategoryName;
      } 
    else 
    {
        // If no row exists, add a new row before the Total Payable row
        const newRow = sumtable.insertRow(rows.length - 1);
        const categoryCell = newRow.insertCell(0);
        const chargeCell = newRow.insertCell(1);
        
        categoryCell.innerHTML = count + ` <span>SL Child</span>` ;
        const sl_child_charge =(((normal_h_count*2)+(peak_h_count*3))*count);
        localStorage.setItem('sl_child_charge' , sl_child_charge);
        const charge = '$'+((normal_h_count*2)+(peak_h_count*3))*count;
        chargeCell.innerText = charge;
    }
  } 
  else 
  {
    // Remove the row if ticketCount is zero
  for (let i = 0; i < rows.length; i++) 
  {
  const row = rows[i];
  const cells = row.getElementsByTagName("td");
  if (cells.length === 2) 
  {
    const span = cells[0].querySelector("span");
    if (span && span.textContent === "SL Child")
     {
      sumtable.deleteRow(i);
      break;
    }
  }
  }
  }
  }
/**********************************************************************************************************************************/

/*FOREIGNER ADULT*/
const plus3 = document.querySelector(".plus3"),
minus3 = document.querySelector(".minus3"),
num3 = document.querySelector(".num3");

let c = 1;

    plus3.addEventListener("click", ()=>
    {
      c++;
      c = (c < 10) ? + c : c;
      num3.innerText = c;
      localStorage.setItem("count" , num3.innerText);
      update_f_adult();
      total_payable();
      localStorage.setItem("foreigneradult_count" , c);
    });

    minus3.addEventListener("click", ()=>
    {
      if(c > 0)
      {
        c--;
        c = (c < 10) ? + c : c;
        num3.innerText = c;
        localStorage.setItem("count" , num3.innerText);
        update_f_adult();
        total_payable();
        localStorage.setItem("foreigneradult_count" , c);
      }
    });

    function update_f_adult()
    {
      const sumtable = document.getElementById("sum_table");
      const rows = sumtable.querySelectorAll("tr");
      normal_h_count = localStorage.getItem("normalHoursCount");
      peak_h_count= localStorage.getItem("peakHoursCount");
      let foundRow = null;

      for (let i = 0; i < rows.length; i++) 
      {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        const span = cells[0].querySelector("span");
        if (cells.length === 2 && span && span.textContent === "Foreigner Adult") 
        {
          foundRow = row;
          break;
        }
      }
      let count = localStorage.getItem("count");

      if (count > 0)
      {
      if (foundRow) 
      {
        // If a row exists, update the charge
        const charge = '$'+(((normal_h_count*10)+(peak_h_count*13))*count);
        const foreigner_adult_charge =(((normal_h_count*10)+(peak_h_count*13))*count);
        localStorage.setItem('foreigner_adult_charge' , foreigner_adult_charge);
        const updatedcategoryName = count + ` <span>Foreigner Adult</span>`;
        foundRow.cells[1].innerText = charge;
        foundRow.cells[0].innerHTML = updatedcategoryName;
      } 
    else 
    {
        // If no row exists, add a new row before the Total Payable row
        const newRow = sumtable.insertRow(rows.length - 1);
        const categoryCell = newRow.insertCell(0);
        const chargeCell = newRow.insertCell(1);
        
        categoryCell.innerHTML = count + ` <span>Foreigner Adult</span>` ;
        const charge = '$'+ ((normal_h_count*10)+(peak_h_count*13))*count;
        chargeCell.innerText = charge;
    }
  } 
  else 
  {
    // Remove the row if ticketCount is zero
  for (let i = 0; i < rows.length; i++) 
  {
  const row = rows[i];
  const cells = row.getElementsByTagName("td");
  if (cells.length === 2) 
  {
    const span = cells[0].querySelector("span");
    if (span && span.textContent === "Foreigner Adult")
     {
      sumtable.deleteRow(i);
      break;
    }
  }
  }
  }
  }

/**********************************************************************************************************************************/

/*FOREIGNER CHILD*/
const plus4 = document.querySelector(".plus4"),
minus4 = document.querySelector(".minus4"),
num4 = document.querySelector(".num4");

let d = 0;

    plus4.addEventListener("click", ()=>
    {
      d++;
      d = (d < 10) ? + d : d;
      num4.innerText = d;
      localStorage.setItem("count" , num4.innerText);
      update_f_child();
      total_payable();
      localStorage.setItem("foreignerchild_count" , d);
    });

    minus4.addEventListener("click", ()=>
    {
      if(d > 0)
      {
        d--;
        d = (d < 10) ? + d : d; 
        num4.innerText = d;
        localStorage.setItem("count" , num4.innerText);
        update_f_child();
        total_payable();
        localStorage.setItem("foreignerchild_count" , d);
      }
    });

    function update_f_child()
    {
      const sumtable = document.getElementById("sum_table");
      const rows = sumtable.querySelectorAll("tr");
      normal_h_count = localStorage.getItem("normalHoursCount");
      peak_h_count= localStorage.getItem("peakHoursCount");
      let foundRow = null;

      for (let i = 0; i < rows.length; i++) 
      {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        const span = cells[0].querySelector("span");
        if (cells.length === 2 && span && span.textContent === "Foreigner Child") 
        {
          foundRow = row;
          break;
        }
      }
      let count = localStorage.getItem("count");

      if (count > 0)
      {
      if (foundRow) 
      {
        // If a row exists, update the charge
        const charge = '$'+(((normal_h_count*5)+(peak_h_count*8))*count);
        const foreigner_child_charge = (((normal_h_count*5)+(peak_h_count*8))*count);
        localStorage.setItem('foreigner_child_charge' , foreigner_child_charge);
        const updatedcategoryName = count + ` <span>Foreigner Child</span>`;
        foundRow.cells[1].innerText = charge;
        foundRow.cells[0].innerHTML = updatedcategoryName;
      } 
    else 
    {
        // If no row exists, add a new row before the Total Payable row
        const newRow = sumtable.insertRow(rows.length - 1);
        const categoryCell = newRow.insertCell(0);
        const chargeCell = newRow.insertCell(1);
        
        categoryCell.innerHTML = count + ` <span>Foreigner Child</span>` ;
        const charge = '$'+((normal_h_count*5)+(peak_h_count*8))*count;
        const foreigner_child_charge = (((normal_h_count*5)+(peak_h_count*8))*count);
        localStorage.setItem('foreigner_child_charge' , foreigner_child_charge);
        chargeCell.innerText = charge;
    }
  } 
  else 
  {
    // Remove the row if ticketCount is zero
  for (let i = 0; i < rows.length; i++) 
  {
  const row = rows[i];
  const cells = row.getElementsByTagName("td");
  if (cells.length === 2) 
  {
    const span = cells[0].querySelector("span");
    if (span && span.textContent === "Foreigner Child")
     {
      sumtable.deleteRow(i);
      break;
    }
  }
  }
  }
  }

/**********************************************************************************************************************************/


/*INFANT*/
const plus5 = document.querySelector(".plus5"),
minus5 = document.querySelector(".minus5"),
num5 = document.querySelector(".num5");

let e = 0;

    plus5.addEventListener("click", ()=>
    {
      e++;
      e = (e < 10) ? + e : e;
      num5.innerText = e;
      localStorage.setItem("count" , num5.innerText);
      update_infant();
      total_payable();
      localStorage.setItem("infant_count" , e);
    });

    minus5.addEventListener("click", ()=>
    {
      if(e > 0)
      {
        e--;
        e = (e < 10) ? + e : e;
        num5.innerText = e;
        localStorage.setItem("count" , num5.innerText);
        update_infant();
        total_payable();
        localStorage.setItem("infant_count" , e);
      }
    });

    function update_infant()
    {
      const sumtable = document.getElementById("sum_table");
      const rows = sumtable.querySelectorAll("tr");
      normal_h_count = localStorage.getItem("normalHoursCount");
      peak_h_count= localStorage.getItem("peakHoursCount");
      let foundRow = null;

      for (let i = 0; i < rows.length; i++) 
      {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        const span = cells[0].querySelector("span");
        if (cells.length === 2 && span && span.textContent === "Infant") 
        {
          foundRow = row;
          break;
        }
      }
      let count = localStorage.getItem("count");

      if (count > 0)
      {
      if (foundRow) 
      {
        // If a row exists, update the charge
        const charge ='Free';
        const updatedcategoryName = count + ` <span>Infant</span>`;
        foundRow.cells[1].innerText = charge;
        foundRow.cells[0].innerHTML = updatedcategoryName;
      } 
    else 
    {
        // If no row exists, add a new row before the Total Payable row
        const newRow = sumtable.insertRow(rows.length - 1);
        const categoryCell = newRow.insertCell(0);
        const chargeCell = newRow.insertCell(1);
        
        categoryCell.innerHTML = count + ` <span>Infant</span>` ;
        const charge ='Free';
        chargeCell.innerText = charge;
    }
  } 
  else 
  {
    // Remove the row if ticketCount is zero
  for (let i = 0; i < rows.length; i++) 
  {
  const row = rows[i];
  const cells = row.getElementsByTagName("td");
  if (cells.length === 2) 
  {
    const span = cells[0].querySelector("span");
    if (span && span.textContent === "Infant")
     {
      sumtable.deleteRow(i);
      break;
    }
  }
  }
  }
  }


  //Total Payable

  
  function total_payable()
  {
    const sl_adult_charge=parseInt(localStorage.getItem('sl_adult_charge'));
    const sl_child_charge=parseInt(localStorage.getItem('sl_child_charge'));
    const foreigner_adult_charge=parseInt(localStorage.getItem('foreigner_adult_charge'));
    const foreigner_child_charge=parseInt(localStorage.getItem('foreigner_child_charge'));
    const tot_pay = document.getElementById("tot_pay");

    const total_pay=(sl_adult_charge+sl_child_charge+foreigner_adult_charge+foreigner_child_charge);
    tot_pay.innerText = "$" + total_pay;
    localStorage.setItem("totalpayable" , tot_pay.innerText);
    console.log(total_pay);
  }

  function cal_charge(){
    const sumtable = document.getElementById("sum_table");
    const rows = sumtable.querySelectorAll("tr");
    normal_h_count = localStorage.getItem("normalHoursCount");
    peak_h_count= localStorage.getItem("peakHoursCount");

    for (let i = 0; i < rows.length; i++) 
      {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        const span = cells[0].querySelector("span");
        if (span){
           const guest = span.innerText;
           if (guest === "SL Adult"){
            count = parseInt(localStorage.getItem("sladult_count"));
            const charge = '$'+ ((normal_h_count*4)+(peak_h_count*6))*count;
            chargeCell = cells[1];
            chargeCell.innerText = charge;
            const sl_adult_charge = (((normal_h_count*4)+(peak_h_count*6))*count);
            localStorage.setItem('sl_adult_charge' , sl_adult_charge);

           }
           else if (guest === "SL Child"){
            count = parseInt(localStorage.getItem("slchild_count"));
            const charge ='$'+ (((normal_h_count*2)+(peak_h_count*3))*count);
            chargeCell = cells[1];
            chargeCell.innerText = charge;
            const sl_child_charge =(((normal_h_count*2)+(peak_h_count*3))*count);
            localStorage.setItem('sl_child_charge' , sl_child_charge);
            
           }
           else if (guest === "Foreigner Adult"){
            count = parseInt(localStorage.getItem("foreigneradult_count"));
            const charge = '$'+(((normal_h_count*10)+(peak_h_count*13))*count);
            chargeCell = cells[1];
            chargeCell.innerText = charge;
            const foreigner_adult_charge =(((normal_h_count*10)+(peak_h_count*13))*count);
            localStorage.setItem('foreigner_adult_charge' , foreigner_adult_charge);

           }
           else if (guest === "Foreigner Child"){
            count = parseInt(localStorage.getItem("foreignerchild_count"));
            const charge = '$'+(((normal_h_count*5)+(peak_h_count*8))*count);
            chargeCell = cells[1];
            chargeCell.innerText = charge;
            const foreigner_child_charge = (((normal_h_count*5)+(peak_h_count*8))*count);
            localStorage.setItem('foreigner_child_charge' , foreigner_child_charge);
           }
        }
        
      }
      total_payable();





  }