# PHPTRAVELS QA Automation Plan

## Application Overview

# PHPTRAVELS QA Automation Plan

## Scope and Assumptions

Target: https://phptravels.net/ using Playwright TypeScript. The site is a public demo environment; booking, payment, email, database, and third-party integrations require approved test data, mocks, or sandbox contracts. Do not use destructive actions or real payment details.

## 1. Core Business Modules

- Account: login, signup, password recovery, remember-me, password visibility, session/logout.
- Stays: destination/property search, dates, guests, featured-property deep links, availability, property details, reservation and confirmation.
- Flights: origin/destination, one-way/round-trip, dates, passenger counts, search results, fare selection, booking.
- Visa: destination/country selection, applicant data, document requirements, submission/status.
- AI Trip Planner: natural-language trip request, generated itinerary/recommendations, error and empty states.
- Shared platform: currency (USD), language, navigation menus, policies, support/contact, responsive layout, accessibility, external app/social links.

## 2. Critical User Journeys

1. Browse home page, choose Stays, search a valid destination/date/guest combination, select a property, continue to booking, verify totals and confirmation.
2. Search Flights with valid route/date/passenger data, select an available itinerary, enter traveler details, verify fare and booking result.
3. Start Visa application, select destination, complete valid applicant data, upload/validate required documents, submit, verify status/reference.
4. Enter a valid AI Trip Planner request and verify a useful result; retry invalid, empty, and service-error requests.
5. Register, satisfy the security challenge, log in, use remember-me, recover password, and log out.
6. Change currency/language and verify displayed labels, prices, dates, and persisted preference.

## 3. High-Risk Areas

- Price, currency conversion, taxes, discounts, date/time-zone and total calculations.
- Availability changing between search, selection, and checkout.
- Duplicate bookings and double-submit behavior.
- Payment and third-party provider failure, timeout, callback, and idempotency.
- Personal data, document uploads, session fixation, authorization, and account enumeration.
- AI/API failures, malformed responses, rate limits, and unsafe user input.
- Responsive and accessibility regressions in search widgets and checkout.
- Demo data drift and links whose destination dates become stale.

## 4. Smoke Coverage

- Home page loads with no blocking error and demo notice can be dismissed.
- Stays, Flights, Visa, and AI Trip Planner tabs are selectable.
- Login and signup pages load; required controls are visible.
- Featured property link opens a property/search detail page.
- Valid stays search reaches results or a controlled no-results state.
- Invalid login displays a generic error without exposing which credential failed.
- Currency/language controls open and remain usable.
- Privacy, terms, cookies, refund, contact, and about links resolve.

## 5. Regression Coverage

- All smoke tests on every build.
- Account validation, registration duplicate handling, password recovery, session and logout.
- Search filters, dates, guest boundaries, empty/no-result/error states for every booking mode.
- Property/flight/visa detail, traveler/application forms, totals, discounts, confirmation, retry, cancellation/refund where supported.
- Currency and language across search, details, checkout, and confirmation.
- Responsive viewports, keyboard navigation, labels, focus, contrast, and screen-reader landmarks.
- API contract, authorization, rate-limit, timeout, retry, and schema compatibility.
- Cross-browser Chromium, Firefox, WebKit for critical paths.

## 6. UI Test Candidates

- Navigation, menus, tabs, modals, notices, dropdowns, date pickers, guest steppers, validation, password visibility, loading/empty/error states.
- Stable accessible locators: role, label, placeholder, test id; avoid text-only brittle selectors and nth().
- Visual checkpoints only for stable, business-critical screens: home, search results, property details, login, checkout, confirmation.
- Mobile and desktop layout, keyboard-only flow, focus order, semantic headings, accessible names, and form error association.

## 7. API Test Candidates

Use Playwright APIRequestContext against an approved API base URL or mocked contract. Cover search endpoints, property/flight/visa detail, authentication, registration, password recovery, booking create/read/cancel, currency/language, and AI planner.

Validate status codes, headers, auth/authorization, schema, required and nullable fields, pagination/filtering, price/tax totals, idempotency, response time, timeout/retry, malformed payloads, rate limits, and consistent error envelopes. Never hard-code credentials or tokens.

## 8. Database Validation Candidates

With read-only credentials and an approved schema, validate account creation and status, password reset token lifecycle, search/booking/application records, traveler-to-booking relationships, totals/currency, inventory/availability consistency, duplicate prevention, audit events, and cancellation/refund state. Prefer SELECT queries and compare UI/API values to persisted records. Do not run DELETE, UPDATE, TRUNCATE, or DROP in automated QA.

## 9. Security-Focused Scenarios

- Generic login/reset errors and no username enumeration.
- Rate limiting/lockout for repeated login, reset, search, and booking requests.
- Session cookie flags, HTTPS, logout invalidation, session rotation, remember-me expiry, direct URL authorization.
- IDOR/BOLA checks on booking, traveler, visa, and document identifiers.
- Input encoding/XSS, SQL injection probes through safe non-destructive fields, CSRF, open redirect, unsafe file types/sizes, path traversal, and malicious AI prompts.
- Secrets absent from UI, logs, network payloads, and reports; PII masked in traces and artifacts.
- Payment fields handled by approved provider/tokenization; no card data stored in application logs.

