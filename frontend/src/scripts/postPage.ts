import '../styles/createPost.scss'
import {appendTags} from "./modules/appendTags";
import {checkUsername} from "./modules/appendHeaderButton";
import {postValidation} from './modules/postValidation';
import fetchWrapper from "./modules/fetchWrapper";
import {newCard} from "./constants/constants";
import {TData, TSubtitle, TUser} from "./interfaces/interfaces";

let addTagsContainer: Element = document.querySelector('.tag-information-tags');
appendTags('tag add-card-add-tag', addTagsContainer)

let file: Element = document.querySelector('.input-file')
let buttonAddBlock: Element = document.querySelector('.add-new-block')
let newBlockContainer: Element = document.querySelector('.new-blocks')
let publish: HTMLButtonElement = document.querySelector('.publish')
let cancel: HTMLButtonElement = document.querySelector('.cancel')


let tagsWrapper: HTMLDivElement = document.querySelector('.tags-wrapper')
let tags = document.querySelectorAll<HTMLElement>('.add-card-add-tag')

export const removeOrAddTags = (item: HTMLDivElement, type?: string): void => {
    if (type === 'remove') newCard.tags = newCard.tags.filter((el: string) => item.innerText !== el);
    else newCard.tags.push(item.innerText);
    loadTags();
}

const loadTags = () => {
    tagsWrapper.querySelectorAll<HTMLElement>('div').forEach(item => item.remove());
    let p: Element = document.querySelector('.example-text');
    if (newCard.tags.length) p.classList.add('display-none')
    else p.classList.remove('display-none')
    newCard.tags.forEach((item: string) => {
        let div: HTMLDivElement = document.createElement('div');
        div.className = 'tag active';
        let img: HTMLImageElement = document.createElement('img');
        img.className = 'check-mark active';
        img.alt = 'checkMark';
        img.src = "assets/svg/checkMark.svg";
        let text: Element = document.createElement('p');
        text.textContent = item;
        div.append(img)
        div.append(text)
        tagsWrapper.append(div)
    })

    tagsWrapper.querySelectorAll<HTMLElement>('div').forEach((item: HTMLDivElement) => {
        item.addEventListener('click', () => removeOrAddTags(item, 'remove'))
    })
}

tags.forEach((item: HTMLDivElement) => {
    item.addEventListener('click', () => removeOrAddTags(item))
})

loadTags();


const id: string = localStorage.getItem('user')
const getUser = async (): Promise<void> => fetchWrapper.post<{id: string}>('current', {id})
    .then((data: {user: TUser}) => {
        newCard.author = data.user.name
        checkUsername(data.user, 'createPost')
    })

function downloadPic(): void {
    let input: HTMLInputElement = document.querySelector('.add-img')
    input.remove();

    let img: HTMLImageElement = document.createElement('img')
    img.alt = 'pic'

    let fr: FileReader = new FileReader()

    fr.readAsDataURL(this.files[0])
    fr.onload = (): void => {
        if (typeof fr.result === "string") {
            img.src = fr.result
        }
    }

    img.onload = (): void => {
        const canvas: HTMLCanvasElement = document.createElement('canvas')
        canvas.width = img.clientWidth
        canvas.height = img.clientHeight
        const context = canvas.getContext('2d')

        context.drawImage(img, 0, 0)

        canvas.toBlob((blob: Blob | null): void => {
            const reader: FileReader = new FileReader()
            reader.readAsDataURL(blob)

            reader.onload = (): void => {
                newCard.img = reader.result
                img.classList.add('selected-img')
            }
        })
    }


    let cardContainer: Element = document.querySelector('.add-card-container')
    cardContainer.prepend(img);

    cardContainer.classList.add('background')
}

const saveCard = (): void => {
    if (postValidation()) {
        fetchWrapper.post<TData>("add", newCard)
            .then((data: {newData: TData[]}) => {
                document.querySelectorAll<HTMLElement>('.enter-subtitle')
                    .forEach((item: HTMLInputElement) => item.value = '')
                document.querySelectorAll<HTMLElement>('.add-card-textarea')
                    .forEach((item: HTMLInputElement) => item.value = '')
                const title: HTMLInputElement = document.querySelector('.enter-title')
                title.value = ''
                window.location.href = `card.html?id=${data.newData.length}`
            })
    }
}

const addBlock = (): void => {
    newCard.subtitle.push({article: ['', '']})
    loadBlock();
}

const removeBlock = (index: number): void => {
    newCard.subtitle = newCard.subtitle.filter((el: TSubtitle, i: number) => i !== index + 1)
    loadBlock();
}

const saveValues = (e: Event, index: number, i: number): void => {
    newCard.subtitle[index].article[i] = (<HTMLInputElement>e.target).value;
}

const loadBlock = (): void => {
    document.querySelectorAll<HTMLElement>('.new-block').forEach((item: Element) => item.remove());

    newCard.subtitle.forEach((item: TSubtitle, index: number) => {
        let subtitle: Element = document.createElement('h2')
        subtitle.textContent = 'Enter the subtitle of your article';
        if (index !== 0) subtitle.className = 'subtitle-added'
        let inputSubtitle: HTMLInputElement = document.createElement('input')
        inputSubtitle.className = 'enter-input enter-subtitle'
        inputSubtitle.placeholder = 'Enter Subtitle'
        inputSubtitle.type = 'text'
        inputSubtitle.value = item.article[0]

        let story: Element = document.createElement('h2')
        story.textContent = 'Tell your story...';
        let textareaStory: HTMLTextAreaElement = document.createElement('textarea')
        textareaStory.className = 'enter-input add-card-textarea'
        textareaStory.value = item.article[1]

        let newBlock: HTMLDivElement = document.createElement('div')
        newBlock.className = 'new-block'

        newBlock.append(subtitle)
        newBlock.append(inputSubtitle)
        newBlock.append(story)
        newBlock.append(textareaStory)
        if (index) {
            let div: HTMLDivElement = document.createElement('div')
            div.className = 'remove-block'
            let img: HTMLImageElement = document.createElement('img')
            img.alt = 'remove'
            img.src = 'assets/svg/minus.svg'
            let p: Element = document.createElement('p')
            p.textContent = 'Remove block'
            div.append(img)
            div.append(p)

            newBlock.append(div)
        }

        newBlockContainer.append(newBlock)
    })

    document.querySelectorAll<HTMLElement>('.remove-block').forEach((item: Element, index: number) => {
       item.addEventListener('click', () => removeBlock(index))
    })
    document.querySelectorAll<HTMLElement>('.enter-subtitle').forEach((item: Element, index: number) => {
        item.addEventListener('keyup', (e: Event) => saveValues(e, index, 0))
    })
    document.querySelectorAll<HTMLElement>('.add-card-textarea').forEach((item: Element, index: number) => {
        item.addEventListener('keyup', (e: Event) => saveValues(e, index, 1))
    })
}


loadBlock();

buttonAddBlock.addEventListener('click', addBlock)

document.querySelector('.enter-title').addEventListener('keyup', (e: Event) => {
    newCard.title = (<HTMLInputElement>e.target).value;
})

publish.addEventListener('click', saveCard)
cancel.addEventListener('click', () => window.location.href = `index.html`)

file.addEventListener("change", downloadPic, false);


if (id) {
    getUser();
} else {
    window.location.href = 'signIn.html'
}