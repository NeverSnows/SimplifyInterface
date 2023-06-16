
const DataBaseManagement = {
    checkUserInfo(username, password){
        //Acessa o BD e checa se ha um usuario com essa senha e nome. Se sim, deve retornar true, se nao, false.
        return true; //valor temporario.
    }
};

const Login = {
    validateFields(){
        username = document.getElementById('login-username').value;
        password = document.getElementById('login-password').value;
        if(username == '' || password == ''){
            console.log(username, password);
            return false;
        }
        return true;
    },

    validateUser(){
        username = document.getElementById('login-username').value;
        password = document.getElementById('login-password').value;
        if(Login.validateFields() && DataBaseManagement.checkUserInfo(username, password)){
            Login.makeLogin();
        }
    },

    makeLogin(){
        window.open("post-login.html", "_self");
    },
}

const EventListeners = {
    //Deve ser chamdo apenas uma vez no começo do programa, para evitar duplicidade de event listeners.
    subscribeFixedEventListeners(){
        document.getElementById('login-btn').addEventListener('click', Login.validateUser)
    },
}

EventListeners.subscribeFixedEventListeners();