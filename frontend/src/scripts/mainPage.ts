import '../styles/mainPage.scss'

import '../assets/img/background2.jpg'
import {searchTags} from "./constants/constants";
import fetchWrapper from "./modules/fetchWrapper";

import {appendTags} from "./modules/appendTags";
import {debounce} from './modules/debounce';
import {insertCard} from './modules/insertCard'
import {checkUsername} from './modules/appendHeaderButton'
import {TData, TLoadPage, TTag, TUser} from "./interfaces/interfaces";

let input: Element = document.querySelector('.search-bar-input');
let container: Element = document.querySelector('.cards-container');
let button: Element = document.querySelector('.load-more');
let noArticles: Element = document.querySelector('.no-articles');
let articles: Element = document.querySelector('.articles');
const tagsContainer: Element = document.querySelector('.tags')
let search: string = ''
let count: number = 8;
let resultTags: string[] = ['Angular']
const id: string = localStorage.getItem('user')


appendTags('tag', tagsContainer);
const tags = document.querySelectorAll<HTMLElement>('.tag')
const checkMarks = document.querySelectorAll<HTMLElement>('.check-mark');

const getData = async (): Promise<void> => fetchWrapper.get(`data/?count=${count}&search=${search}&resultTags=${resultTags}`)
    .then((data: TLoadPage) => loadPage(data))
const getUser = async (): Promise<void> => fetchWrapper.post<{id: string}>('current', {id})
    .then((data: {user: TUser}) => checkUsername(data.user, 'main'))

const getInput = (e: Event): void => {
    count = 8
    search = (<HTMLInputElement>e.target).value.toLowerCase().trim();
    getData();
}

const loadPage = ({isMore, data}: TLoadPage): void => {
    container.querySelectorAll('.card').forEach((item: Element) => item.remove());

    if (!isMore) {
        button.classList.add('hide');
        articles.classList.add('padding')
    } else {
        button.classList.remove('hide');
        articles.classList.remove('padding')
    }

    if (!data.length) {
        noArticles.classList.remove('hide')
        button.classList.add('hide')
        articles.classList.add('padding')
    } else {
        noArticles.classList.add('hide')
    }

    data.forEach((item: TData) => insertCard(item, container, 'card'))
}

const loadMore = (): void => {
    count += 8;
    getData();
}

const changeStyle = (btn: Element, index: number): void => {
    btn.classList.toggle('active');
    checkMarks[index].classList.toggle('active');
    filterTags((<HTMLInputElement>btn).innerText)
}

const filterTags = (value: string): void => {
    count = 8
    let tmp: TTag = searchTags.find((item: TTag) => item.name === value)
    tmp.active = !tmp.active

    resultTags = searchTags.filter((elem: TTag) => elem.active)
        .map((elem: TTag) => elem.name);

    getData();
}

button.addEventListener('click', loadMore)
input.addEventListener('keyup',  debounce(getInput, 300))
input.addEventListener('search', getInput)
tags.forEach((tag: Element, i: number) => {
    tag.addEventListener('click', () => changeStyle(tag, i))
})
getData();
if (id) {
    getUser();
} else {
    checkUsername();
}