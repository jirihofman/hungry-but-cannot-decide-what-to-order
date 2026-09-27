import { test, expect } from '@playwright/test';

test('food categories and spin controls keep their styles and behavior', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('astro-island')).not.toHaveAttribute('ssr', '');
  await expect(page.locator('main')).toHaveCSS('display', 'flex');
  await expect(page.locator('main')).toHaveCSS('flex-direction', 'column');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(page.locator('.slot')).toHaveCount(12);

  // The existing initial shuffle uses the clock. Assert explicit choices after hydration.
  const fancy = page.getByRole('button', { name: 'HK fancy', exact: true });
  await fancy.click();
  await expect(fancy).toHaveCSS('background-color', 'rgb(59, 130, 246)');
  await expect.poll(async () => [...new Set(await page.locator('.slot p').allTextContents())].sort())
    .toEqual(['Avion', 'Nepálská', 'Náplavka'].sort());

  const vegan = page.getByRole('button', { name: 'Ultravegan', exact: true });
  await vegan.click();
  await expect(vegan).toHaveCSS('background-color', 'rgb(59, 130, 246)');
  await expect(fancy).not.toHaveClass(/bg-blue-500/);
  await expect.poll(async () => (await page.locator('.slot p').allTextContents()).sort())
    .toEqual(['🍎', '🍌', '🥦', '🥑', '🥒', '🌽', '🥔', '🍠', '🥕', '🥬', '🫑', '🍍'].sort());

  await page.getByRole('button', { name: 'Vyber jídlo', exact: true }).click();
  await expect(page.locator('.ring')).toHaveClass(/spin-\d+/);
  await expect(page.locator('.ring')).toHaveCSS('animation-duration', '1s, 3s');
  await expect(page.locator('.ring')).toHaveCSS('transform-style', 'preserve-3d');
});
