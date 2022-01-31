const prev: Element = document.querySelector('.slider-arrow-prev');
const next: Element = document.querySelector('.slider-arrow-next');
const slides = document.querySelectorAll<HTMLElement>('.slide');
const dots = document.querySelectorAll<HTMLElement>('.dot');

let slider: number = 0;

const activeHandler = (n: number, items:  NodeListOf<HTMLElement>[]): void => {
    items.forEach((item: NodeListOf<HTMLElement>) => {
        item.forEach((elem: Element) => elem.classList.remove('active'))
        item[n].classList.add('active');
    })
}

const nextSlide = (): void => {
    slider = ((slider === slides.length - 1) ? 0 : slider + 1);
    activeHandler(slider, [dots, slides])
}

const prevSlide = (): void => {
    slider = (slider === 0 ? slides.length - 1 : slider - 1);
    activeHandler(slider, [dots, slides])
}

let timer: NodeJS.Timeout = setInterval(nextSlide, 3000);

const resetInterval = (): void => {
    clearInterval(timer);
    timer = setInterval(nextSlide, 3000)
}

const changeSlider = (type: string): void => {
    if (type === 'next') nextSlide()
    if (type === 'prev') prevSlide()

    resetInterval()
}

next.addEventListener('click', () => changeSlider('next'))
prev.addEventListener('click', () => changeSlider('prev'))

dots.forEach((item: Element, indexDot: number) => {
    item.addEventListener('click', () => {
        slider = indexDot;
        resetInterval()
        activeHandler(slider, [dots, slides])
    })
});