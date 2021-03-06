(()=>{

    const election = require('electron');
    const ipcRenderer = election.ipcRenderer;
    const SocketEvent = require('././handlerManager/event/SocketEvent');
    ipcRenderer.on(SocketEvent.HELLO,(event,message) =>{
        console.log(message);
    });

    const userIdInput=  document.getElementById('user-id-input');
    const userPasswordInput = document.getElementById('user-password-input');

    const signInButton = document.getElementById('button-SignIn');
    const signUpButton = document.getElementById('button-SignUp');

    const hidePage = document.getElementById('hide-page');
    /**
     * 로그인 시
     */
    signInButton.addEventListener('click', () =>{
        console.log('click');
        const id = userIdInput.value;
        const password = userPasswordInput.value;
        const parameter = {
            id : id,
            password : password
        };
        ipcRenderer.send('signInRequest', parameter);
    });

    ipcRenderer.on('signInRequest-Success',(event,message)=>{
        console.log(message);
        alert("로그인 성공");
        ipcRenderer.send('displayWaitDialog',message);
    });

    ipcRenderer.on('signInRequest-Failed',(event,message)=>{
        console.log(message);
        alert(message.statusText);
        ipcRenderer.send('displayWaitDialog',message);
    });

    ipcRenderer.on('hide-page', (event,message)=>{
        hidePage.classList.toggle('on')
    });
    /**
     * 회원가입 시
     */
    signUpButton.addEventListener('click', () =>{
        ipcRenderer.send('displaySignUpModal');
    });

})();