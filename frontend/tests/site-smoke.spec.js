import { test, expect } from '@playwright/test'

const routes = [
  { path: '/', heading: /nurturing.*young minds|empowering futures/i },
  { path: '/about', heading: /movement born from purpose|our story/i },
  { path: '/programs', heading: /our programs|programs/i },
  { path: '/programs/hunger', heading: /hunger|zero hunger/i },
  { path: '/blog', heading: /blog|stories|updates/i },
  { path: '/donate', heading: /donate|generosity/i },
  { path: '/contact', heading: /let's build change together|get in touch/i },
  { path: '/event', heading: /event|events/i },
]

test.describe('Website smoke coverage', () => {
  for (const route of routes) {
    test(`loads ${route.path}`, async ({ page }) => {
      await page.goto(route.path)
      await expect(page).toHaveURL(new RegExp(`${route.path === '/' ? '/$' : route.path}$`))
      await expect(page.getByRole('heading', { name: route.heading }).first()).toBeVisible()
    })
  }

  test('donate flow opens QR payment popup', async ({ page }) => {
    await page.goto('/donate')

    await page.getByPlaceholder(/arjun sharma/i).fill('Playwright Tester')
    await page.getByPlaceholder(/98765 43210/i).fill('9876543210')
    await page.getByPlaceholder(/arjun@email.com/i).fill('tester@example.com')

    await page.getByRole('button', { name: 'Donate Now', exact: true }).click()

    await expect(page.getByRole('heading', { name: /secure donation checkout/i })).toBeVisible()
    await expect(page.getByText(/scan this qr with any upi app/i)).toBeVisible()
  })
})

test.describe('Admin panel smoke coverage', () => {
  test('redirects protected admin route to login', async ({ page }) => {
    await page.goto('/admin/dashboard')
    await expect(page).toHaveURL(/\/admin\/login$/)
    await expect(page.getByText(/admin portal/i)).toBeVisible()
  })

  test('admin login page renders and password toggle works', async ({ page }) => {
    await page.goto('/admin/login')

    await expect(page.getByText(/default credentials/i)).toBeVisible()
    await expect(page.getByText(/admin@brightearth\.org/i)).toBeVisible()

    const passwordInput = page.getByPlaceholder(/••••••••••/i)
    await expect(passwordInput).toHaveAttribute('type', 'password')
    await page.getByRole('button', { name: /toggle password/i }).click()
    await expect(passwordInput).toHaveAttribute('type', 'text')
  })

  test('opens admin dashboard with seeded auth session', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('admin_token', 'playwright-fake-token')
      localStorage.setItem('admin_email', 'admin@brightearth.org')
    })

    await page.goto('/admin/dashboard')
    await expect(page).toHaveURL(/\/admin\/dashboard$/)
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
    await expect(page.getByText(/admin@brightearth\.org/i)).toBeVisible()
  })
})
