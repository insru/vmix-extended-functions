import {getVMixState, setVMixRecord} from "../vMixConnector/vMixConnector";
import {appConfig} from "../appConfigInterface";
import {log} from "../log";

let isRecording: boolean = false;
let timeOut: number = 2000;

export function autoStartRecord(config: appConfig) {
    getVMixState(config.vMixAddress)
        .then(
            (result) => {
                log(result);
                if (isRecording) {
                    if (result.active && result.stream === false ) {
                        log('Attempting to stop recording');
                        setVMixRecord(false, config.vMixAddress)
                            .then(
                                () => {
                                    log('Recording stop compete');
                                    isRecording = false;
                                    setTimeout(autoStartRecord, timeOut,config);
                                },
                                () => {
                                    log('Recording stop error');
                                    setTimeout(autoStartRecord, timeOut,config);
                                }
                            )
                    } else {
                        setTimeout(autoStartRecord, timeOut,config);
                    }
                } else {
                    if (result.active && result.stream ) {
                        log('Attempting to start recording');
                        setVMixRecord(true, config.vMixAddress)
                            .then(
                                () => {
                                    log('Recording start compete');
                                    isRecording = true;
                                    setTimeout(autoStartRecord, timeOut,config);
                                },
                                () => {
                                    log('Recording start error');
                                    setTimeout(autoStartRecord, timeOut,config);
                                }
                            )
                    } else {
                        setTimeout(autoStartRecord, timeOut,config);
                    }
                }
            },
            (error) => {
                log(error)
                setTimeout(autoStartRecord, timeOut,config);
            }
        );
}
