import {vMixState} from "./vMixStateInterface";
import {getVMixXml} from "./getVMixXml";
import {cleanup} from "./cleanup";
import * as http from "http";

export function getVMixState(url: string): Promise<vMixState> {
    return new Promise((resolve, reject) => {
        let vMixState: vMixState = {record: false, stream: false, active: false}
        let fullUrl: string = 'http://' + url + '/api';

        getVMixXml(fullUrl)
            .then(
                (result) => {
                    result = cleanup(result);
                    if (result !== Error) {
                        vMixState.stream = result.streaming;
                        vMixState.record = result.recording;
                        vMixState.active = true;
                        resolve(vMixState);
                    } else {
                        reject(Error);
                    }
                },
                (error) => {
                    reject(error);
                }
            )
    });
}

export function setVMixRecord(param: boolean, url: string) {
    let fullUrl: string;
    if (param) {
        fullUrl = 'http://' + url + '/api/?function=startrecording';
    } else {
        fullUrl = 'http://' + url + '/api/?function=stoprecording';
    }
    return new Promise((resolve, reject) => {
        const getRequest = http.get(fullUrl, function(res) {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve("OK");
            } else {
                reject("ERR")
            }
        })
        getRequest.on("error", err => {
            reject(err);
        })
    });
}
