import {newCard} from "../constants/constants";
import {TSubtitle} from "../interfaces/interfaces";

export const postValidation = (): boolean => {
    let image: HTMLDivElement = document.querySelector('.add-img')
    let title: Element = document.querySelector('.enter-title')
    let subtitle = document.querySelectorAll<HTMLElement>('.enter-subtitle')
    let story = document.querySelectorAll<HTMLElement>('.add-card-textarea')
    let tagsContainer: HTMLDivElement = document.querySelector('.input-for-example')
    let result: boolean = true

    if (newCard.img === '') {
        image.classList.add('red')
        result = false
    } else {
        if (image) image.classList.remove('red')
    }

    if (!newCard.title.trim()) {
        title.classList.add('red')
        result = false
    } else {
        title.classList.remove('red')
    }

    let count: number = 0
    newCard.subtitle.forEach((article: TSubtitle) => {
        let newArticle: string[][] = Object.values(article);
        newArticle.forEach((elem: string[]) => {
            elem.forEach((item: string, index: number) => {
                if (index === 0) {
                    if (!item.trim()) {
                        if (subtitle[count]) subtitle[count].classList.add('red')
                        result = false
                    } else {
                        if (subtitle[count]) subtitle[count].classList.remove('red')
                    }
                } else {
                    if (!item.trim()) {
                        if (story[count]) story[count].classList.add('red')
                        result = false
                    } else {
                        if (story[count]) story[count].classList.remove('red')
                    }
                    count++;
                }
            })
        })
    })

    if (newCard.tags.length < 2) {
        tagsContainer.classList.add('red')
        result = false
    } else {
        tagsContainer.classList.remove('red')
    }

    return result
}