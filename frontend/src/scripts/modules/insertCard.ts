import {TData} from "../interfaces/interfaces";

export const insertCard = (item: TData, container: Element, className: string): void=> {
    let a: HTMLAnchorElement = document.createElement('a');
    a.className = className
    a.href = `card.html?id=${item.id}`
    a.id = '' + item.id;

    let img: HTMLImageElement = document.createElement('img')
    img.className = 'card-image'
    if (typeof item.img === "string") {
        img.src = item.img;
    }
    img.alt = 'pic';

    let h5: HTMLElement = document.createElement('h5');
    h5.textContent = item.title

    let p: HTMLElement = document.createElement('p');
    p.title = item.subtitle[0].article[1]
    p.textContent = item.subtitle[0].article[1]

    a.append(img);
    a.append(h5);
    a.append(p);

    container.append(a);
}

export default {insertCard}
