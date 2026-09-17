const BN_RANGE = /[\u0980-\u09FF]/

export function detectLanguage(text) {
  const bn = (text.match(BN_RANGE) || []).length
  const latin = (text.match(/[A-Za-z]/) || []).length
  if (bn > latin * 0.6 && bn > 8) return 'bn'
  if (latin > 8) return 'en'
  return bn > latin ? 'bn' : 'en'
}

export function looksLikeForm(text) {
  const sample = text.toLowerCase()
  const hits = [
    'full name',
    'date of birth',
    'signature',
    'phone number',
    'address',
    'পূর্ণ নাম',
    'জন্ম তারিখ',
    'স্বাক্ষর',
  ].filter((term) => sample.includes(term.toLowerCase()))
  return hits.length >= 3
}

export function defaultFormFields() {
  return [
    {
      id: 'fullName',
      label: 'Full Name',
      labelBn: 'পূর্ণ নাম',
      meaning: 'Write the person’s legal name.',
      meaningBn: 'ব্যক্তির আইনি নাম লিখুন।',
    },
    {
      id: 'dob',
      label: 'Date of Birth',
      labelBn: 'জন্ম তারিখ',
      meaning: 'The day the person was born.',
      meaningBn: 'ব্যক্তি যেদিন জন্মেছিলেন।',
    },
    {
      id: 'address',
      label: 'Address',
      labelBn: 'ঠিকানা',
      meaning: 'Where the person currently lives.',
      meaningBn: 'ব্যক্তি এখন যেখানে থাকেন।',
    },
    {
      id: 'phone',
      label: 'Phone Number',
      labelBn: 'ফোন নম্বর',
      meaning: 'A number that can be used for contact.',
      meaningBn: 'যোগাযোগের জন্য একটি নম্বর।',
    },
    {
      id: 'signature',
      label: 'Signature',
      labelBn: 'স্বাক্ষর',
      meaning: 'Sign by hand. AccessBD will never sign or submit this for you.',
      meaningBn: 'হাতে স্বাক্ষর করুন। AccessBD আপনার হয়ে স্বাক্ষর বা জমা দেবে না।',
    },
  ]
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('read-failed'))
    reader.readAsDataURL(file)
  })
}

export function isAllowedImage(file) {
  if (!file) return false
  const type = (file.type || '').toLowerCase()
  const name = (file.name || '').toLowerCase()
  return (
    ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(type) ||
    /\.(jpe?g|png|webp)$/.test(name)
  )
}

export function createId(prefix = 'doc') {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
}
