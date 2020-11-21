import {readFileSync} from "fs";
import {autoStartRecord} from "./feature/autoStartRecord";
import {appConfig} from "./appConfigInterface";

let config: appConfig = JSON.parse(readFileSync('config.json').toString());

if (process.env.NODE_ENV === "dev") {
    config.vMixAddress = "studio4-prod.localdomain:8088"
}

if (config.autoStartRecord) {
    autoStartRecord(config);
}
