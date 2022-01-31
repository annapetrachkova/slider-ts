import '../styles/singleCard.scss'
import {checkUsername} from "./modules/appendHeaderButton";
import fetchWrapper from "./modules/fetchWrapper";
import {TData, TSubtitle} from "./interfaces/interfaces";


let index: number = +window.location.href.split('=')[1]
let container: Element = document.querySelector('.single-card-container')

let getMonthByNumber: string[] = ["January", "February",  "March", "April", "May", "June",
    "July","August", "September", "October", "November", "December"];

const getCard = async (): Promise<void> => fetchWrapper.post<{index: number}>('single-card', {index})
    .then((data: {data: TData}) => loadCardInfo(data.data))

const id: string = localStorage.getItem('user')
const getUser = () => fetchWrapper.post('current', {id})
    .then(data => {
        checkUsername(data.user)
    })

const generateDate = (date: Date): string => {
    date = new Date(date)
    let day: number = date.getDate();
    let month: number = date.getMonth();
    let year: number = date.getFullYear();

    return `${getMonthByNumber[month]} ${day}, ${year}`;
}

const loadCardInfo = (card: TData): void => {
    let img: HTMLImageElement = document.createElement('img')
    img.className = 'single-card-img';
    if (typeof card.img === "string") {
        img.src = card.img;
    }
    img.alt = 'picture';

    let h: Element = document.createElement('h3')
    h.textContent = card.title
    h.className = 'single-card-title'
    container.append(img)
    container.append(h)

    card.subtitle.forEach((item: TSubtitle) => {
        let div: Element = document.createElement('div')
        div.className = 'single-card-info'
        let subtitle: Element = document.createElement('h5')
        subtitle.className = 'single-card-subtitle'
        subtitle.textContent = item.article[0]
        div.append(subtitle)
        item.article.slice(1).forEach((option: string) => {
            let p = document.createElement('p')
            p.className = 'single-card-text'
            p.textContent = option
            div.append(p)
        })
        container.append(div)
    })

    let underline: Element = document.createElement('div')
    underline.className = 'underline'

    let divAuthorDate: Element = document.createElement('div')
    divAuthorDate.className = 'info-author-date'
    let pAuthor: Element = document.createElement('p')
    pAuthor.className = 'author'
    pAuthor.textContent = card.author
    let pDate: Element = document.createElement('p')
    pDate.className = 'date'

    pDate.textContent = generateDate(card.date)
    divAuthorDate.append(pAuthor)
    divAuthorDate.append(pDate)

    let divTags: Element = document.createElement('div')
    divTags.className = 'single-tags'

    card.tags.forEach((item: string) => {
        let aTagOne: HTMLAnchorElement = document.createElement('a')
        aTagOne.className = 'tag tag-margin-right'
        aTagOne.href = `pageSingleTag.html?tag=${item.replace( /\s/g, "_")}`
        let pTagOne: Element = document.createElement('p')
        pTagOne.textContent = `${item}`;
        aTagOne.append(pTagOne)
        divTags.append(aTagOne)
    })

    container.append(underline)
    container.append(divAuthorDate)
    container.append(divTags)
}

getCard();
if (id) {
    getUser();
} else {
    checkUsername();
}