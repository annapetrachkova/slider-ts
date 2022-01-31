export const debounce = (fn: (e: Event) => void, ms: number) => {
    let timeout: NodeJS.Timeout
    return function (...args: Event[]) {
        const fnCall = () => fn.apply(this, args)
        clearTimeout(timeout)
        timeout = setTimeout(fnCall, ms)
    }
}