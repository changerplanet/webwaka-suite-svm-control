const { CAPABILITIES } = require('./capabilities');
const { ENTITLEMENTS } = require('./entitlements');
const { FEATURE_FLAGS } = require('./feature-flags');

const DASHBOARD_SECTIONS = Object.freeze({
  STOREFRONT: Object.freeze({
    id: 'storefront',
    name: 'Storefront',
    requiredPermissions: Object.freeze([CAPABILITIES.CATALOG.VIEW]),
    requiredEntitlements: Object.freeze([ENTITLEMENTS.SVM_ACCESS.id]),
    requiredFlags: Object.freeze([FEATURE_FLAGS.SVM_ENABLED.id])
  }),
  ORDERS: Object.freeze({
    id: 'orders',
    name: 'Orders',
    requiredPermissions: Object.freeze([CAPABILITIES.ORDERS.VIEW]),
    requiredEntitlements: Object.freeze([ENTITLEMENTS.SVM_ORDERS_ENABLED.id]),
    requiredFlags: Object.freeze([FEATURE_FLAGS.SVM_ENABLED.id])
  }),
  CUSTOMERS: Object.freeze({
    id: 'customers',
    name: 'Customers',
    requiredPermissions: Object.freeze([CAPABILITIES.CUSTOMERS.VIEW]),
    requiredEntitlements: Object.freeze([ENTITLEMENTS.SVM_ACCESS.id]),
    requiredFlags: Object.freeze([FEATURE_FLAGS.SVM_ENABLED.id])
  }),
  REPORTS: Object.freeze({
    id: 'reports',
    name: 'Reports',
    requiredPermissions: Object.freeze([CAPABILITIES.REPORTS.VIEW]),
    requiredEntitlements: Object.freeze([ENTITLEMENTS.SVM_ADVANCED_REPORTS.id]),
    requiredFlags: Object.freeze([FEATURE_FLAGS.SVM_ENABLED.id])
  }),
  SETTINGS: Object.freeze({
    id: 'settings',
    name: 'Settings',
    requiredPermissions: Object.freeze([CAPABILITIES.SETTINGS.VIEW]),
    requiredEntitlements: Object.freeze([ENTITLEMENTS.SVM_ADMIN.id]),
    requiredFlags: Object.freeze([FEATURE_FLAGS.SVM_ENABLED.id])
  })
});

const ALL_DASHBOARD_SECTIONS = Object.freeze([
  DASHBOARD_SECTIONS.STOREFRONT,
  DASHBOARD_SECTIONS.ORDERS,
  DASHBOARD_SECTIONS.CUSTOMERS,
  DASHBOARD_SECTIONS.REPORTS,
  DASHBOARD_SECTIONS.SETTINGS
]);

const GATING_MATRIX = Object.freeze(
  ALL_DASHBOARD_SECTIONS.map(section => Object.freeze({
    sectionId: section.id,
    sectionName: section.name,
    permissions: section.requiredPermissions,
    entitlements: section.requiredEntitlements,
    flags: section.requiredFlags
  }))
);

module.exports = {
  DASHBOARD_SECTIONS,
  ALL_DASHBOARD_SECTIONS,
  GATING_MATRIX
};
