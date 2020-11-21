export function log(log: any) {
    if (process.env.NODE_ENV === "dev") {
        console.log(log)
    }
}
