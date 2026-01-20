const assert = require('assert');
const {
  CAPABILITIES,
  ALL_CAPABILITIES,
  ENTITLEMENTS,
  ALL_ENTITLEMENTS,
  ENTITLEMENT_IDS,
  FEATURE_FLAGS,
  ALL_FEATURE_FLAGS,
  DEFAULT_FLAG_VALUES,
  DASHBOARD_SECTIONS,
  ALL_DASHBOARD_SECTIONS,
  GATING_MATRIX
} = require('../src/index');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${e.message}`);
    failed++;
  }
}

console.log('\n=== SVM Control Layer Tests ===\n');

console.log('--- Capabilities Tests ---');

test('CAPABILITIES is frozen', () => {
  assert.ok(Object.isFrozen(CAPABILITIES));
});

test('ALL_CAPABILITIES contains 11 capabilities', () => {
  assert.strictEqual(ALL_CAPABILITIES.length, 11);
});

test('ALL_CAPABILITIES is frozen', () => {
  assert.ok(Object.isFrozen(ALL_CAPABILITIES));
});

test('Catalog capabilities are correct', () => {
  assert.strictEqual(CAPABILITIES.CATALOG.VIEW, 'svm:catalog.view');
  assert.strictEqual(CAPABILITIES.CATALOG.MANAGE, 'svm:catalog.manage');
});

test('Order capabilities are correct', () => {
  assert.strictEqual(CAPABILITIES.ORDERS.CREATE, 'svm:order.create');
  assert.strictEqual(CAPABILITIES.ORDERS.VIEW, 'svm:order.view');
  assert.strictEqual(CAPABILITIES.ORDERS.CANCEL, 'svm:order.cancel');
  assert.strictEqual(CAPABILITIES.ORDERS.REFUND, 'svm:order.refund');
});

console.log('\n--- Entitlements Tests ---');

test('ENTITLEMENTS is frozen', () => {
  assert.ok(Object.isFrozen(ENTITLEMENTS));
});

test('ALL_ENTITLEMENTS contains 6 entitlements', () => {
  assert.strictEqual(ALL_ENTITLEMENTS.length, 6);
});

test('ENTITLEMENT_IDS matches ALL_ENTITLEMENTS', () => {
  assert.strictEqual(ENTITLEMENT_IDS.length, ALL_ENTITLEMENTS.length);
  ALL_ENTITLEMENTS.forEach((e, i) => {
    assert.strictEqual(ENTITLEMENT_IDS[i], e.id);
  });
});

test('Entitlements have required structure', () => {
  ALL_ENTITLEMENTS.forEach(e => {
    assert.ok(typeof e.id === 'string');
    assert.ok(typeof e.description === 'string');
  });
});

console.log('\n--- Feature Flags Tests ---');

test('FEATURE_FLAGS is frozen', () => {
  assert.ok(Object.isFrozen(FEATURE_FLAGS));
});

test('ALL_FEATURE_FLAGS contains 7 flags', () => {
  assert.strictEqual(ALL_FEATURE_FLAGS.length, 7);
});

test('DEFAULT_FLAG_VALUES is frozen', () => {
  assert.ok(Object.isFrozen(DEFAULT_FLAG_VALUES));
});

test('Feature flags have correct defaults', () => {
  assert.strictEqual(DEFAULT_FLAG_VALUES['svm-enabled'], true);
  assert.strictEqual(DEFAULT_FLAG_VALUES['svm-offline-orders'], false);
  assert.strictEqual(DEFAULT_FLAG_VALUES['svm-guest-checkout'], false);
  assert.strictEqual(DEFAULT_FLAG_VALUES['svm-digital-products'], false);
  assert.strictEqual(DEFAULT_FLAG_VALUES['svm-physical-products'], true);
  assert.strictEqual(DEFAULT_FLAG_VALUES['svm-inventory-enforced'], true);
  assert.strictEqual(DEFAULT_FLAG_VALUES['svm-discounts-enabled'], false);
});

console.log('\n--- Dashboard Sections Tests ---');

test('DASHBOARD_SECTIONS is frozen', () => {
  assert.ok(Object.isFrozen(DASHBOARD_SECTIONS));
});

test('ALL_DASHBOARD_SECTIONS contains 5 sections', () => {
  assert.strictEqual(ALL_DASHBOARD_SECTIONS.length, 5);
});

test('GATING_MATRIX matches sections', () => {
  assert.strictEqual(GATING_MATRIX.length, ALL_DASHBOARD_SECTIONS.length);
});

test('Dashboard sections have required structure', () => {
  ALL_DASHBOARD_SECTIONS.forEach(s => {
    assert.ok(typeof s.id === 'string');
    assert.ok(typeof s.name === 'string');
    assert.ok(Array.isArray(s.requiredPermissions));
    assert.ok(Array.isArray(s.requiredEntitlements));
    assert.ok(Array.isArray(s.requiredFlags));
  });
});

console.log('\n--- Determinism Tests ---');

test('Determinism: 10x repeated access produces identical results', () => {
  const results = [];
  for (let i = 0; i < 10; i++) {
    results.push(JSON.stringify({
      capabilities: ALL_CAPABILITIES,
      entitlements: ALL_ENTITLEMENTS,
      flags: ALL_FEATURE_FLAGS,
      sections: ALL_DASHBOARD_SECTIONS,
      matrix: GATING_MATRIX
    }));
  }
  const first = results[0];
  results.forEach((r, i) => {
    assert.strictEqual(r, first, `Iteration ${i} differs from first`);
  });
});

console.log('\n--- JSON Serialization Tests ---');

test('ALL_CAPABILITIES is JSON serializable', () => {
  const json = JSON.stringify(ALL_CAPABILITIES);
  const parsed = JSON.parse(json);
  assert.deepStrictEqual(parsed, ALL_CAPABILITIES);
});

test('ALL_ENTITLEMENTS is JSON serializable', () => {
  const json = JSON.stringify(ALL_ENTITLEMENTS);
  const parsed = JSON.parse(json);
  assert.deepStrictEqual(parsed, ALL_ENTITLEMENTS);
});

test('ALL_FEATURE_FLAGS is JSON serializable', () => {
  const json = JSON.stringify(ALL_FEATURE_FLAGS);
  const parsed = JSON.parse(json);
  assert.deepStrictEqual(parsed, ALL_FEATURE_FLAGS);
});

test('GATING_MATRIX is JSON serializable', () => {
  const json = JSON.stringify(GATING_MATRIX);
  const parsed = JSON.parse(json);
  assert.deepStrictEqual(parsed, GATING_MATRIX);
});

test('Complete control layer is JSON serializable', () => {
  const complete = {
    capabilities: ALL_CAPABILITIES,
    entitlements: ALL_ENTITLEMENTS,
    flags: ALL_FEATURE_FLAGS,
    sections: ALL_DASHBOARD_SECTIONS,
    matrix: GATING_MATRIX
  };
  const json = JSON.stringify(complete);
  const parsed = JSON.parse(json);
  assert.deepStrictEqual(parsed, complete);
});

console.log('\n--- No Mutation Tests ---');

test('CAPABILITIES is immutable (frozen)', () => {
  assert.ok(Object.isFrozen(CAPABILITIES));
  CAPABILITIES.NEW_CAP = 'test';
  assert.strictEqual(CAPABILITIES.NEW_CAP, undefined);
});

test('ALL_CAPABILITIES is immutable (frozen array)', () => {
  assert.ok(Object.isFrozen(ALL_CAPABILITIES));
  const original = ALL_CAPABILITIES.length;
  try { ALL_CAPABILITIES.push('test'); } catch (e) {}
  assert.strictEqual(ALL_CAPABILITIES.length, original);
});

test('ENTITLEMENTS is immutable (frozen)', () => {
  assert.ok(Object.isFrozen(ENTITLEMENTS));
  ENTITLEMENTS.NEW_ENT = { id: 'test', description: 'test' };
  assert.strictEqual(ENTITLEMENTS.NEW_ENT, undefined);
});

test('FEATURE_FLAGS is immutable (frozen)', () => {
  assert.ok(Object.isFrozen(FEATURE_FLAGS));
  FEATURE_FLAGS.NEW_FLAG = { id: 'test', defaultValue: false };
  assert.strictEqual(FEATURE_FLAGS.NEW_FLAG, undefined);
});

test('DEFAULT_FLAG_VALUES is immutable (frozen)', () => {
  assert.ok(Object.isFrozen(DEFAULT_FLAG_VALUES));
  DEFAULT_FLAG_VALUES['new-flag'] = true;
  assert.strictEqual(DEFAULT_FLAG_VALUES['new-flag'], undefined);
});

test('DASHBOARD_SECTIONS is immutable (frozen)', () => {
  assert.ok(Object.isFrozen(DASHBOARD_SECTIONS));
  DASHBOARD_SECTIONS.NEW_SECTION = { id: 'test' };
  assert.strictEqual(DASHBOARD_SECTIONS.NEW_SECTION, undefined);
});

test('GATING_MATRIX is immutable (frozen array)', () => {
  assert.ok(Object.isFrozen(GATING_MATRIX));
  const original = GATING_MATRIX.length;
  try { GATING_MATRIX.push({ sectionId: 'test' }); } catch (e) {}
  assert.strictEqual(GATING_MATRIX.length, original);
});

console.log('\n--- Access Matrix Tests ---');

test('Given tenant context produces deterministic access matrix', () => {
  const tenantContext = {
    tenantId: 'test-tenant',
    permissions: ['svm:catalog.view', 'svm:order.view'],
    entitlements: ['svm-access', 'svm-orders-enabled'],
    flags: { 'svm-enabled': true }
  };

  const getAccessibleSections = (ctx) => {
    return GATING_MATRIX.filter(section => {
      const hasPermissions = section.permissions.every(p => ctx.permissions.includes(p));
      const hasEntitlements = section.entitlements.every(e => ctx.entitlements.includes(e));
      const hasFlags = section.flags.every(f => ctx.flags[f] === true);
      return hasPermissions && hasEntitlements && hasFlags;
    }).map(s => s.sectionId);
  };

  const results = [];
  for (let i = 0; i < 10; i++) {
    results.push(JSON.stringify(getAccessibleSections(tenantContext)));
  }

  const first = results[0];
  results.forEach(r => assert.strictEqual(r, first));

  const accessible = getAccessibleSections(tenantContext);
  assert.ok(accessible.includes('storefront'));
  assert.ok(accessible.includes('orders'));
  assert.ok(!accessible.includes('reports'));
  assert.ok(!accessible.includes('settings'));
});

console.log('\n=== Test Results ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);
console.log(`Coverage: ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed > 0) {
  process.exit(1);
}

console.log('\n✓ All tests passed!\n');
