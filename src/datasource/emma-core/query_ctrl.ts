import {QueryCtrl} from 'grafana/app/plugins/sdk';

export class EmmaDatasourceQueryCtrl extends QueryCtrl {
  static templateUrl = 'datasource/emma-core/partials/query.editor.html';
  scope: any;

  constructor($scope: any, $injector: any)  {
    super($scope, $injector);

    this.scope = $scope;
    this.target.target = this.target.target || 'select metric';
    this.target.type = this.target.type || 'timeserie';
  }

  getOptions(query: any) {
    return this.datasource.metricFindQuery(query || '');
  }

  toggleEditorMode() {
    this.target.rawQuery = !this.target.rawQuery;
  }

  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }
}
