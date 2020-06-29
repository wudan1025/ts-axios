export default class Cancel {
    message?: string

    constructor(message?: string) {
        this.message = message
    }
}

export function isCancel(value: any): boolean {
    // console.log(value)
    return value instanceof Cancel
}