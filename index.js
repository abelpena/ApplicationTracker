const appsURL = `http://localhost:3000/Applications`
const appContainer = document.querySelector('#app-container')

document.addEventListener('DOMContentLoaded', function() {

  appContainer.innerHTML += `
  <table id='apps' style="width:100%">
  <thead>
    <th>Employer</th>
    <th>Position</th> 
    <th>Application Date</th>
    <th>Response</th>
    <th>ID</th>
    </tr>
  </table>`
 })
 const appForm = document.querySelector('#app-form')
 const apps = document.querySelector('#apps')

appForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const employerInput = appForm.querySelector('#employer').value;
  const positionInput = appForm.querySelector('#position').value;
  const dateInput = appForm.querySelector('#date').value;
  
  const responseInput = appForm.querySelector('#response').value;
  console.log(dateInput);

  //use this to restructure date format


var [yyyy, mm, dd] = dateInput.split("-");

var revdate = `${mm}/${dd}/${yyyy}`;

console.log(revdate)
  fetch(`${appsURL}`, {
    method: 'post',
    body: JSON.stringify({
      Employer: employerInput,
      Position: positionInput,
      Date: revdate,
      Response: responseInput
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

// apps.addEventListener('click',(e) =>{
//   if (e.target.dataset.action == 'edit'){
//     console.log('edit');
//   }
//   else if (e.target.dataset.action == 'delete'){
//     console.log('delete');
//   }
// })


$(document).ready(function() {

  let table = $('#apps').DataTable({
    ajax: {
      url: appsURL,
      dataSrc: ""
    },
    columns: [
      {
        data: "Employer"
      },
      {
        data: "Position"
      },
      {
        data: "Date"
      },
      {
        data: "Response"
      },
      {
        data: "id",
        render: function(data){
          return '<button class="btn-primary js-update" data-action="update" data-id='+data+'">Update</button> <button class="btn-danger js-delete" data-action="delete" data-id='+data+'">Delete</button>';
        }
      }
    ]
    
  });
  table.on('click', function (e) {
    console.log(e.target.dataset.action);
  })
}
  


);

