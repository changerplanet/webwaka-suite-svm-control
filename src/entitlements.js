const ENTITLEMENTS = Object.freeze({
  SVM_ACCESS: Object.freeze({
    id: 'svm-access',
    description: 'Base marketplace access'
  }),
  SVM_ORDERS_ENABLED: Object.freeze({
    id: 'svm-orders-enabled',
    description: 'Can place/manage orders'
  }),
  SVM_REFUNDS_ENABLED: Object.freeze({
    id: 'svm-refunds-enabled',
    description: 'Can process refunds'
  }),
  SVM_OFFLINE_ENABLED: Object.freeze({
    id: 'svm-offline-enabled',
    description: 'Offline order capture'
  }),
  SVM_ADVANCED_REPORTS: Object.freeze({
    id: 'svm-advanced-reports',
    description: 'Advanced analytics'
  }),
  SVM_ADMIN: Object.freeze({
    id: 'svm-admin',
    description: 'Full SVM administration'
  })
});

const ALL_ENTITLEMENTS = Object.freeze([
  ENTITLEMENTS.SVM_ACCESS,
  ENTITLEMENTS.SVM_ORDERS_ENABLED,
  ENTITLEMENTS.SVM_REFUNDS_ENABLED,
  ENTITLEMENTS.SVM_OFFLINE_ENABLED,
  ENTITLEMENTS.SVM_ADVANCED_REPORTS,
  ENTITLEMENTS.SVM_ADMIN
]);

const ENTITLEMENT_IDS = Object.freeze(
  ALL_ENTITLEMENTS.map(e => e.id)
);

module.exports = {
  ENTITLEMENTS,
  ALL_ENTITLEMENTS,
  ENTITLEMENT_IDS
};
