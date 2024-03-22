const localStorageKey = 'userData';
const timeToLive = 60; // tiempo de vida en segundos

function getUserData() {
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const data = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const storedTime = new Date(data.timestamp).getTime();
    const timeDifference = (currentTime - storedTime) / 1000;
    if (timeDifference < timeToLive) {
      return data.data;
    }
  }
  return null;
}

function setUserData(data) {
  const userData = {
    timestamp: new Date().getTime(),
    data
  };
  localStorage.setItem(localStorageKey, JSON.stringify(userData));
}

function fetchUserData() {
  fetch('https://reqres.in/api/users?delay=3')
    .then(response => response.json())
    .then(data => {
      setUserData(data.data);
      displayUserData(data.data);
    })
    .catch(error => console.error('Error:', error));
}

function displayUserData(data) {
  const tbody = document.querySelector('#user-table tbody');
  tbody.innerHTML = '';
  data.forEach(user => {
    const row = document.createElement('tr');
    const avatarCell = document.createElement('td');
    const avatarImg = document.createElement('img');
    avatarImg.src = user.avatar;
    avatarImg.classList.add('avatar');
    avatarCell.appendChild(avatarImg);
    row.appendChild(avatarCell);
    row.appendChild(document.createElement('td')).textContent = user.email;
    row.appendChild(document.createElement('td')).textContent = user.last_name;
    row.appendChild(document.createElement('td')).textContent = user.first_name;
    row.appendChild(document.createElement('td')).textContent = user.id;
    tbody.appendChild(row);
  });
  tbody.parentElement.style.display = 'table';
}

const readUsersBtn = document.querySelector('#read-users-btn');
readUsersBtn.addEventListener('click', () => {
  const userData = getUserData();
  if (userData) {
    displayUserData(userData);
  } else {
    fetchUserData();
  }
});
readUsersBtn.addEventListener('click', () => {
  const userData = getUserData();
  if (userData) {
    displayUserData(userData);
  } else {
    fetchUserData();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const userData = getUserData();
  if (userData) {
    displayUserData(userData);
  }
});
