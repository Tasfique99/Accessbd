# AccessBD

See it. Understand it. Hear it.

AccessBD is an accessibility-first web app for Bangladesh. It helps people scan a document, read the text, translate between English and Bangla, simplify difficult language, ask questions grounded in the document, and hear the result aloud.

This is an accessibility tool that uses AI. It is not a chatbot wrapped in a webpage.

## Setup

You need Node.js 20+.

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Judge demo (under 30 seconds)

1. Home → **Scan document**
2. **Try with Sample School Notice**
3. Confirm OCR-style result (labelled as a sample, not live OCR)
4. **Translate** → বাংলা tab
5. **Simplify** → Simple tab (or সহজ বাংলা)
6. **Read aloud**
7. **Ask document** → “When is the deadline?”
8. Expected answer: **The application deadline is 30 September 2026.**

## Architecture

```
Camera / upload / sample
        ↓
   services/ocr.js
        ↓
   extracted text
        ↓
 translation.js | ai.js (simplify + ask) | speech.js
        ↓
   accessible result
```

| Folder | Role |
| --- | --- |
| `src/pages` | Routes: Home, Scan, Document, Ask, History, Settings, About |
| `src/components` | Reusable accessible UI |
| `src/services` | OCR, translation, AI, speech, history, settings |
| `src/data/demoDocuments.js` | Fictional Bangladesh sample documents |
| `server/aiProxy.js` | Optional backend AI endpoints used by Vite |

Secrets never go in frontend code. `OPENAI_API_KEY` is read only by the Vite API plugin.

## Demo mode vs live OCR

- Sample buttons load **curated demo text**. The UI says this is **not live OCR**.
- Uploaded or camera photos use **on-device Tesseract.js**. The UI labels that as live OCR.
- If a photo cannot be read, AccessBD asks for a clearer image. It does not silently replace live OCR with fake text.

## API configuration (optional)

Copy `.env.example` to `.env` and add an OpenAI key if you want live simplify/ask:

```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
```

Without a key, simplify/ask still work for sample documents and use a conservative extractive fallback for other text. The AI is instructed to answer only from the document and to say when the document does not provide the answer.

Translation tries, in order: demo sample text, optional `/api/translate`, public MyMemory, then a friendly failure.

## Accessibility

Settings are stored in `localStorage`:

- Text size (small / medium / large / extra large)
- High contrast
- Reduce motion
- Text-to-speech on/off
- English / বাংলা interface

History of scanned documents is also stored locally. Documents are not uploaded to a server unless you later connect your own API.

Form help explains fields only. AccessBD never fills personal data or submits a form.

## Deployment

Any static host works after `npm run build` (`dist/`). For live OpenAI on a host, keep the API key on a server; do not put it in `VITE_` variables.
