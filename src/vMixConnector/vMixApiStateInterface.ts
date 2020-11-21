export interface vMixApiState {
    version: string,
    edition: string,
    preset: string,
    inputs: Array<any>,
    preview: number,
    active: number,
    fadeToBlack: boolean
    transitions: Array<any>,
    recording: boolean,
    external: boolean,
    streaming: boolean,
    playList: boolean,
    multiCorder: boolean,
    fullscreen: boolean,
    audio: {
        master: any,
        busA: any,
        busB: any
    }
}
