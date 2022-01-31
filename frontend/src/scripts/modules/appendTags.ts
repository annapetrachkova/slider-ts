import {searchTags} from "../constants/constants";
import {TTag} from "../interfaces/interfaces";

export const appendTags = (className: string, container: Element): void => {
    searchTags.forEach((item:TTag, i: number) => {
        let div: Element = document.createElement('div');
        div.className = className;

        let img: HTMLImageElement = document.createElement('img');

        if (className === 'tag') {
            img.className = 'check-mark';
            img.alt = 'checkMark';
            img.src = "assets/svg/checkMark.svg";

            if (i === 0) {
                div.className = 'tag active'
                img.className = 'check-mark active'
            }
        } else {
            img.alt = 'plus'
            img.src = "assets/svg/plusIcon.svg";
        }

        let p: Element = document.createElement('p');
        p.textContent = item.name;

        div.append(img)
        div.append(p)

        container.append(div)
    })
}