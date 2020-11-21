# vMix Extended Functions

* Simple tool with one function. It makes recording button follow streaming button in vMix. 

## Configuration

* Configuration file is `config.json`.
* Configuration params:

    * `vMixAddress` — ip/dns of your vMix machine and api port. Set to `localhost:8088` by default.   
    * `autoStartRecord` — set true/false to enable or disable auto record.

## How to install

* Download and install [NodeJS LTS](https://nodejs.org/en/)
* Download repo (Code -> Download ZIP)
* Unzip
* Copy `gi-master` folder to disc C.
* Run `C:\vmix-extended-functions-master\install.cmd`
* App will start automatically on windows startup
* Also you could control it from windows `cmd`
    * `pm2 stop vmix-extended-functions` — stop app till system restart
    * `pm2 start vmix-extended-functions` — start app

## How to uninstall

* Run `C:/vmix-extended-functions-master/uninstall.cmd`
