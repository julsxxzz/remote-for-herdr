import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');

// Browsers fetch the manifest without cookies unless asked. Behind an authenticating proxy
// (Cloudflare Access) that request is sent to the login page, and Chrome then says the app
// cannot be installed.
test('the manifest is fetched with credentials', () => {
  const link = html.match(/<link\b[^>]*\brel="manifest"[^>]*>/)?.[0];
  assert.ok(link, 'index.html links a manifest');
  assert.match(link, /\bcrossorigin="use-credentials"/);
});
