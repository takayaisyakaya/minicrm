document.addEventListener('DOMContentLoaded', () => {
   const guestBook = document.querySelector('#guestBook');
   const crmTableBody = document.querySelector('#crmTable tbody');

   const usersList = [];

   function clearCrmTable() {
      crmTableBody.innerHTML = '';
   }

   fillCrmTable();


   function fillCrmTable() {
      clearCrmTable();

      const usersList = JSON.parse(localStorage.getItem('user'))

      if (usersList.length > 0) {
         usersList.forEach((item) => {
            const tableRow = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');

            td1.textContent = item.name;
            td2.textContent = item.email;
            td3.textContent = item.age;

            tableRow.appendChild(td1);
            tableRow.appendChild(td2);
            tableRow.appendChild(td3);

            crmTableBody.appendChild(tableRow);
         })
      }
   }

   if (guestBook) {
      guestBook.addEventListener('submit', (e) => {
         e.preventDefault();
         const guestName = guestBook.querySelector('input[id=name]').value;
         const guestAge = guestBook.querySelector('input[id=age]').value;
         const guestEmail = guestBook.querySelector('input[id=email]').value;

         const user = {
            name: guestName,
            age: guestAge,
            email: guestEmail
         }

         let usersList = JSON.parse(localStorage.getItem('user'));
         usersList.push(user);

         localStorage.setItem('user', JSON.stringify(usersList))

         guestBook.reset();

         fillCrmTable();
      })
   }
})