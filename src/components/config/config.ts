import angular from 'angular';

export class DateraConfigCtrl {
  static templateUrl = "components/config/config.html";
  enabled: boolean;
  appEditCtrl: any;
  appModel: any;

  /** @ngInject */
  constructor($scope, $injector, private $q) {
    this.enabled = false;
    this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
  }

  postUpdate() {
    if (!this.appModel.enabled) {
      return this.$q.resolve();
    }
    return this.appEditCtrl.importDashboards().then(() => {
      this.enabled = true;
      return {
        url: "plugins/emma-grafana-app/page/configure",
        message: "Datera App enabled!"
      };
    });
  }
}
