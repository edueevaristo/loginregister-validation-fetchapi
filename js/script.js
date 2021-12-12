const init = () => {               //função init para chamar quando o window carregar// 
    const validadeEmail = (event) => {   
        const input = event.currentTarget;
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const emailTest = regex.test(input.value);

        if(!emailTest) {
            submitButton.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        } else {
            submitButton.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
        }
    }

    const validatePassword = (event) => {
        const input = event.currentTarget;
        if(input.value.length < 8) {
            submitButton.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        } else {
            
        }
    }
    const inputEmail = document.querySelector('input[type="email"]');   // função para chamar o input "email" //
    const inputPassword = document.querySelector('input[type="password"]');   // função para chamar o input "password" // 
    const submitButton = document.querySelector('.login__submit');  // função para chamar a class login__submit // 

    inputEmail.addEventListener('input', validadeEmail);
    inputPassword.addEventListener('input', validatePassword);

    const errorHandler = () => {
        submitButton.classList.remove('success');
        submitButton.classList.add('error');
        submitButton.textContent = "Erro: Login ou senha incorretos :("

    }

    const successHandler = () => {
        submitButton.classList.remove('error');
        submitButton.classList.add('success');
        submitButton.textContent = "Logado com sucesso!"

    }

    if(submitButton) {      //criando função para declar existência do submitButton ao clicar no mesmo //
        submitButton.addEventListener('click' , (event) => {   // adicionando evento de click // 
            event.preventDefault();    // adicionando o event, que vai prevenir qualquer comportamento do botão //

            submitButton.textContent = "...Loading";

            fetch('https://reqres.in/api/login' , { // validando os dados com FECTH API (reqres) // 
                method: 'POST' , // método de envio //
                headers: {
                    'Content-Type': 'application/json'      // informando o tipo de arquivo a ser enviado para a API //
                },
                body: JSON.stringify ({
                    email: inputEmail.value, 
                    password: inputPassword.value,
                })
            }).then((response) => {    // função utilizada para passar o método de callback, será chamada apenas quando a promise for resolvida com sucesso //
                if (response.status !== 200) { // se os dados informados em login e senha não forem iguais a 200 da resposta da API, o retorno será em errorHandler //
                   return errorHandler(); // inserindo return para encerrar o evento e não dar seguimento diretamente para o success //
                }
                successHandler(); // se os dados informados em login e senha forem iguais a 200 da resposta da API, o retorno será em successHandler //
            }).catch(() => {
                errorHandler(); // utiliza-se o catch para pegar qualquer erro apresentado. //
            })
        })
    }
}
window.onload = init;

