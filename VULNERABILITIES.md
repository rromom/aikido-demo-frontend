# Mapa de vulnerabilidades intencionales — frontend

Contraparte backend: [aikido-backend-demo/VULNERABILITIES.md](https://github.com/rromom/aikido-backend-demo/blob/main/VULNERABILITIES.md).

| # | Vulnerabilidad | Archivo:Línea | Categoría OWASP | Escaneo Aikido esperado |
|---|-----------------|----------------|------------------|--------------------------|
| 1 | Service role key de Supabase expuesta en el bundle del frontend | [src/config/supabase.js:3](src/config/supabase.js#L3) | A02:2021 Cryptographic Failures (CWE-798) | Secrets |
| 2 | Dependencias npm desactualizadas con CVEs conocidos | [package.json](package.json) (`axios@0.19.0`, `lodash@4.17.11`) | A06:2021 Vulnerable & Outdated Components | SCA |
| 3 | XSS reflejado: término de búsqueda renderizado con `v-html` | [src/views/Home.vue:9](src/views/Home.vue#L9) y [línea 33](src/views/Home.vue#L33) | A03:2021 Injection | SAST / DAST |
| 4 | XSS almacenado: comentarios renderizados con `v-html` | [src/views/ProductDetail.vue:10](src/views/ProductDetail.vue#L10) | A03:2021 Injection | SAST / DAST |
| 5 | Token JWT y datos de usuario en `localStorage` sin protección | [src/store/auth.js:6](src/store/auth.js#L6) | A02:2021 Cryptographic Failures | SAST |
| 6 | Token logueado en consola del navegador | [src/views/Login.vue:33](src/views/Login.vue#L33) | A09:2021 Security Logging & Monitoring Failures | SAST |
| 7 | Panel admin del frontend sin guard de rol/sesión | [src/views/Admin.vue:4](src/views/Admin.vue#L4) | A01:2021 Broken Access Control | SAST / DAST |
| 8 | Permisos de workflow excesivos (`permissions: write-all`) | [.github/workflows/deploy.yml](.github/workflows/deploy.yml#L10) | A05:2021 Security Misconfiguration | CI/CD / IaC |
| 9 | Token de despliegue de terceros hardcodeado en texto plano en el workflow (no usado por el deploy real, que usa `secrets.GITHUB_TOKEN`) | [.github/workflows/deploy.yml:13](.github/workflows/deploy.yml#L13) | A02:2021 Cryptographic Failures (CWE-798) | Secrets / CI/CD |

## Cómo re-generar esta lista
```bash
grep -rn "VULN:" src .github
```
