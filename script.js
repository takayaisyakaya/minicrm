document.addEventListener('DOMContentLoaded', () => {
   const guestBook = document.querySelector('#guestBook');
   const crmTableBody = document.querySelector('#crmTable tbody');

   function clearCrmTable() {
      crmTableBody.innerHTML = '';
   }

   function fillCrmTable() {
      clearCrmTable();
      const usersList = JSON.parse(localStorage.getItem('user')) || [];

      usersList.forEach(item => {
         const tableRow = document.createElement('tr');
         const td1 = document.createElement('td');
         const td2 = document.createElement('td');
         const td3 = document.createElement('td');

         td1.textContent = item.name;
         td2.textContent = item.email;
         td3.textContent = item.age;

         tableRow.append(td1, td2, td3);
         crmTableBody.appendChild(tableRow);
      });
   }

   fillCrmTable();

   function showError(fieldSelector, message) {
      let errorSpan = fieldSelector.nextElementSibling;
      if (!errorSpan || !errorSpan.classList.contains('error')) {
         errorSpan = document.createElement('span');
         errorSpan.classList.add('error','hidden');
         fieldSelector.insertAdjacentElement('afterend', errorSpan);
      }
      errorSpan.textContent = message;
      errorSpan.classList.remove('hidden');
   }

   function hideError(fieldSelector) {
      const errorSpan = fieldSelector.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains('error')) {
         errorSpan.textContent = '';
         errorSpan.classList.add('hidden');
      }
   }

   
   function validateEmptyField(fieldSelector, message = 'Поле обязательно для заполнения') {
      if (fieldSelector.value.trim() === '') {
         showError(fieldSelector, message);
         return false;
      } else {
         hideError(fieldSelector);
         return true;
      }
   }

   function validateName(fieldSelector, minLength = 2, maxLength = 20) {
      const trimmedName = fieldSelector.value.trim();

      if (trimmedName.length < minLength) {
         showError(fieldSelector, `Имя должно содержать минимум ${minLength} символа`);
         return false;
      }

      if (trimmedName.length > maxLength) {
         showError(fieldSelector, `Имя должно содержать не более ${maxLength} символов`);
         return false;
      }

      hideError(fieldSelector);
      return true;
   }

   function checkEmail(emailField) {
      const email = emailField.value.trim();
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!regex.test(email)) {
         showError(emailField, 'Email не того формата');
         return false;
      }

      hideError(emailField);
      return true;
   }

   
   if (guestBook) {
      guestBook.addEventListener('submit', (e) => {
         e.preventDefault();

         const guestName = guestBook.querySelector('input[id=name]');
         const guestAge = guestBook.querySelector('input[id=age]');
         const guestEmail = guestBook.querySelector('input[id=email]');

         let isValid = true;

         if (!validateEmptyField(guestName, 'Пожалуйста, заполните имя')) isValid = false;
         if (!validateName(guestName, 2, 20)) isValid = false;

         if (!validateEmptyField(guestEmail, 'Пожалуйста, заполните email')) isValid = false;
         if (!checkEmail(guestEmail)) isValid = false;

         if (!isValid) return; 

         const user = {
            name: guestName.value.trim(),
            age: guestAge.value.trim(),
            email: guestEmail.value.trim()
         };

         const usersList = JSON.parse(localStorage.getItem('user')) || [];
         usersList.push(user);
         localStorage.setItem('user', JSON.stringify(usersList));

         guestBook.reset();
         fillCrmTable();
      });
   }
});