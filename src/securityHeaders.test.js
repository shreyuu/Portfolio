// SEC-01 / SEC-08: deploy config must send hardening headers, and third-party
// CDN stylesheets must be pinned with Subresource Integrity.
import fs from 'fs';
import path from 'path';

const root = path.join(__dirname, '..');
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const rule = (vercel.headers || []).find(h => h.source === '/(.*)');
const headers = Object.fromEntries(
    (rule ? rule.headers : []).map(h => [h.key.toLowerCase(), h.value])
);

test('vercel.json sends an enforced CSP and anti-framing headers', () => {
    const csp = headers['content-security-policy'] || '';
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain('https://api.emailjs.com');
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
});

test('cdnjs stylesheets in public/index.html carry an integrity hash', () => {
    const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
    const links = html.match(/<link[^>]*cdnjs\.cloudflare\.com[^>]*>/g) || [];
    links.forEach(link => {
        expect(link).toMatch(/integrity="sha(256|384|512)-/);
        expect(link).toContain('crossorigin="anonymous"');
    });
});
