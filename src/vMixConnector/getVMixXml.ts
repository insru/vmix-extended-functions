import * as http from 'http';
import {Parser} from 'xml2js';
let parser = new Parser();

export function getVMixXml (url: string) : Promise<any> {
    return new Promise((resolve, reject) => {
        const getRequest = http.get(url, function(res) {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                let data: string = "";

                res.on('data', function(data_) {
                    data += data_.toString();
                });
                res.on('end', function() {
                    parser.parseString(data, function(err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result)
                        }
                    });
                });
            } else {
                reject(new Error('Invalid vMix Api response'))
            }
        })
        getRequest.on("error", err => {
            reject(err);
        })
    });
}
