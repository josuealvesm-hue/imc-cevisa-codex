# imc-cevisa-codex

Landing page de triagem educativa de risco metabólico (IMC + razão cintura/altura) para o Spa Médico Adventista Cevisa.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## GitHub Pages (deploy)

Este projeto está configurado para publicar no GitHub Pages com `gh-pages`.

1. Atualize o `base` em `vite.config.js` para o nome do seu repositório:

```js
base: '/SEU_REPO/'
```

2. Instale dependências e faça o build:

```bash
npm install
npm run build
```

3. Faça o deploy:

```bash
npm run deploy
```

A URL final ficará:

```
https://<seu-usuario>.github.io/SEU_REPO/
```
