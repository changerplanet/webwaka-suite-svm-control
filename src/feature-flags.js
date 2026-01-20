const FEATURE_FLAGS = Object.freeze({
  SVM_ENABLED: Object.freeze({
    id: 'svm-enabled',
    defaultValue: true
  }),
  SVM_OFFLINE_ORDERS: Object.freeze({
    id: 'svm-offline-orders',
    defaultValue: false
  }),
  SVM_GUEST_CHECKOUT: Object.freeze({
    id: 'svm-guest-checkout',
    defaultValue: false
  }),
  SVM_DIGITAL_PRODUCTS: Object.freeze({
    id: 'svm-digital-products',
    defaultValue: false
  }),
  SVM_PHYSICAL_PRODUCTS: Object.freeze({
    id: 'svm-physical-products',
    defaultValue: true
  }),
  SVM_INVENTORY_ENFORCED: Object.freeze({
    id: 'svm-inventory-enforced',
    defaultValue: true
  }),
  SVM_DISCOUNTS_ENABLED: Object.freeze({
    id: 'svm-discounts-enabled',
    defaultValue: false
  })
});

const ALL_FEATURE_FLAGS = Object.freeze([
  FEATURE_FLAGS.SVM_ENABLED,
  FEATURE_FLAGS.SVM_OFFLINE_ORDERS,
  FEATURE_FLAGS.SVM_GUEST_CHECKOUT,
  FEATURE_FLAGS.SVM_DIGITAL_PRODUCTS,
  FEATURE_FLAGS.SVM_PHYSICAL_PRODUCTS,
  FEATURE_FLAGS.SVM_INVENTORY_ENFORCED,
  FEATURE_FLAGS.SVM_DISCOUNTS_ENABLED
]);

const DEFAULT_FLAG_VALUES = Object.freeze(
  ALL_FEATURE_FLAGS.reduce((acc, flag) => {
    acc[flag.id] = flag.defaultValue;
    return acc;
  }, {})
);

module.exports = {
  FEATURE_FLAGS,
  ALL_FEATURE_FLAGS,
  DEFAULT_FLAG_VALUES
};