## 10. Automation Priority

- P0: home availability, login, signup validation, stays search-to-booking, flight search-to-booking, price/total integrity, authorization, payment failure handling.
- P1: visa submission, AI planner, password recovery, currency/language, cancellation/refund, API contracts, database reconciliation, accessibility on critical paths.
- P2: featured cards, support/policy pages, external links, app-store links, visual snapshots, broad responsive matrix.
- P3: low-value copy/layout variations and third-party destinations that cannot be deterministically controlled.

## Recommended Page Object Model

- `BasePage`: navigation, waits, common banners, locale/currency, accessibility helpers.
- `HomePage`: service tabs, search widgets, featured properties, notice.
- `LoginPage`, `SignupPage`, `ForgotPasswordPage`, `AccountPage`.
- `StaySearchPage`, `StayResultsPage`, `PropertyDetailsPage`, `StayCheckoutPage`, `BookingConfirmationPage`.
- `FlightSearchPage`, `FlightResultsPage`, `FlightCheckoutPage`.
- `VisaPage`, `VisaApplicationPage`.
- `TripPlannerPage`.
- `HeaderComponent`, `FooterComponent`, `DatePickerComponent`, `GuestSelectorComponent`, `ToastComponent`.
- Keep API clients and database read-only repositories separate from UI page objects.

## Recommended Test Folder Structure

```text
.github/agents/
 tests/
   smoke/
   regression/
   ui/auth/
   ui/stays/
   ui/flights/
   ui/visa/
   ui/trip-planner/
   ui/shared/
   api/
   database/
   security/
 page-objects/
   pages/
   components/
 api-clients/
 fixtures/
 test-data/
   users/
   bookings/
   providers/
 reports/
 specs/
```

## Automation Implementation Roadmap

Phase 1: establish environment config, secret handling, fixtures, trace/video policy, test tags, retries, browser projects, and deterministic seed/cleanup strategy.

Phase 2: implement POM/components and P0 smoke tests for home, authentication, stays search, and core navigation.

Phase 3: add stays/flight/visa/trip-planner regression flows, negative/boundary validation, responsive and accessibility checks.

Phase 4: add API contract suites, read-only database reconciliation, security checks, mocks for payment/email/AI/third parties, and failure diagnostics.

Phase 5: run CI in risk order, shard independent suites, publish HTML/JUnit reports, quarantine only evidenced flakes, track pass rate/duration/defect trends, and review coverage each release.

## Exit Criteria

All P0 tests pass across supported browsers; no open Critical/High defect blocks booking or authentication; API contracts and price/total reconciliation pass; security checks have no critical finding; artifacts contain no secrets or unmasked PII; known demo-environment limitations are documented.

## Test Scenarios

### 1. P0 Smoke and Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Home page and demo notice

**File:** `tests/smoke/home.spec.ts`

**Steps:**
  1. Navigate to https://phptravels.net/.
    - expect: The page title is PHPTRAVELS and the home content loads without a blocking error.
  2. Dismiss the demo-environment notice.
    - expect: The notice closes and the home page remains usable.
  3. Select Stays, Flights, Visa, and AI Trip Planner tabs one at a time.
    - expect: Each tab becomes active and exposes its associated panel or controlled empty/error state.

#### 1.2. Account entry points

**File:** `tests/smoke/account-entry.spec.ts`

**Steps:**
  1. Open Login from the header.
    - expect: The Login page opens with email, password, Remember Me, Forgot Password, and sign-in controls.
  2. Open Signup from the account navigation.
    - expect: The Signup page opens with email, password, confirmation, security challenge, and create-account controls.
  3. Open Forgot Password.
    - expect: The password recovery page loads with its required input and submission control.

#### 1.3. Critical public links

**File:** `tests/smoke/public-links.spec.ts`

**Steps:**
  1. Open featured property links and the policy/support links from the footer.
    - expect: Each internal link resolves to the expected PHPTRAVELS page or controlled result.
  2. Open the currency and language controls.
    - expect: The controls open without layout breakage and expose selectable options.

### 2. Authentication and Account

**Seed:** `tests/seed.spec.ts`

#### 2.1. Invalid login is rejected safely

**File:** `tests/ui/auth/login-negative.spec.ts`

**Steps:**
  1. Enter an unregistered email and incorrect password, then submit.
    - expect: Authentication fails, a generic error is visible, and the user remains unauthenticated.
  2. Inspect the rendered message and captured network/report artifacts.
    - expect: The error does not reveal whether the email or password was incorrect, and no password/token is exposed.

#### 2.2. Registration validation and duplicate handling

**File:** `tests/ui/auth/signup-validation.spec.ts`

