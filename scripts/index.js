// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const teacherItems = document.querySelectorAll('.teacher');


const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    else if (user.teacher) {
      teacherItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'Admin' : (user.teacher ? "Teacher" : "Student")}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    teacherItems.forEach(item => item.style.display = 'none');
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      // console.log(guide);
      // console.log(guide.filepath.includes(".mp4"));
      if (guide.filepath && guide.filepath.includes(".mp4")) {
        var media = '<video width="320" height="240" controls><source src="' + guide.filepath + '"type="video/mp4"></video>'
      }
      else if (guide.filepath) {
        var media = "<img class='center' src =" + guide.filepath + "/>"
      }
      const li = `
        <li>
          <h2 class="collapsible-header"> ${guide.title} - Date : ${new Date(guide.timestamp).toDateString()}</h1>
          <div class="collapsible-body"> 
            <p>${guide.content}</p> 
            <div class = "center">${media ? media : ""}</div>
          </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to as Student or Teacher to  view guides</h5>';
  }


};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});