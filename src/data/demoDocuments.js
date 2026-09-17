/**
 * Fictional demo documents for AccessBD.
 * These are fallback/sample texts — never label them as live OCR.
 */

export const DEMO_DOCUMENTS = [
  {
    id: 'school-notice',
    name: 'Sample School Notice',
    nameBn: 'নমুনা স্কুল নোটিশ',
    type: 'notice',
    isForm: false,
    language: 'en',
    confidence: 0.96,
    preview:
      'Greenfield Model School, Dhaka — Class VI admission. Applications must be submitted before 30 September 2026.',
    extractedText: `GREENFIELD MODEL SCHOOL
Dhaka, Bangladesh

NOTICE
Admission to Class VI — Academic Year 2027

Applications must be submitted before 30 September 2026.

Who can apply: Children who have completed Class V in 2026.

Required documents:
1. Birth certificate
2. Two recent passport-size photographs
3. Progress report from the previous school

Application fee: BDT 200.

Please submit the form at the school office between 9:00 AM and 1:00 PM, Sunday to Thursday.

For questions, contact the school office on 02-5555-0140.

Issued by the Head Teacher
12 August 2026`,
    translationBn: `গ্রিনফিল্ড মডেল স্কুল
ঢাকা, বাংলাদেশ

নোটিশ
ষষ্ঠ শ্রেণিতে ভর্তি — শিক্ষাবর্ষ ২০২৭

আবেদনপত্র ৩০ সেপ্টেম্বর ২০২৬-এর মধ্যে জমা দিতে হবে।

কে আবেদন করতে পারবে: যেসব শিশু ২০২৬ সালে পঞ্চম শ্রেণি সম্পন্ন করেছে।

প্রয়োজনীয় কাগজপত্র:
১. জন্ম সনদ
২. দুই কপি সদ্য তোলা পাসপোর্ট সাইজের ছবি
৩. আগের স্কুলের প্রগতি প্রতিবেদন

আবেদন ফি: ২০০ টাকা।

রবিবার থেকে বৃহস্পতিবার সকাল ৯টা থেকে দুপুর ১টার মধ্যে স্কুল অফিসে ফর্ম জমা দিন।

প্রশ্নের জন্য স্কুল অফিসে যোগাযোগ করুন: ০২-৫৫৫৫-০১৪০।

প্রধান শিক্ষক কর্তৃক জারি
১২ আগস্ট ২০২৬`,
    simpleEn: `This is a notice from Greenfield Model School in Dhaka.

The school is taking applications for Class 6 for the 2027 school year.

You need to submit your application before 30 September 2026.

Who can apply: children who finished Class 5 in 2026.

You must bring:
- a birth certificate
- two recent passport photos
- the progress report from the last school

The fee is 200 taka.

Take the form to the school office from 9:00 AM to 1:00 PM, Sunday to Thursday.

If you have questions, call the school office on 02-5555-0140.

The Head Teacher published this notice on 12 August 2026.`,
    simpleBn: `এটি ঢাকার গ্রিনফিল্ড মডেল স্কুলের একটি নোটিশ।

স্কুল ২০২৭ শিক্ষাবর্ষে ষষ্ঠ শ্রেণিতে ভর্তির আবেদন নিচ্ছে।

আপনাকে ৩০ সেপ্টেম্বর ২০২৬-এর আগে আবেদন জমা দিতে হবে।

কে আবেদন করতে পারবে: যেসব শিশু ২০২৬ সালে পঞ্চম শ্রেণি শেষ করেছে।

আনতে হবে:
- জন্ম সনদ
- দুই কপি সদ্য তোলা পাসপোর্ট ছবি
- আগের স্কুলের প্রগতি প্রতিবেদন

ফি ২০০ টাকা।

রবিবার থেকে বৃহস্পতিবার সকাল ৯টা থেকে দুপুর ১টা পর্যন্ত স্কুল অফিসে ফর্ম জমা দিন।

প্রশ্ন থাকলে স্কুল অফিসে ফোন করুন: ০২-৫৫৫৫-০১৪০।

প্রধান শিক্ষক এই নোটিশ ১২ আগস্ট ২০২৬ তারিখে দিয়েছেন।`,
    answers: [
      {
        match: /deadline|last date|when|submit|30 september|শেষ তারিখ|কবে|জমা/i,
        en: 'The application deadline is 30 September 2026.',
        bn: 'আবেদনের শেষ তারিখ ৩০ সেপ্টেম্বর ২০২৬।',
      },
      {
        match: /who can apply|eligible|eligibility|কে আবেদন|কারা/i,
        en: 'Children who have completed Class V in 2026 can apply.',
        bn: 'যেসব শিশু ২০২৬ সালে পঞ্চম শ্রেণি সম্পন্ন করেছে তারা আবেদন করতে পারবে।',
      },
      {
        match: /document|required|papers|কাগজ|প্রয়োজন/i,
        en: 'Required documents are a birth certificate, two recent passport-size photographs, and a progress report from the previous school.',
        bn: 'প্রয়োজনীয় কাগজপত্র: জন্ম সনদ, দুই কপি সদ্য তোলা পাসপোর্ট সাইজের ছবি, এবং আগের স্কুলের প্রগতি প্রতিবেদন।',
      },
      {
        match: /fee|cost|taka|টাকা|ফি/i,
        en: 'The application fee is BDT 200.',
        bn: 'আবেদন ফি ২০০ টাকা।',
      },
      {
        match: /office|time|hours|when to|সময়|অফিস/i,
        en: 'Submit the form at the school office between 9:00 AM and 1:00 PM, Sunday to Thursday.',
        bn: 'রবিবার থেকে বৃহস্পতিবার সকাল ৯টা থেকে দুপুর ১টার মধ্যে স্কুল অফিসে ফর্ম জমা দিন।',
      },
      {
        match: /summar|explain|what is this|এটি কী|সারসংক্ষেপ/i,
        en: 'This school notice invites applications for Class VI admission for academic year 2027. The deadline is 30 September 2026 and the fee is BDT 200.',
        bn: 'এই স্কুল নোটিশে ২০২৭ শিক্ষাবর্ষে ষষ্ঠ শ্রেণিতে ভর্তির আবেদন চাওয়া হয়েছে। শেষ তারিখ ৩০ সেপ্টেম্বর ২০২৬ এবং ফি ২০০ টাকা।',
      },
    ],
  },
  {
    id: 'gov-notice',
    name: 'Sample Public Service Notice',
    nameBn: 'নমুনা সরকারি সেবা নোটিশ',
    type: 'notice',
    isForm: false,
    language: 'en',
    confidence: 0.93,
    preview:
      'Ward Public Service Desk, Khulna — birth certificate copies. Collect within 14 working days.',
    extractedText: `WARD PUBLIC SERVICE DESK
Khulna City Corporation (Sample)

PUBLIC NOTICE
Certified copies of birth certificates

Residents of Ward 12 may apply for a certified copy of a birth certificate at the Ward Public Service Desk.

Applications will be received from 1 October 2026 to 31 October 2026.

Bring:
- National ID card of the parent or guardian
- Previous birth registration number, if available
- BDT 50 service charge

Copies will be ready within 14 working days.

This is a fictional sample notice for AccessBD demonstration only.`,
    translationBn: `ওয়ার্ড পাবলিক সার্ভিস ডেস্ক
খুলনা সিটি কর্পোরেশন (নমুনা)

জনবিজ্ঞপ্তি
জন্ম সনদের সত্যায়িত অনুলিপি

ওয়ার্ড ১২-এর বাসিন্দারা ওয়ার্ড পাবলিক সার্ভিস ডেস্কে জন্ম সনদের সত্যায়িত অনুলিপির জন্য আবেদন করতে পারেন।

আবেদন ১ অক্টোবর ২০২৬ থেকে ৩১ অক্টোবর ২০২৬ পর্যন্ত গ্রহণ করা হবে।

আনুন:
- অভিভাবকের জাতীয় পরিচয়পত্র
- আগের জন্ম নিবন্ধন নম্বর, যদি থাকে
- ৫০ টাকা সেবামূল্য

১৪ কার্যদিবসের মধ্যে অনুলিপি প্রস্তুত হবে।

এটি AccessBD প্রদর্শনের জন্য একটি কাল্পনিক নমুনা নোটিশ।`,
    simpleEn: `This is a sample public notice from a Ward Public Service Desk in Khulna.

People who live in Ward 12 can ask for a certified copy of a birth certificate.

Apply from 1 October 2026 to 31 October 2026.

Bring a parent or guardian National ID card, the old birth registration number if you have it, and 50 taka.

The copy should be ready in 14 working days.`,
    simpleBn: `এটি খুলনার একটি ওয়ার্ড পাবলিক সার্ভিস ডেস্কের নমুনা নোটিশ।

ওয়ার্ড ১২-এর মানুষ জন্ম সনদের সত্যায়িত কপি চাইতে পারেন।

১ অক্টোবর ২০২৬ থেকে ৩১ অক্টোবর ২০২৬ পর্যন্ত আবেদন করুন।

অভিভাবকের জাতীয় পরিচয়পত্র, পুরনো জন্ম নিবন্ধন নম্বর (যদি থাকে) এবং ৫০ টাকা নিয়ে আসুন।

১৪ কার্যদিবসে কপি তৈরি হওয়ার কথা।`,
    answers: [
      {
        match: /deadline|when|date|last|কবে|তারিখ/i,
        en: 'Applications are received from 1 October 2026 to 31 October 2026.',
        bn: 'আবেদন ১ অক্টোবর ২০২৬ থেকে ৩১ অক্টোবর ২০২৬ পর্যন্ত গ্রহণ করা হবে।',
      },
      {
        match: /who|ward|resident|কে/i,
        en: 'Residents of Ward 12 may apply.',
        bn: 'ওয়ার্ড ১২-এর বাসিন্দারা আবেদন করতে পারেন।',
      },
      {
        match: /document|bring|need|কাগজ|কী আনতে/i,
        en: 'Bring a parent or guardian National ID card, the previous birth registration number if available, and BDT 50.',
        bn: 'অভিভাবকের জাতীয় পরিচয়পত্র, আগের জন্ম নিবন্ধন নম্বর (যদি থাকে) এবং ৫০ টাকা আনুন।',
      },
      {
        match: /ready|days|how long|কত দিন/i,
        en: 'Copies will be ready within 14 working days.',
        bn: '১৪ কার্যদিবসের মধ্যে অনুলিপি প্রস্তুত হবে।',
      },
    ],
  },
  {
    id: 'clinic-form',
    name: 'Sample Clinic Registration Form',
    nameBn: 'নমুনা ক্লিনিক নিবন্ধন ফর্ম',
    type: 'form',
    isForm: true,
    language: 'en',
    confidence: 0.91,
    preview: 'Riverside Community Clinic — new patient registration form.',
    formFields: [
      {
        id: 'fullName',
        label: 'Full Name',
        labelBn: 'পূর্ণ নাম',
        meaning:
          'Write the patient’s name as it appears on a National ID card or birth certificate.',
        meaningBn: 'রোগীর নাম জাতীয় পরিচয়পত্র বা জন্ম সনদে যেমন আছে তেমন লিখুন।',
      },
      {
        id: 'dob',
        label: 'Date of Birth',
        labelBn: 'জন্ম তারিখ',
        meaning: 'The day, month and year the patient was born.',
        meaningBn: 'রোগী যেদিন জন্মেছিলেন সেই দিন, মাস ও বছর।',
      },
      {
        id: 'address',
        label: 'Address',
        labelBn: 'ঠিকানা',
        meaning: 'Where the patient currently lives, including area and district.',
        meaningBn: 'রোগী এখন যেখানে থাকেন, এলাকা ও জেলাসহ।',
      },
      {
        id: 'phone',
        label: 'Phone Number',
        labelBn: 'ফোন নম্বর',
        meaning: 'A number the clinic can use to contact the patient or a family member.',
        meaningBn: 'ক্লিনিক রোগী বা পরিবারের সদস্যের সাথে যোগাযোগের জন্য যে নম্বর ব্যবহার করতে পারে।',
      },
      {
        id: 'signature',
        label: 'Signature',
        labelBn: 'স্বাক্ষর',
        meaning:
          'The patient or guardian should sign by hand. AccessBD will never sign or submit this for you.',
        meaningBn:
          'রোগী বা অভিভাবক নিজে হাতে স্বাক্ষর করবেন। AccessBD কখনো আপনার হয়ে স্বাক্ষর বা জমা দেবে না।',
      },
    ],
    extractedText: `RIVERSIDE COMMUNITY CLINIC
Chattogram (Sample Form)

NEW PATIENT REGISTRATION

Please complete this form in clear handwriting. Do not leave required fields blank.

Required information:
- Full Name
- Date of Birth
- Address
- Phone Number
- Signature of patient or guardian

Clinic hours: Saturday to Thursday, 8:30 AM to 2:00 PM.
Bring any previous prescription if you have one.

This form is a fictional sample. AccessBD does not fill in personal details or submit forms.`,
    translationBn: `রিভারসাইড কমিউনিটি ক্লিনিক
চট্টগ্রাম (নমুনা ফর্ম)

নতুন রোগী নিবন্ধন

অনুগ্রহ করে পরিষ্কার হাতের লেখায় এই ফর্ম পূরণ করুন। প্রয়োজনীয় ঘর খালি রাখবেন না।

প্রয়োজনীয় তথ্য:
- পূর্ণ নাম
- জন্ম তারিখ
- ঠিকানা
- ফোন নম্বর
- রোগী বা অভিভাবকের স্বাক্ষর

ক্লিনিকের সময়: শনিবার থেকে বৃহস্পতিবার, সকাল ৮:৩০ থেকে দুপুর ২:০০।
আগের কোনো প্রেসক্রিপশন থাকলে সাথে আনুন।

এই ফর্ম একটি কাল্পনিক নমুনা। AccessBD ব্যক্তিগত তথ্য পূরণ বা ফর্ম জমা দেয় না।`,
    simpleEn: `This is a sample form from Riverside Community Clinic in Chattogram.

It is used to register a new patient.

You must write:
- full name
- date of birth
- address
- phone number
- a signature

The clinic is open Saturday to Thursday, 8:30 AM to 2:00 PM.

AccessBD can explain the fields. It will not type your private details or send the form.`,
    simpleBn: `এটি চট্টগ্রামের রিভারসাইড কমিউনিটি ক্লিনিকের একটি নমুনা ফর্ম।

নতুন রোগী নিবন্ধনের জন্য এটি ব্যবহার হয়।

লিখতে হবে:
- পূর্ণ নাম
- জন্ম তারিখ
- ঠিকানা
- ফোন নম্বর
- স্বাক্ষর

ক্লিনিক শনিবার থেকে বৃহস্পতিবার সকাল ৮:৩০ থেকে দুপুর ২:০০ পর্যন্ত খোলা।

AccessBD ঘরগুলো বুঝিয়ে দিতে পারে। এটি আপনার গোপন তথ্য লিখবে না বা ফর্ম পাঠাবে না।`,
    answers: [
      {
        match: /required|field|what.*fill|কী লিখতে/i,
        en: 'Required fields are Full Name, Date of Birth, Address, Phone Number, and Signature.',
        bn: 'প্রয়োজনীয় ঘর: পূর্ণ নাম, জন্ম তারিখ, ঠিকানা, ফোন নম্বর এবং স্বাক্ষর।',
      },
      {
        match: /hours|time|open|সময়/i,
        en: 'Clinic hours are Saturday to Thursday, 8:30 AM to 2:00 PM.',
        bn: 'ক্লিনিক শনিবার থেকে বৃহস্পতিবার সকাল ৮:৩০ থেকে দুপুর ২:০০ পর্যন্ত খোলা।',
      },
    ],
  },
  {
    id: 'health-leaflet',
    name: 'Sample Healthcare Leaflet',
    nameBn: 'নমুনা স্বাস্থ্য তথ্য পত্র',
    type: 'leaflet',
    isForm: false,
    language: 'en',
    confidence: 0.94,
    preview:
      'Community health leaflet — keep oral rehydration solution at home during hot weather.',
    extractedText: `COMMUNITY HEALTH INFORMATION
Sylhet District Health Outreach (Sample)

Stay well in hot weather

Drink safe water several times a day.

If someone has diarrhoea, mix oral rehydration solution (ORS) as written on the packet and give small sips often.

Go to a health centre the same day if there is:
- blood in stool
- repeated vomiting
- very little urine
- the person is unusually sleepy

Keep ORS packets at home. This leaflet does not replace advice from a qualified health worker.

Fictional sample for AccessBD. Not medical advice.`,
    translationBn: `কমিউনিটি স্বাস্থ্য তথ্য
সিলেট জেলা স্বাস্থ্য আউটরিচ (নমুনা)

গরমকালে সুস্থ থাকুন

দিনে কয়েকবার নিরাপদ পানি পান করুন।

কারো ডায়রিয়া হলে প্যাকেটের নিয়ম অনুযায়ী ওরস্যালাইন (ORS) মিশিয়ে অল্প অল্প করে বারবার পান করান।

একই দিন স্বাস্থ্যকেন্দ্রে যান যদি থাকে:
- পায়ে রক্ত
- বারবার বমি
- খুব কম প্রস্রাব
- অস্বাভাবিক ঘুমঘুম ভাব

বাড়িতে ওরস্যালাইন প্যাকেট রাখুন। এই পত্র যোগ্য স্বাস্থ্যকর্মীর পরামর্শের বিকল্প নয়।

AccessBD-এর জন্য কাল্পনিক নমুনা। চিকিৎসা পরামর্শ নয়।`,
    simpleEn: `This is a sample health leaflet from Sylhet.

Drink safe water often in hot weather.

If someone has diarrhoea, mix ORS as the packet says and give small sips many times.

See a health centre the same day if there is blood in stool, lots of vomiting, very little urine, or unusual sleepiness.

Keep ORS at home. This is not a replacement for a health worker.`,
    simpleBn: `এটি সিলেটের একটি নমুনা স্বাস্থ্য পত্র।

গরমে বারবার নিরাপদ পানি পান করুন।

ডায়রিয়া হলে প্যাকেটের নিয়মে ওরস্যালাইন মিশিয়ে অল্প করে বারবার পান করান।

পায়ে রক্ত, বেশি বমি, খুব কম প্রস্রাব বা অস্বাভাবিক ঘুম ঘুম ভাব থাকলে সেদিনই স্বাস্থ্যকেন্দ্রে যান।

বাড়িতে ওরস্যালাইন রাখুন। এটি স্বাস্থ্যকর্মীর বিকল্প নয়।`,
    answers: [
      {
        match: /ors|diarrhoea|diarrhea|ডায়রিয়া|ওরস/i,
        en: 'If someone has diarrhoea, mix ORS as written on the packet and give small sips often.',
        bn: 'কারো ডায়রিয়া হলে প্যাকেটের নিয়ম অনুযায়ী ওরস্যালাইন মিশিয়ে অল্প অল্প করে বারবার পান করান।',
      },
      {
        match: /when.*go|health centre|emergency|কখন যাবে/i,
        en: 'Go to a health centre the same day if there is blood in stool, repeated vomiting, very little urine, or unusual sleepiness.',
        bn: 'পায়ে রক্ত, বারবার বমি, খুব কম প্রস্রাব বা অস্বাভাবিক ঘুমঘুম ভাব থাকলে সেদিনই স্বাস্থ্যকেন্দ্রে যান।',
      },
    ],
  },
]

export function getDemoDocument(id) {
  return DEMO_DOCUMENTS.find((doc) => doc.id === id) ?? null
}
