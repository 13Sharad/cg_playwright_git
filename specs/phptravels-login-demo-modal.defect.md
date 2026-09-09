# Jira Defect Report

## Bug Title
Login form is blocked by the demo warning modal after navigating to the login page

## Module
Account Authentication - Login

## Environment
- Application: PHPTRAVELS
- URL: https://phptravels.net/login
- Browser: Chromium / Desktop Chrome
- OS: Windows
- Date observed: 2026-09-08
- Automation: Playwright 1.63.0

## Preconditions
- PHPTRAVELS is reachable.
- User navigates directly to the login page.
- No authenticated session is required.
- The demo warning modal is displayed.

## Steps to Reproduce
1. Open `https://phptravels.net/login`.
2. Enter `phptravels.valid@example.test` in **Email Address**.
3. Enter `WrongPass!2026` in **Password**.
4. Click **Sign In to your account**.

## Expected Result
The login form accepts the click, submits the credentials, and displays the invalid-credentials error without requiring unrelated page interaction.

## Actual Result
The `demoWarningModal` overlay remains above the login form and intercepts pointer events. The **Sign In to your account** button cannot be clicked, and the login flow remains blocked until the modal is dismissed.

The Playwright action times out after 30 seconds instead of reaching the authentication response or invalid-credentials message.

## Severity
High

## Priority
P1

## Evidence
- Playwright error: `locator.click: Test timeout of 30000ms exceeded`.
- Error identifies `div#demoWarningModal.modal-overlay.flex` as intercepting pointer events.
- The submit button is visible and enabled, but the modal subtree receives the click.
- Page snapshot shows the login form and the modal's `I Understand & Continue` control in the same page state.
- Saved report evidence: `playwright-report/data/a732332aee4c9252e303ac1daab521ffe1a1a82f.md`
- Screenshot: not available in the current `test-results` artifact directory.
- Video and trace: not captured in the current run.
- Network failure: none evidenced; the request is not reached because the click is blocked in the browser.

## Reproducibility
Always in the captured run and repeatable when the demo warning modal is present on login navigation.

## Automation Test
- File: `tests/ui/login.spec.ts`
- Test: `Login > rejects invalid credentials`
- Failing action: `tests/ui/page-objects.ts`, `LoginPage.login()` submit click
