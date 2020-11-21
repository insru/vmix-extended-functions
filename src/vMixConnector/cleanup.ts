import {vMixApiState} from "./vMixApiStateInterface";

export function cleanup (parsedxml: any) :vMixApiState | Error {
    parsedxml = parsedxml.vmix;

    let cleanedState: vMixApiState = {
        version: "",
        edition: "",
        preset: "",
        inputs: [],
        preview: 0,
        active: 0,
        fadeToBlack: false,
        transitions: [],
        recording: false,
        external: false,
        streaming: false,
        playList: false,
        multiCorder: false,
        fullscreen: false,
        audio: {
            master: "",
            busA: "",
            busB: ""
        }
    }

    try {
        cleanedState.version = parsedxml.version[0];
        cleanedState.edition = parsedxml.edition[0];
        cleanedState.preset = parsedxml.preset[0];
        cleanedState.inputs = parsedxml.inputs[0].input;
        cleanedState.inputs.forEach( (value, index) => {
            let params: any;
            // assign params to local object
            params = value.$;

            // assign text
            if (value.text) {
                params.text = value.text[0]._;
                params.textParams = value.text[0].$;
            }
            // assign position
            if (value.position) {
                params.position_ = value.position[0].$;
            }
            // assign position
            if (value.overlay) {
                params.overlay = value.overlay[0].$;
            }
            cleanedState.inputs[index] = params;
        })
        cleanedState.preview = Number(parsedxml.preview[0]);
        cleanedState.active = Number(parsedxml.active[0]);
        cleanedState.fadeToBlack = (parsedxml.fadeToBlack[0] === "True");
        cleanedState.transitions = parsedxml.transitions[0].transition;
        cleanedState.transitions.forEach( (value, index) => {
            cleanedState.transitions[index] = value.$;
        });
        if (typeof parsedxml.recording[0] === "string") {
            cleanedState.recording = (parsedxml.recording[0] === "True");
        } else {
            cleanedState.recording = (parsedxml.recording[0]._ === "True");
        }
        cleanedState.external = (parsedxml.external[0] === "True");
        if (typeof parsedxml.streaming[0] === "string") {
            cleanedState.streaming = (parsedxml.streaming[0] === "True");
        } else {
            cleanedState.streaming = (parsedxml.streaming[0]._ === "True");
        }
        cleanedState.playList = (parsedxml.playList[0] === "True");
        cleanedState.multiCorder = (parsedxml.multiCorder[0] === "True");
        cleanedState.fullscreen = (parsedxml.fullscreen[0] === "True");
        cleanedState.audio.master = parsedxml.audio[0].master[0].$;
        cleanedState.audio.busA = parsedxml.audio[0].busA[0].$;
        cleanedState.audio.busB = parsedxml.audio[0].busB[0].$;
    } catch (e) {
        return new Error('cleanup error');
    }

    return cleanedState;
}
