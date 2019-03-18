///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {DateraConfigCtrl} from "./components/config/config";
import {SensuServersCtrl} from "./components/servers/servers";
import {SensuServerInfoCtrl} from "./components/server_info/info";
import {loadPluginCss} from "grafana/app/plugins/sdk";

loadPluginCss({
  dark: "plugins/emma-grafana-app/css/datera-app.dark.css",
  light: "plugins/emma-grafana-app/css/datera-app.light.css"
});

export {
  DateraConfigCtrl as ConfigCtrl,
  SensuServerInfoCtrl,
  SensuServersCtrl
};
