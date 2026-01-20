const CAPABILITIES = Object.freeze({
  CATALOG: Object.freeze({
    VIEW: 'svm:catalog.view',
    MANAGE: 'svm:catalog.manage'
  }),
  ORDERS: Object.freeze({
    CREATE: 'svm:order.create',
    VIEW: 'svm:order.view',
    CANCEL: 'svm:order.cancel',
    REFUND: 'svm:order.refund'
  }),
  CUSTOMERS: Object.freeze({
    VIEW: 'svm:customer.view',
    MANAGE: 'svm:customer.manage'
  }),
  REPORTS: Object.freeze({
    VIEW: 'svm:reports.view'
  }),
  SETTINGS: Object.freeze({
    VIEW: 'svm:settings.view',
    MANAGE: 'svm:settings.manage'
  })
});

const ALL_CAPABILITIES = Object.freeze([
  CAPABILITIES.CATALOG.VIEW,
  CAPABILITIES.CATALOG.MANAGE,
  CAPABILITIES.ORDERS.CREATE,
  CAPABILITIES.ORDERS.VIEW,
  CAPABILITIES.ORDERS.CANCEL,
  CAPABILITIES.ORDERS.REFUND,
  CAPABILITIES.CUSTOMERS.VIEW,
  CAPABILITIES.CUSTOMERS.MANAGE,
  CAPABILITIES.REPORTS.VIEW,
  CAPABILITIES.SETTINGS.VIEW,
  CAPABILITIES.SETTINGS.MANAGE
]);

module.exports = {
  CAPABILITIES,
  ALL_CAPABILITIES
};
