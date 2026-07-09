> ⚠️ **Esta es una aplicación de demostración deliberadamente vulnerable, solo para pruebas de seguridad (escaneo con Aikido). No maneja datos reales y NO debe considerarse segura ni usarse como base para producción.**

# Vulnerable Marketplace — Frontend

Frontend en Vue 3 (Composition API) + Vite del [mini-marketplace vulnerable](https://github.com/rromom/aikido-backend-demo) usado como banco de pruebas de Aikido Security (SAST, SCA, secret scanning). Ver el detalle de fallos en [VULNERABILITIES.md](VULNERABILITIES.md).

Backend: [github.com/rromom/aikido-backend-demo](https://github.com/rromom/aikido-backend-demo) (desplegado en Render).

## Desarrollo local
```bash
npm install
npm run dev
```
La SPA queda en `http://localhost:5173` y llama al backend configurado en
`src/api/client.js` (por defecto, la URL de Render en producción).

## Despliegue
Automático vía [.github/workflows/deploy.yml](.github/workflows/deploy.yml) en cada
push a `main`: build con Vite y publicación a GitHub Pages
(`https://rromom.github.io/aikido-demo-frontend/`).

Antes del primer deploy, habilita GitHub Pages en **Settings → Pages → Source: Deploy
from a branch → `gh-pages`** (la rama la crea el propio workflow en su primera corrida).

## Qué NO hacer con este repo
- No lo trates como código de referencia: contiene vulnerabilidades intencionales
  (XSS, secretos hardcodeados, dependencias con CVEs, CI/CD inseguro) marcadas con
  comentarios `// VULN:` / `<!-- VULN: -->`. Ver [VULNERABILITIES.md](VULNERABILITIES.md).
