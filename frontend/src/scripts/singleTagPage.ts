import '../styles/singleTagPage.scss'
import fetchWrapper from "./modules/fetchWrapper";
import {searchTags} from "./constants/constants";
import {checkUsername} from "./modules/appendHeaderButton";
import {debounce} from "./modules/debounce";
import {insertCard} from "./modules/insertCard";
import {TData, TTag} from "./interfaces/interfaces";

let tagName: string = window.location.href.split('=')[1].split('_').join(' ')
let container: Element = document.querySelector('.page-with-tag-container');
let cardsContainer: Element = document.querySelector('.cards-container')
let noArticles: Element = document.querySelector('.no-articles');
let input: Element = document.querySelector('.search-bar-input');
let mainTag: TTag = searchTags.find((item: TTag) => item.name === tagName)
let search: string = ''

const getData = async (): Promise<void> => fetchWrapper.get(`single-tag/?mainTag=${mainTag.name}&search=${search}`)
    .then((data: {data: TData[]}) => loadPage(data.data))

const getInput = (e: Event): void => {
    search = (<HTMLInputElement>e.target).value.toLowerCase().trim();
    getData();
}

const id: string = localStorage.getItem('user')
const getUser = async (): Promise<void> => fetchWrapper.post<{id: string}>('current', {id})
    .then(data => {checkUsername(data.user)})

const removeCards = (): void => {
    cardsContainer.querySelectorAll<HTMLElement>('.page-single-tag-card')
        .forEach((item: HTMLElement) => item.remove());
}

const loadTagName = (): void => {
    let h: Element = document.createElement('h1');
    h.className = 'main-tag'
    h.textContent = `Searching by tag : ${mainTag.name}`
    container.prepend(h);
}

const loadPage = (data: TData[]): void => {
    removeCards();
    if (!data.length) {
        noArticles.classList.remove('hide')
    } else {
        noArticles.classList.add('hide')
        data.forEach((item: TData) => insertCard(item, cardsContainer, 'page-single-tag-card'))
    }
}

loadTagName();

input.addEventListener('keyup', debounce(getInput, 300))
input.addEventListener('search', getInput)

getData();

if (id) {
    getUser();
} else {
    checkUsername();
}