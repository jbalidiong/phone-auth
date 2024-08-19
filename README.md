# Steps to install

1. Install all global dependencies required:
  - `npm i -g @ionic/cli`
  - `npm i -g cordova-res`
  - `npm i -g native-run`
2. Install dependencies: `npm install`
3. Update the file `enviroment.prod.ts` and `environment.ts` under the `src/environments/`
3. Add prepare android platform:
  - `ionic cordova platform add android`
  - `ionic cordova build android`
  - `ionic cordova run android`
