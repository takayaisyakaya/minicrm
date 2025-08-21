document.addEventListener('DOMContentLoaded', () => {
   const guestBook = document.querySelector('#guestBook');
   const crmTableBody = document.querySelector('#crmTable tbody');

   function clearCrmTable() {
      crmTableBody.innerHTML = '';
   }

   fillCrmTable();

   function fillCrmTable() {
      clearCrmTable();

      const usersList = JSON.parse(localStorage.getItem('user')) || [];

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

   function checkEmail(email, message) {
      if (email.match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) === null) {
         alert(message)
         return false;
      } else {
         return true;
      }
   };

   function validateEmptyField(fieldSelector, message = 'Поле обязательно для заполнения') {
      if (fieldSelector.value.trim() === '') {
         alert(message)
         return false;
      } else {
         return true;
      }
   }

   function validateName(name, minLength = 2, maxLength = 20) {
      const trimmedName = name.trim();

      if (trimmedName.length < minLength) {
         alert(`Имя должно содержать минимум ${minLength} символа`);
         return false;
      }

      if (trimmedName.length > maxLength) {
         alert(`Имя должно содержать не более ${maxLength} символов`);
         return false;
      }

      return true;
   }

   if (guestBook) {
      guestBook.addEventListener('submit', (e) => {
         e.preventDefault();
         const guestName = guestBook.querySelector('input[id=name]');
         const guestAge = guestBook.querySelector('input[id=age]');
         const guestEmail = guestBook.querySelector('input[id=email]');

         /* Валидация */
         if (!validateEmptyField(guestName, 'Пожалуйста заполните имя')) {
            console.error('Валидация имени не прошла');
            return false;
         } else if (!validateName(guestName.value, 2, 20)) {
            console.error('Имя не прошло проверку по длине');
            return false;
         } else if (!validateEmptyField(guestEmail, 'Пожалуйста, заполните email')) {
            console.error('Валидация email не прошла');
            return false;
         } else if (!checkEmail(guestEmail.value, 'Email не того формата')) {
            console.error('Email не того формата');
            return false;
         }

         const user = {
            name: guestName.value.trim(),
            age: guestAge.value.trim(),
            email: guestEmail.value.trim()
         }

         let usersList = JSON.parse(localStorage.getItem('user')) || [];
         usersList.push(user);

         localStorage.setItem('user', JSON.stringify(usersList));

         guestBook.reset();

         fillCrmTable();
      })
   }
})