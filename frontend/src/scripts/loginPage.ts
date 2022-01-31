import '../styles/signIn.scss'
import fetchWrapper from "./modules/fetchWrapper";
import {ILogin} from "./interfaces/interfaces";

let inputLogin: Element = document.querySelector('.login')
let inputPassword: Element = document.querySelector('.password')
let login: string = ''
let password: string  = ''
let alert: Element = document.querySelector('.alert-wrapper')
let checkbox: Element = document.querySelector('.checkbox')
let pass: HTMLInputElement = document.querySelector('.password')
let arrow: Element = document.querySelector('.checkbox-arrow')
let checked: boolean = false;

let buttonLogin: Element = document.querySelector('.sign-in-login-button')

const isValid = (): boolean => {
    let result: boolean = true
    inputPassword.classList.remove('red')
    inputLogin.classList.remove('red')

    if (!login.trim()) {
        inputLogin.classList.add('red')
        result = false
    }
    if (!password.trim()) {
        inputPassword.classList.add('red')
        result = false
    }
    return result
}

const getUser = async (): Promise<void> => fetchWrapper.post<ILogin>('authorization', {login, password})
    .then((data: {id: string}) => redirect(data.id)).catch(() => {
        alert.classList.add('active')
        setTimeout(() => alert.classList.remove('active'), 2000)
    })

const redirect = (id: string): void => {
    window.location.href = 'index.html'
    localStorage.setItem('user', id);
}

const showPassword = (): void => {
    if (!checked) {
        arrow.classList.add('checked')
        pass.type = 'text'
        checked = true
    } else {
        arrow.classList.remove('checked')
        pass.type = 'password'
        checked = false
    }
}

inputLogin.addEventListener('keyup', (e: Event): void => {login = (<HTMLInputElement>e.target).value})
inputPassword.addEventListener('keyup', (e: Event): void => {password = (<HTMLInputElement>e.target).value})
buttonLogin.addEventListener('click', (): void => {
    if (isValid()) {
        getUser();
    }
})

if (localStorage.getItem('user')) {
    window.location.href = 'index.html'
}

checkbox.addEventListener('click', showPassword)