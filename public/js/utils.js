// utils.js - contains utility functions that manipulate the DOM.
// this script depends on jquery
// import jquery via CDN / locally in the html file before this script.

const addUser = function ({ username, country = "" }) {
    const image = country != '' ? `<img src="assets/flags/${country}.png" alt="" height="24" />` : '';

    const template = `
    <li id="online-user-${username}" class="list-group-item">
          <p class="d-flex flex-row align-items-center">
            ${username}
            <a class="ml-2">${image}</a>
          </p>
        </li>
    `;

    $('#online-users').append(template);
};

const removeUser = function ({ username }) {
    $(`#online-user-${username}`).remove();
};

const clearUsers = function () {
    $('#online-users').html(`
    <li id="online-user-admin-bot" class="list-group-item">
        <p class="d-flex flex-row align-items-center">
        admin-bot
        <a class="ml-2"><img src="assets/robot.png" alt="" height="24" /></a>
        </p>
    </li>
    `)
}

const setUserCount = function (count) {
    $('#user-count').html(count);
};

const addAdminMessage = function ({ text = "" }) {
    const template = `
        <div class="message-item message-item my-1 w-100">
        <div class="card bg-info text-light">
        <div class="card-header pt-2 pb-0">
            <h6 class="card-subtitle d-flex flex-row align-items-center">
            admin-bot
            <a class="ml-2"><img src="assets/robot.png" alt="" height="24"/></a>
            </h6>
        </div>
        <div class="card-body pt-1 pb-2">
            <p class="mb-0">${text}</p>
        </div>
        </div>
    </div>
    `;

    $('.message-items').append(template);
};

const addUserMessage = function ({ username = "", country = "", text = "", isUser = false }) {
    const alignment = isUser ? 'align-self-end' : 'align-self-start';
    const image = country != '' ? `<img src="assets/flags/${country}.png" alt="" height="24" />` : '';

    const template = `
        <div class="message-item message-item my-1 w-75 ${alignment}">
        <div class="card">
        <div class="card-header pt-2 pb-0">
            <h6 class="card-subtitle d-flex flex-row align-items-center">
            ${username}
            <a class="ml-2">${image}</a>
            </h6>
        </div>
        <div class="card-body pt-1 pb-2">
            <p class="mb-0">${text}</p>
        </div>
        </div>
    </div>
    `;

    $('.message-items').append(template);
};
