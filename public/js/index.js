// this script depends on utils.js
// import utils.js in the html file before this script.
const HOST = window.location.host;
const WS_URL = window.location.protocol == "https:" ? `wss://${HOST}/` : `ws://${HOST}/`;

const ws = new WebSocket(WS_URL);
let myUser = { username: "", country: "" };

const messageHandler = function (e) {
    const msg = JSON.parse(e.data);

    if (msg.type == "WELCOME") {
        myUser = msg.receiver;
    }

    if (msg.type == "UPDATE_STATE") {
        const users = msg.state.users;
        $('#user-count').html(users.length);
        clearUsers();
        users.forEach((user) => {
            if (user.username == myUser.username) {
                addUser({
                    username: `${myUser.username} (you)`,
                    country: myUser.country
                });
            }
            else {
                addUser(user);
            }
        })
    }

    if (msg.type == "ERROR" || msg.type == "ADMIN_MESSAGE") {
        addAdminMessage(msg);
    }

    if (msg.type == "USER_MESSAGE") {
        addUserMessage({
            username: msg.sender.username,
            country: msg.sender.country,
            text: msg.text,
            isUser: false,
        });
    }
};

ws.addEventListener("message", messageHandler);

$('form').submit(function (e) {
    e.preventDefault();
    console.log(e);

    const text = $('form input').val();
    $('form')[0].reset();

    if (!text) { return }

    ws.send(JSON.stringify({ text }));
    addUserMessage({
        username: `${myUser.username} (you)`,
        country: myUser.country,
        text,
        isUser: true,
    });

})
