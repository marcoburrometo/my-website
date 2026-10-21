# Marco Burrometo CV

Curriculum web realizzato con Next.js App Router, TypeScript e Tailwind CSS.

## Avvio

Il progetto richiede Node.js 20.9 o superiore. Con
[nvm](https://github.com/nvm-sh/nvm) è possibile usare la versione indicata dal
repository:

```bash
nvm install
nvm use
corepack enable
```

`npm` è il package manager canonico del progetto; la versione è indicata in
`package.json` e `package-lock.json` deve essere mantenuto aggiornato. Dopo
`corepack enable`, Yarn è disponibile per gli strumenti che lo richiedono e
usa `node_modules` come linker.

```bash
npm install
npm run dev
```

Apri http://localhost:3000. Le varianti sono disponibili anche direttamente:

- `/varianti/hypercard`
- `/varianti/editorial-pop`
- `/varianti/mono-terminal`
- `/varianti/antigravity`
- `/varianti/signal-bloom`

## Variante predefinita

Imposta `DEFAULT_CV_VARIANT` per scegliere quale variante aprire alla root `/`:

```env
DEFAULT_CV_VARIANT=antigravity
```

Valori supportati: `hypercard`, `editorial-pop`, `mono-terminal`, `antigravity`, `signal-bloom`. Se la variabile manca o contiene un valore non valido, la root mostra la homepage standard.

Copia `.env.example` in `.env.local` e modifica il valore per lo sviluppo locale. In produzione imposta la variabile nell'ambiente del server; viene letta a ogni richiesta.

## Google Analytics

Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` to the GA4 Measurement ID in `.env.local` and your deployment environment. Analytics loads only after the visitor opts in; Next.js route changes are tracked automatically. Consent can be changed later with **Privacy settings**.