**Steps:**
  1. Submit the signup form empty and with invalid email, short password, mismatched confirmation, and incorrect security answer.
    - expect: Each invalid field is rejected with clear validation and no account is created.
  2. Submit already-registered account data using approved test data.
    - expect: The duplicate account is rejected with a safe, actionable message.

#### 2.3. Session and recovery controls

**File:** `tests/ui/auth/session.spec.ts`

**Steps:**
  1. Log in with approved valid credentials, exercise Remember Me, navigate to an authenticated page, and log out.
    - expect: Successful authentication reaches the account area; logout invalidates access and protected navigation no longer works.
  2. Submit a password-recovery request for a controlled account.
    - expect: The response does not disclose account existence and the reset workflow follows the configured email/token contract.

### 3. Booking Workflows

**Seed:** `tests/seed.spec.ts`

#### 3.1. Stay search and property selection

**File:** `tests/ui/stays/stay-search.spec.ts`

**Steps:**
  1. Choose Stays and search a valid destination, future date range, and guest count.
    - expect: A results or controlled no-results page appears with requested criteria preserved.
  2. Open a property from results or a featured property.
    - expect: Property details show name, location, availability, room/rate data, policies, and price breakdown.
  3. Change dates, guests, and invalid/empty criteria.
    - expect: Boundary, invalid, and no-result states are handled without stale or contradictory totals.

#### 3.2. Flight search and fare selection

**File:** `tests/ui/flights/flight-search.spec.ts`

**Steps:**
  1. Choose Flights and submit valid one-way and round-trip route/date/passenger combinations.
    - expect: Search results show matching routes, dates, fares, and loading/error states correctly.
  2. Select an available fare and continue.
    - expect: Traveler details and the fare breakdown are displayed; unavailable or expired fares are handled safely.

#### 3.3. Visa and AI planner flows

**File:** `tests/ui/visa-trip-planner/visa-trip-planner.spec.ts`

**Steps:**
  1. Submit valid and invalid Visa application data and required document variations.
    - expect: Required fields, file rules, submission status, and validation errors are correct.
  2. Submit a valid AI trip request, then empty, oversized, unsafe, and service-error requests.
    - expect: A useful result is shown for valid input; invalid or failed requests produce controlled, safe errors.

### 4. Regression and Non-functional

**Seed:** `tests/seed.spec.ts`

#### 4.1. Locale and currency consistency

**File:** `tests/regression/shared/locale-currency.spec.ts`

**Steps:**
  1. Change currency and language, then inspect home, search, details, checkout, and confirmation surfaces.
    - expect: Labels, prices, dates, formatting, and persisted preferences remain consistent.

#### 4.2. Responsive and accessibility critical paths

**File:** `tests/regression/shared/accessibility-responsive.spec.ts`

**Steps:**
  1. Run authentication and search flows at desktop, tablet, and mobile viewports using keyboard navigation.
    - expect: No critical overlap or horizontal overflow occurs; focus order, names, labels, headings, and form errors are accessible.
  2. Run the same critical flows in Chromium, Firefox, and WebKit.
    - expect: Supported browsers produce equivalent business outcomes.

#### 4.3. Failure, retry, and idempotency behavior

**File:** `tests/regression/booking/retry-idempotency.spec.ts`

**Steps:**
  1. Simulate search timeout, provider failure, stale availability, duplicate submit, and payment decline using approved mocks/sandboxes.
    - expect: The UI gives a controlled error, avoids duplicate booking, preserves safe state, and offers an appropriate retry path.

### 5. API, Database, and Security

**Seed:** `tests/seed.spec.ts`

#### 5.1. API contract and authorization checks

**File:** `tests/api/core-contracts.spec.ts`

**Steps:**
  1. Call approved search, authentication, registration, booking, cancellation, currency/language, and trip-planner endpoints with valid and invalid payloads.
    - expect: Status, headers, schema, required fields, error envelope, timeout, retry, and response-time expectations are met.
  2. Repeat requests with missing/invalid auth, another user's identifiers, malformed values, and rate-limit thresholds.
    - expect: Unauthorized access is rejected consistently and no cross-user data is returned.

#### 5.2. Read-only database reconciliation

**File:** `tests/database/booking-reconciliation.spec.ts`

**Steps:**
  1. Complete approved account, search, booking, application, and cancellation flows in a controlled environment.
    - expect: Read-only queries can locate expected records and relationships.
  2. Compare UI/API identifiers, statuses, totals, currency, availability, audit events, and duplicate behavior with persisted data.
    - expect: Database state matches the observable result and no destructive query is executed.

#### 5.3. Security smoke suite

**File:** `tests/security/critical-security.spec.ts`

**Steps:**
  1. Exercise repeated login/reset attempts, direct protected URLs, logout reuse, unsafe form values, upload edge cases, and safe ID tampering probes.
    - expect: Rate limits, authorization, session invalidation, input encoding, file restrictions, and generic errors behave securely.
  2. Inspect cookies, network payloads, console output, traces, and reports.
    - expect: HTTPS is used; session cookies have appropriate flags; secrets, passwords, payment data, and unmasked PII are absent.
