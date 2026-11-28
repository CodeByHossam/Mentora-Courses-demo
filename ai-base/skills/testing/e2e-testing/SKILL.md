---
name: e2e-testing
description: >-
  End-to-end testing with Playwright: test structure, page objects, auth
  state reuse, waiting strategies, visual checks, and CI configuration. Use when
  writing browser tests for critical user journeys. Trigger phrases: "E2E test",
  "Playwright", "browser test", "page object", "flaky test", "test user journey",
  "visual regression", "CI browser tests".
---

# E2E Testing (Playwright)

E2E tests simulate real user journeys in a real browser. Keep the suite small,
focused on critical paths, and free of arbitrary waits.

## When to use

- Automating critical flows (signup, login, checkout, core action).
- Setting up browser tests and CI.
- Fixing flaky browser tests.
- Trigger phrases: "E2E test", "Playwright", "browser test", "page object",
  "flaky test", "test user journey", "visual regression".

## Instructions

1. Test only critical journeys; push detail down to unit/integration tests.
2. Use role/label-based locators (`getByRole`, `getByLabel`) — never brittle CSS/XPath.
3. Rely on Playwright's auto-waiting; never use fixed `waitForTimeout`.
4. Isolate tests with fresh state; reuse auth via storage state, not UI login each time.
5. Create/seed test data via API or fixtures, not the UI, when possible.
6. Capture trace/screenshot/video on failure for debugging.
7. Run with retries only to absorb infra flake, not to hide real bugs.

### Config

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: 'http://localhost:5173', trace: 'on-first-retry', video: 'retain-on-failure' },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    { name: 'chromium', use: { ...devices['Desktop Chrome'], storageState: 'e2e/.auth/user.json' }, dependencies: ['setup'] },
  ],
  webServer: { command: 'npm run preview', url: 'http://localhost:5173', reuseExistingServer: !process.env.CI },
});
```

### Page object

```ts
export class LoginPage {
  constructor(private page: Page) {}
  async goto() { await this.page.goto('/login'); }
  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }
}
```

### A journey test

```ts
test('user can create a post', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('u@example.com', 'Password123!');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.getByRole('link', { name: 'New post' }).click();
  await page.getByLabel('Title').fill('Hello');
  await page.getByRole('button', { name: 'Publish' }).click();
  await expect(page.getByText('Hello')).toBeVisible();
});
```

## Examples

### Good — user-facing locator, auto-wait, seeded data

```ts
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByRole('alert')).toHaveText('Saved');
```

### Bad — brittle selectors and fixed waits

```ts
await page.locator('div.css-1a2b3c > button').click();
await page.waitForTimeout(3000);          // flaky and slow
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Fixed `waitForTimeout` | Flaky and slow | Rely on auto-waiting/assertions |
| CSS/XPath locators | Break on refactor | Role/label locators |
| Logging in via UI every test | Slow, brittle | Reuse `storageState` |
| Testing every edge case in E2E | Slow suite | Push down the pyramid |
| Retries masking bugs | Hides real failures | Fix root cause |
| Shared state across tests | Order dependence | Isolate per test |
| No artifacts on failure | Blind debugging | Trace/video/screenshot |

## Related skills

- `testing/testing-strategy`, `testing/integration-testing`,
  `workflow/deployment`, `frontend/react-component-patterns`.
