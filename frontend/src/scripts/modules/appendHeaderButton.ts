import {TUser} from "../interfaces/interfaces";

const header: Element = document.querySelector('.header-container')

 const cleanHeader = (): void => {
     let a: Element = document.querySelector('.button-sign-in-wrapper')
     if (a) a.remove();
 }

export const checkUsername = (user?: TUser, page?: string): void => {
    if (user) {
        cleanHeader();
        let div: HTMLDivElement = document.createElement('div')
        div.className = 'header-user'

        if (page !== 'createPost') {
            let a = document.createElement('a')
            a.href = 'createPost.html'
            a.className = 'button-sign-in-wrapper'

            let button = document.createElement('button')
            button.className = 'button-sign-in'
            button.textContent = 'Create a Post'

            a.append(button)
            div.append(a)
        }

        let img: HTMLImageElement = document.createElement('img')
        img.className = 'user-image'
        img.alt = 'user'
        img.src = user.img

        div.append(img)
        header.append(div)
    } else {
        cleanHeader();
        let a: HTMLAnchorElement = document.createElement('a')
        a.href = 'signIn.html'
        a.className = 'button-sign-in-wrapper'

        let button: HTMLButtonElement = document.createElement('button')
        button.className = 'button-sign-in'
        button.textContent = 'Sign In'

        a.append(button)
        header.append(a)
    }
 }

 export default {checkUsername}