///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {EmmaDatasource} from './datasource';
import {EmmaDatasourceQueryCtrl} from './query_ctrl';

class EmmaConfigCtrl {
  static templateUrl = 'datasource/emma-core/partials/config.html';
}

class EmmaQueryOptionsCtrl {
  static templateUrl = 'datasource/emma-core/partials/query.options.html';
}


class EmmaAnnotationsQueryCtrl {
  static templateUrl = 'datasource/emma-core/partials/annotations.editor.html';
}

export {
  EmmaDatasource as Datasource,
  EmmaDatasourceQueryCtrl as QueryCtrl,
  EmmaConfigCtrl as ConfigCtrl,
  EmmaQueryOptionsCtrl as QueryOptionsCtrl,
  EmmaAnnotationsQueryCtrl as AnnotationsQueryCtrl
};
