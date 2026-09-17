const SYSTEM = `You are AccessBD, an accessibility assistant for documents in Bangladesh.
Answer only using information contained in the supplied document.
If the information is not present, say that the document does not provide the answer.
Do not invent dates, names, amounts, requirements or deadlines.
When simplifying, keep all facts (dates, names, amounts, requirements, deadlines) unchanged.
Never fill personal data or submit forms.`

async function callOpenAI(messages) {
  const key = process.env.OPENAI_API_KEY
  if (!key) return null
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.2,
      messages,
    }),
  })
  if (!response.ok) return null
  const data = await response.json()
  return data.choices?.[0]?.message?.content?.trim() || null
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString() || '{}'))
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function json(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export function accessBdApiPlugin() {
  const handler = async (req, res, next) => {
    if (!req.url?.startsWith('/api/')) return next()
    if (req.method !== 'POST') return json(res, 405, { error: 'method' })

    let body
    try {
      body = await readBody(req)
    } catch {
      return json(res, 400, { error: 'invalid-json' })
    }

    if (req.url.startsWith('/api/ai/simplify')) {
      const text = await callOpenAI([
        { role: 'system', content: SYSTEM },
        {
          role: 'user',
          content: `Simplify this document into ${body.targetLang === 'bn' ? 'simple Bangla' : 'simple English'}. Keep facts unchanged.\n\n${body.text}`,
        },
      ])
      if (!text) return json(res, 501, { error: 'no-api-key' })
      return json(res, 200, { text, source: 'openai' })
    }

    if (req.url.startsWith('/api/ai/ask')) {
      const text = await callOpenAI([
        { role: 'system', content: SYSTEM },
        {
          role: 'user',
          content: `Document:\n${body.documentText}\n\nQuestion: ${body.question}\nAnswer in ${body.language === 'bn' ? 'Bangla' : 'English'}.`,
        },
      ])
      if (!text) return json(res, 501, { error: 'no-api-key' })
      return json(res, 200, { answer: text, source: 'openai' })
    }

    if (req.url.startsWith('/api/translate')) {
      return json(res, 501, { error: 'no-translation-key' })
    }

    return next()
  }

  return {
    name: 'accessbd-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}
