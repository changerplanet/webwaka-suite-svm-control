# WebWaka SVM Suite - Control Layer (Phase 5C)

## Overview
This is a **pure declarative control package** for the WebWaka Single Vendor Marketplace (SVM) Suite. It contains DATA ONLY - no UI, no runtime logic, no API calls, no database usage.

## What This Package Provides
- **Capabilities**: 11 permission definitions for catalog, orders, customers, reports, settings
- **Entitlements**: 6 access level definitions (base access, orders, refunds, offline, advanced reports, admin)
- **Feature Flags**: 7 toggleable features with default values
- **Dashboard Sections**: 5 sections with gating matrix (permissions + entitlements + flags)

## Project Structure
```
├── index.js                 # Main export (re-exports src/index.js)
├── src/
│   ├── index.js             # Aggregated exports
│   ├── capabilities.js      # Permission declarations
│   ├── entitlements.js      # Entitlement declarations
│   ├── feature-flags.js     # Feature flag declarations
│   └── dashboard-sections.js # Dashboard + gating matrix
├── tests/
│   └── control.test.js      # Full test suite (31 tests)
├── module.manifest.json     # Module metadata
└── package.json             # Package configuration
```

## Usage
```javascript
const {
  CAPABILITIES,
  ALL_CAPABILITIES,
  ENTITLEMENTS,
  ALL_ENTITLEMENTS,
  FEATURE_FLAGS,
  ALL_FEATURE_FLAGS,
  DEFAULT_FLAG_VALUES,
  DASHBOARD_SECTIONS,
  ALL_DASHBOARD_SECTIONS,
  GATING_MATRIX
} = require('webwaka-suite-svm-control');
```

## Running Tests
```bash
npm test
```

## Key Properties
- All exports are **frozen** (immutable)
- All data is **JSON-serializable**
- All access is **deterministic**
- No hardcoded roles
- Tenant-isolated by design

## Recent Changes
- 2026-01-20: Implemented Phase 5C - SVM Control Layer
  - Added 11 capabilities
  - Added 6 entitlements
  - Added 7 feature flags
  - Added 5 dashboard sections with gating matrix
  - 31 tests passing (100% coverage)

## Phase Status
Phase 5C Complete. Awaiting authorization for Phase 5C-3 (SVM UI).
