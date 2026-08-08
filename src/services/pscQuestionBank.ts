import type { Question } from '../components/student/ExamRunnerScreen';

export const initialPscQuestionBank: Question[] = [
  {
    id: 1,
    text: 'Which Constitutional Amendment Act added the terms "Socialist", "Secular", and "Integrity" to the Preamble of the Indian Constitution?',
    textMl: 'ഇന്ത്യൻ ഭരണഘടനയുടെ ആമുഖത്തിലേക്ക് "സോഷ്യലിസ്റ്റ്", "സെക്യുലർ", "അഖണ്ഡത" എന്നീ വാക്കുകൾ കൂട്ടിച്ചേർത്ത ഭരണഘടനാ ഭേദഗതി ആക്റ്റ് ഏതാണ്?',
    optionA: '44th Amendment Act 1978',
    optionAMl: '44-ാം ഭേദഗതി ആക്റ്റ് 1978',
    optionB: '42nd Amendment Act 1976',
    optionBMl: '42-ാം ഭേദഗതി ആക്റ്റ് 1976',
    optionC: '86th Amendment Act 2002',
    optionCMl: '86-ാം ഭേദഗതി ആക്റ്റ് 2002',
    optionD: '73rd Amendment Act 1992',
    optionDMl: '73-ാം ഭേദഗതി ആക്റ്റ് 1992',
    correctOption: 'B',
    explanation: 'The 42nd Constitutional Amendment Act of 1976 added three new words—Socialist, Secular, and Integrity—to the Preamble of the Indian Constitution.',
    explanationMl: '1976 ലെ 42-ാം ഭരണഘടനാ ഭേദഗതി ആക്റ്റ് ആണ് ഇന്ത്യൻ ഭരണഘടനയുടെ ആമുഖത്തിലേക്ക് സോഷ്യലിസ്റ്റ്, സെക്യുലർ, അഖണ്ഡത എന്നീ മൂന്ന് പുതിയ വാക്കുകൾ കൂട്ടിച്ചേർത്തത്.',
    relatedFacts: [
      'Often called the "Mini-Constitution".',
      'Enacted during the National Emergency under the Indira Gandhi government.',
      'Added Fundamental Duties under Article 51A (Part IV-A).'
    ]
  },
  {
    id: 2,
    text: 'Who founded the Advaita Ashram at Aluva in 1913?',
    textMl: '1913-ൽ ആലുവയിൽ അദ്വൈതാശ്രമം സ്ഥാപിച്ചത് ആരാണ്?',
    optionA: 'Chattampi Swamikal',
    optionAMl: 'ചട്ടമ്പി സ്വാമികൾ',
    optionB: 'Sree Narayana Guru',
    optionBMl: 'ശ്രീ നാരായണ ഗുരു',
    optionC: 'Vagbhatananda',
    optionCMl: 'വാഗ്ഭടാനന്ദൻ',
    optionD: 'Brahmananda Sivayogi',
    optionDMl: 'ബ്രഹ്മാനന്ദ ശിവയോഗി',
    correctOption: 'B',
    explanation: 'Sree Narayana Guru established the Advaita Ashram at Aluva in 1913 with the famous motto "Om Sahonavavatu" and emphasized one caste, one religion, one god for man.',
    explanationMl: '1913-ൽ "ഒരു ജാതി ഒരു മതം ഒരു ദൈവം മനുഷ്യന്" എന്ന തത്ത്വം ഉയർത്തിപ്പിടിച്ച് ശ്രീ നാരായണ ഗുരുവാണ് ആലുവ അദ്വൈതാശ്രമം സ്ഥാപിച്ചത്.',
    relatedFacts: [
      'Motto of Aluva Ashram: "Gain Freedom through Education".',
      'Sree Narayana Guru organized the All Religions Conference at Aluva in 1924.',
      'Aruvippuram Pratishta took place in 1888.'
    ]
  },
  {
    id: 3,
    text: 'Identify the Malayalam Sandhi type in the word "കൺപീലി" (കൺ + പീലി)?',
    textMl: '"കൺപീലി" (കൺ + പീലി) എന്ന പദത്തിലെ സന്ധി ഏതാണ്?',
    optionA: 'ആദേശസന്ധി (Aadesa Sandhi)',
    optionAMl: 'ആദേശസന്ധി',
    optionB: 'ലോപസന്ധി (Lopa Sandhi)',
    optionBMl: 'ലോപസന്ധി',
    optionC: 'ആഗമസന്ധി (Aagama Sandhi)',
    optionCMl: 'ആഗമസന്ധി',
    optionD: 'ദ്വിത്വസന്ധി (Dwitwa Sandhi)',
    optionDMl: 'ദ്വിത്വസന്ധി',
    correctOption: 'A',
    explanation: 'In Aadesa Sandhi, one sound/letter is replaced by another letter during word combination.',
    explanationMl: 'ഒരു വർണ്ണത്തിന് പകരം വേറൊരു വർണ്ണം വരുന്നതാണ് ആദേശസന്ധി.',
    relatedFacts: [
      'മലയാള സന്ധികൾ പ്രധാനമായും 4 തരം: ലോപം, ആഗമം, ആദേശം, ദ്വിത്വം.',
      'മരം + കുട്ടി = മരക്കുട്ടി (ലോപസന്ധി / ദ്വിത്വം).',
      'തിരു + ഓണം = തിരുവോണം (ആഗമസന്ധി).'
    ]
  },
  {
    id: 4,
    text: 'What is the minimum age required for election as the President of India under Article 58?',
    textMl: 'ആർട്ടിക്കിൾ 58 പ്രകാരം ഇന്ത്യൻ രാഷ്ട്രപതിയായി തിരഞ്ഞെടുക്കപ്പെടുന്നതിന് വേണ്ട കുറഞ്ഞ പ്രായം എത്രയാണ്?',
    optionA: '25 Years',
    optionAMl: '25 വയസ്സ്',
    optionB: '30 Years',
    optionBMl: '30 വയസ്സ്',
    optionC: '35 Years',
    optionCMl: '35 വയസ്സ്',
    optionD: '21 Years',
    optionDMl: '21 വയസ്സ്',
    correctOption: 'C',
    explanation: 'Under Article 58 of the Indian Constitution, a candidate must be a citizen of India, at least 35 years of age, and qualified for election as a member of the Lok Sabha.',
    explanationMl: 'ഭരണഘടനയുടെ ആർട്ടിക്കിൾ 58 പ്രകാരം രാഷ്ട്രപതി സ്ഥാനാർത്ഥിക്ക് കുറഞ്ഞത് 35 വയസ്സ് തികഞ്ഞിരിക്കണം.',
    relatedFacts: [
      'Lok Sabha MP minimum age: 25 years.',
      'Rajya Sabha MP minimum age: 30 years.',
      'Panchayat Election minimum age: 21 years.'
    ]
  },
  {
    id: 5,
    text: 'Which is the highest peak in the Western Ghats and South India?',
    textMl: 'പടിഞ്ഞാറൻ ഘട്ടങ്ങളിലെയും ദക്ഷിണേന്ത്യയിലെയും ഏറ്റവും ഉയരം കൂടിയ കൊടുമുടി ഏതാണ്?',
    optionA: 'Doddabetta',
    optionAMl: 'ദൊഡ്ഡബെട്ട',
    optionB: 'Anamudi',
    optionBMl: 'ആനമുടി',
    optionC: 'Agasthyarkoodam',
    optionCMl: 'അഗസ്ത്യാർകൂടം',
    optionD: 'Mullayanagiri',
    optionDMl: 'മുളളയ്യനഗിരി',
    correctOption: 'B',
    explanation: 'Anamudi, located in the Eravikulam National Park in Idukki district, Kerala, is the highest peak in South India with an elevation of 2,695 metres (8,842 ft).',
    explanationMl: 'ഇടുക്കി ജില്ലയിലെ ഇരവികുളം ദേശീയോദ്യാനത്തിൽ സ്ഥിതി ചെയ്യുന്ന ആനമുടിയാണ് (2,695 മീറ്റർ) ദക്ഷിണേന്ത്യയിലെ ഏറ്റവും ഉയരം കൂടിയ കൊടുമുടി.',
    relatedFacts: [
      'Anamudi is known as the "Everest of South India".',
      'Doddabetta (2,637 m) is the highest peak in the Nilgiri Hills.',
      'Eravikulam is famous for the endangered Nilgiri Tahr (Varaiadu).'
    ]
  },
  {
    id: 6,
    text: 'Choose the correct synonym of the word "PERSEVERANCE":',
    textMl: '"PERSEVERANCE" എന്ന വാക്കിന്റെ ശരിയായ പര്യായപദം തിരഞ്ഞെടുക്കുക:',
    optionA: 'Indolence',
    optionAMl: 'Indolence (മടി)',
    optionB: 'Persistence',
    optionBMl: 'Persistence (സ്ഥിരോത്സാഹം)',
    optionC: 'Hesitation',
    optionCMl: 'Hesitation (മടിപ്പ്)',
    optionD: 'Apathy',
    optionDMl: 'Apathy (ഉദാസീനത)',
    correctOption: 'B',
    explanation: 'Perseverance means continued effort to do or achieve something despite difficulties or delay. Synonym: Persistence, Tenacity, Determination.',
    explanationMl: 'Perseverance എന്നാൽ പ്രതിസന്ധികളിലും തുടർച്ചയായി പരിശ്രമിക്കുക എന്നാണ് അർത്ഥം. ശരിയായ പര്യായപദം: Persistence.',
    relatedFacts: [
      'Antonyms: Laziness, Apathy, Indolence, Irresolution.',
      'Example: Her perseverance helped her clear the Kerala PSC KAS exam.'
    ]
  },
  {
    id: 7,
    text: 'If A can complete a work in 12 days and B can complete the same work in 24 days, in how many days can they complete it together?',
    textMl: 'A ഒരു ജോലി 12 ദിവസം കൊണ്ടും B അതേ ജോലി 24 ദിവസം കൊണ്ടും ചെയ്തു തീർക്കുമെങ്കിൽ, രണ്ടുപേരും ചേർന്ന് അത് എത്ര ദിവസത്തിൽ പൂർത്തിയാക്കും?',
    optionA: '6 days',
    optionAMl: '6 ദിവസം',
    optionB: '8 days',
    optionBMl: '8 ദിവസം',
    optionC: '9 days',
    optionCMl: '9 ദിവസം',
    optionD: '10 days',
    optionDMl: '10 ദിവസം',
    correctOption: 'B',
    explanation: 'Together 1 day work = (1/12) + (1/24) = (2 + 1)/24 = 3/24 = 1/8. Total days needed = 8 days. Shortcut formula: (A × B) / (A + B) = (12 × 24) / 36 = 288 / 36 = 8 days.',
    explanationMl: 'ഒരുമിച്ച് ചെയ്യുന്ന സമയം = (A × B) / (A + B) = (12 × 24) / (12 + 24) = 288 / 36 = 8 ദിവസം.',
    relatedFacts: [
      'Shortcut formula for two people: (A × B) / (A + B).',
      'If 3 people: (A × B × C) / (AB + BC + CA).'
    ]
  },
  {
    id: 8,
    text: 'Which Article of the Indian Constitution provides for the State Public Service Commission (PSC)?',
    textMl: 'ഇന്ത്യൻ ഭരണഘടനയിലെ ഏത് ആർട്ടിക്കിൾ പ്രകാരമാണ് സംസ്ഥാന പബ്ലിക് സർവീസ് കമ്മീഷൻ (PSC) രൂപീകരിച്ചിരിക്കുന്നത്?',
    optionA: 'Article 315',
    optionAMl: 'ആർട്ടിക്കിൾ 315',
    optionB: 'Article 324',
    optionBMl: 'ആർട്ടിക്കിൾ 324',
    optionC: 'Article 280',
    optionCMl: 'ആർട്ടിക്കിൾ 280',
    optionD: 'Article 356',
    optionDMl: 'ആർട്ടിക്കിൾ 356',
    correctOption: 'A',
    explanation: 'Article 315 of the Constitution provides for Public Service Commissions for the Union (UPSC) and for each State (KPSC).',
    explanationMl: 'ഭരണഘടനയുടെ 315-ാം അനുച്ഛേദപ്രകാരമാണ് കേന്ദ്രത്തിനും ഓരോ സംസ്ഥാനങ്ങൾക്കും പബ്ലിക് സർവീസ് കമ്മീഷൻ നിലവിൽ വന്നത്.',
    relatedFacts: [
      'Article 324: Election Commission of India.',
      'Article 280: Finance Commission of India.',
      'Article 320: Functions of Public Service Commissions.'
    ]
  },
  {
    id: 9,
    text: 'Who was the leader of the famous Vaikom Satyagraha (1924-25) in Kerala?',
    textMl: 'കേരളത്തിലെ പ്രശസ്തമായ വൈക്കം സത്യാഗ്രഹത്തിന്റെ (1924-25) പ്രധാന നേതാവും സംഘാടകനും ആരായിരുന്നു?',
    optionA: 'K. Kelappan',
    optionAMl: 'കെ. കേളപ്പൻ',
    optionB: 'T. K. Madhavan',
    optionBMl: 'ടി. കെ. മാധവൻ',
    optionC: 'A. K. Gopalan',
    optionCMl: 'എ. കെ. ഗോപാലൻ',
    optionD: 'Mannathu Padmanabhan',
    optionDMl: 'മന്നത്ത് പത്മനാഭൻ',
    correctOption: 'B',
    explanation: 'T. K. Madhavan was the chief architect and initiator of the Vaikom Satyagraha, supported by K. Kelappan, EV Ramasamy Naicker (Periyar), and Mahatma Gandhi.',
    explanationMl: 'ടി. കെ. മാധവനാണ് വൈക്കം സത്യാഗ്രഹത്തിന്റെ പ്രധാന ആശയപ്രചാരകനും സംഘാടകനും.',
    relatedFacts: [
      'Vaikom Satyagraha started on March 30, 1924.',
      'Mahatma Gandhi visited Vaikom in March 1925.',
      'Periyar E. V. Ramasamy earned the title "Vaikom Veerar" for his active role.'
    ]
  },
  {
    id: 10,
    text: 'The pH value of pure water at 25°C is:',
    textMl: '25°C താപനിലയിൽ ശുദ്ധജലത്തിന്റെ pH മൂല്യം എത്രയാണ്?',
    optionA: '0',
    optionAMl: '0',
    optionB: '7',
    optionBMl: '7',
    optionC: '14',
    optionCMl: '14',
    optionD: '5.6',
    optionDMl: '5.6',
    correctOption: 'B',
    explanation: 'Pure water is neutral, having equal concentrations of H+ and OH- ions, corresponding to a pH of exactly 7.0 at 25°C.',
    explanationMl: '25°C-ൽ ശുദ്ധജലം നിർവീര്യമാണ് (Neutral), ഇതിന്റെ pH മൂല്യം കൃത്യമായി 7 ആണ്.',
    relatedFacts: [
      'pH < 7 indicates an Acidic solution.',
      'pH > 7 indicates a Basic / Alkaline solution.',
      'Human Blood pH is slightly basic (~7.35 to 7.45).'
    ]
  },
  {
    id: 11,
    text: 'Who organised the historic "Villuvandi Yatra" in 1893 to assert the right of lower-caste citizens to travel on public roads in Travancore?',
    textMl: 'തിരുവിതാംകൂറിലെ പൊതുവഴികളിലൂടെ സഞ്ചരിക്കാനുള്ള അവകാശത്തിനായി 1893-ൽ ചരിത്രപരമായ "വില്ലുവണ്ടി സമരം" നയിച്ചത് ആരാണ്?',
    optionA: 'Chattampi Swamikal',
    optionAMl: 'ചട്ടമ്പി സ്വാമികൾ',
    optionB: 'Ayyankali',
    optionBMl: 'അയ്യങ്കാളി',
    optionC: 'Poykayil Yohannan',
    optionCMl: 'പൊയ്കയിൽ യോഹന്നാൻ',
    optionD: 'Pandit Karuppan',
    optionDMl: 'പണ്ഡിറ്റ് കറുപ്പൻ',
    correctOption: 'B',
    explanation: 'Mahatma Ayyankali organised the Villuvandi Yatra in 1893 riding a decorated bullock cart (Villuvandi) through the public roads of Venganoor, challenging caste restrictions.',
    explanationMl: '1893-ൽ വെങ്ങാനൂരിൽ വില്ലുവണ്ടിയിലേറി പൊതുവഴികളിലൂടെ സഞ്ചരിച്ച് സമരം നയിച്ചത് മഹാത്മാ അയ്യങ്കാളിയാണ്.',
    relatedFacts: [
      'Ayyankali founded Sadhu Jana Paripalana Sangham (SJPS) in 1907.',
      'Indira Gandhi called Ayyankali "The Great Son of India".',
      'Panchami educational strike took place at Ooruttambalam school in 1915.'
    ]
  },
  {
    id: 12,
    text: 'Which ruler of Travancore issued the famous Temple Entry Proclamation on November 12, 1936?',
    textMl: '1936 നവംബർ 12-ന് ചരിത്രപ്രസിദ്ധമായ ക്ഷേത്രപ്രവേശന വിളംബരം പുറപ്പെടുവിച്ച തിരുവിതാംകൂർ രാജാവ് ആരാണ്?',
    optionA: 'Sree Chithira Thirunal Balarama Varma',
    optionAMl: 'ശ്രീ ചിത്തിര തിരുനാൾ ബാലരാമവർമ്മ',
    optionB: 'Swathi Thirunal',
    optionBMl: 'സ്വാതി തിരുനാൾ',
    optionC: 'Moolam Thirunal',
    optionCMl: 'മൂലം തിരുനാൾ',
    optionD: 'Visakham Thirunal',
    optionDMl: 'വിശാഖം തിരുനാൾ',
    correctOption: 'A',
    explanation: 'Sree Chithira Thirunal Balarama Varma issued the Temple Entry Proclamation on 12 November 1936, opening temples to all Hindus regardless of caste. Sir C. P. Ramaswami Iyer was the Dewan.',
    explanationMl: '1936 നവംബർ 12-നാണ് ശ്രീ ചിത്തിര തിരുനാൾ ബാലരാമവർമ്മ ക്ഷേത്രപ്രവേശന വിളംബരം പുറപ്പെടുവിച്ചത് (ദിവാൻ: സി. പി. രാമസ്വാമി അയ്യർ).',
    relatedFacts: [
      'Mahatma Gandhi described the proclamation as "a miracle of modern times".',
      'Travancore was the first princely state to grant temple entry rights.'
    ]
  },
  {
    id: 13,
    text: 'Which Constitutional Amendment Act introduced the 3-Tier Panchayati Raj System under Part IX of the Indian Constitution?',
    textMl: 'ഇന്ത്യൻ ഭരണഘടനയുടെ ഭാഗം IX-ൽ ത്രിതല പഞ്ചായത്തിരാജ് സംവിധാനം കൊണ്ടുവന്ന ഭരണഘടനാ ഭേദഗതി ആക്റ്റ് ഏതാണ്?',
    optionA: '73rd Amendment Act 1992',
    optionAMl: '73-ാം ഭേദഗതി ആക്റ്റ് 1992',
    optionB: '74th Amendment Act 1992',
    optionBMl: '74-ാം ഭേദഗതി ആക്റ്റ് 1992',
    optionC: '44th Amendment Act 1978',
    optionCMl: '44-ാം ഭേദഗതി ആക്റ്റ് 1978',
    optionD: '91st Amendment Act 2003',
    optionDMl: '91-ാം ഭേദഗതി ആക്റ്റ് 2003',
    correctOption: 'A',
    explanation: 'The 73rd Amendment Act of 1992 added Part IX and Schedule 11 to the Constitution, according constitutional status to Panchayati Raj Institutions (Gram Panchayat, Panchayat Samiti, Zilla Parishad).',
    explanationMl: '1992-ലെ 73-ാം ഭരണഘടനാ ഭേദഗതി ആക്റ്റ് ആണ് പാർട്ട് IX ലും 11-ാം ഷെഡ്യൂളിലും പഞ്ചായത്തിരാജ് സംവിധാനത്തിന് ഭരണഘടനാ പദവി നൽകിയത്.',
    relatedFacts: [
      'National Panchayati Raj Day is observed on April 24.',
      '74th Amendment Act 1992: Nagarpalika / Urban Local Bodies (Part IX-A).',
      'Balwant Rai Mehta Committee (1957) first recommended 3-Tier Panchayati Raj.'
    ]
  },
  {
    id: 14,
    text: 'Identify the Samasam type in the Malayalam phrase "നീലക്കടൽ" (നീലയായ കടൽ)?',
    textMl: '"നീലക്കടൽ" (നീലയായ കടൽ) എന്ന പദത്തിലെ സമാസം ഏതാണ്?',
    optionA: 'കർമ്മധാരയൻ സമാസം (Karmadharayan)',
    optionAMl: 'കർമ്മധാരയൻ സമാസം',
    optionB: 'തത്പുരുഷൻ സമാസം (Tatpurushan)',
    optionBMl: 'തത്പുരുഷൻ സമാസം',
    optionC: 'ബഹുവ്രീഹി സമാസം (Bahuvrihi)',
    optionCMl: 'ബഹുവ്രീഹി സമാസം',
    optionD: 'ദ്വന്ദ്വൻ സമാസം (Dwandwan)',
    optionDMl: 'ദ്വന്ദ്വൻ സമാസം',
    correctOption: 'A',
    explanation: 'In Karmadharayan Samasam, the first word acts as an adjective (വിശേഷണം) modifying the noun.',
    explanationMl: 'വിശേഷണവും വിശേഷ്യവും ചേർന്നുണ്ടാകുന്ന സമാസമാണ് കർമ്മധാരയൻ സമാസം (ഉദാ: നീലയായ കടൽ = നീലക്കടൽ).',
    relatedFacts: [
      'തത്പുരുഷൻ: വിഭക്തിപ്രത്യയം ലപിക്കുന്നത് (ഉദാ: രാജാവിന്റെ മകൻ = രാമപുത്രൻ).',
      'ബഹുവ്രീഹി: അന്യപദാർത്ഥപ്രധാനമായത് (ഉദാ: നീലകണ്ഠൻ = ശിവൻ).',
      'ദ്വന്ദ്വൻ: രണ്ടു പദങ്ങൾക്കും സമപ്രാധാന്യമുള്ളത് (ഉദാ: കൈമെയ്യുകൾ = കയ്യും മെയ്യും).'
    ]
  },
  {
    id: 15,
    text: 'A train 200 metres long running at a speed of 72 km/hr crosses a bridge in 20 seconds. What is the length of the bridge?',
    textMl: '72 km/hr വേഗതയിൽ സഞ്ചരിക്കുന്ന 200 മീറ്റർ നീളമുള്ള ഒരു ട്രെയിൻ 20 സെക്കൻഡ് കൊണ്ട് ഒരു പാലം കടന്നുപോകുന്നു. പാലത്തിന്റെ നീളം എത്ര?',
    optionA: '150 metres',
    optionAMl: '150 മീറ്റർ',
    optionB: '200 metres',
    optionBMl: '200 മീറ്റർ',
    optionC: '250 metres',
    optionCMl: '250 മീറ്റർ',
    optionD: '300 metres',
    optionDMl: '300 മീറ്റർ',
    correctOption: 'B',
    explanation: 'Speed = 72 × (5/18) = 20 m/s. Total distance covered = Speed × Time = 20 m/s × 20 s = 400 metres. Length of bridge = Total distance - Length of train = 400m - 200m = 200 metres.',
    explanationMl: 'വേഗത = 72 × (5/18) = 20 മീറ്റർ/സെക്കൻഡ്. ആകെ ദൂരം = 20 × 20 = 400 മീറ്റർ. പാലത്തിന്റെ നീളം = 400 - 200 = 200 മീറ്റർ.',
    relatedFacts: [
      'Convert km/hr to m/s: Multiply by 5/18.',
      'Convert m/s to km/hr: Multiply by 18/5.'
    ]
  },
  {
    id: 16,
    text: 'Who is popularly known as the "Kerala Gandhi"?',
    textMl: '"കേരള ഗാന്ധി" എന്നറിയപ്പെടുന്ന സ്വാതന്ത്ര്യസമര സേനാനി ആരാണ്?',
    optionA: 'K. Kelappan',
    optionAMl: 'കെ. കേളപ്പൻ',
    optionB: 'C. Sankaran Nair',
    optionBMl: 'സി. ശങ്കരൻ നായർ',
    optionC: 'P. Krishna Pillai',
    optionCMl: 'പി. കൃഷ്ണപിള്ള',
    optionD: 'K. P. Kesava Menon',
    optionDMl: 'കെ. പി. കേശവമേനോൻ',
    correctOption: 'A',
    explanation: 'K. Kelappan was a founding member of Nair Service Society and leader of Salt Satyagraha in Kozhikode and Guruvayur Satyagraha.',
    explanationMl: 'ഉപ്പുസത്യാഗ്രഹവും വൈക്കം, ഗുരുവായൂർ സത്യാഗ്രഹങ്ങളും നയിച്ച കെ. കേളപ്പനാണ് കേരള ഗാന്ധി എന്നറിയപ്പെടുന്നത്.'
  },
  {
    id: 17,
    text: 'Which Article of the Indian Constitution guarantees Equality before Law?',
    textMl: 'നിയമത്തിന് മുന്നിലെ സമത്വം ഉറപ്പുനൽകുന്ന ഭരണഘടനാ അനുച്ഛേദം ഏതാണ്?',
    optionA: 'Article 14',
    optionAMl: 'അനുച്ഛേദം 14',
    optionB: 'Article 19',
    optionBMl: 'അനുച്ഛേദം 19',
    optionC: 'Article 21',
    optionCMl: 'അനുച്ഛേദം 21',
    optionD: 'Article 32',
    optionDMl: 'അനുച്ഛേദം 32',
    correctOption: 'A',
    explanation: 'Article 14 states that the State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    explanationMl: 'അനുച്ഛേദം 14 സമത്വത്തിനുള്ള അവകാശം ഉറപ്പുനൽകുന്നു.'
  },
  {
    id: 18,
    text: 'Which is the longest lake in India and largest lake in Kerala?',
    textMl: 'ഇന്ത്യയിലെ ഏറ്റവും നീളം കൂടിയ തടാകവും കേരളത്തിലെ ഏറ്റവും വലിയ തടാകവും ഏതാണ്?',
    optionA: 'Ashtamudi Lake',
    optionAMl: 'അഷ്ടമുടി തടാകം',
    optionB: 'Vembanad Lake',
    optionBMl: 'വേമ്പനാട്ടു കായൽ',
    optionC: 'Sasthamcotta Lake',
    optionCMl: 'ശാസ്ത്രംകോട്ട കായൽ',
    optionD: 'Veli Lake',
    optionDMl: 'വേളി കായൽ',
    correctOption: 'B',
    explanation: 'Vembanad Lake spans across Alappuzha, Kottayam, and Ernakulam districts and covers an area of 2033 sq km.',
    explanationMl: 'കേരളത്തിലെ ഏറ്റവും വലിയ കായലും ഇന്ത്യയിലെ ഏറ്റവും നീളം കൂടിയ തടാകവുമാണ് വേമ്പനാട്ടു കായൽ.'
  },
  {
    id: 19,
    text: 'Find the average of the first five prime numbers (2, 3, 5, 7, 11):',
    textMl: 'ആദ്യത്തെ അഞ്ച് അഭാജ്യ സംഖ്യകളുടെ (Prime Numbers) ശരാശരി എത്ര?',
    optionA: '5.0',
    optionAMl: '5.0',
    optionB: '5.6',
    optionBMl: '5.6',
    optionC: '6.0',
    optionCMl: '6.0',
    optionD: '5.4',
    optionDMl: '5.4',
    correctOption: 'B',
    explanation: 'First 5 prime numbers are 2, 3, 5, 7, 11. Sum = 2+3+5+7+11 = 28. Average = 28 / 5 = 5.6.',
    explanationMl: 'ആദ്യ അഞ്ച് അഭാജ്യ സംഖ്യകളുടെ തുക = 28. ശരാശരി = 28 / 5 = 5.6.'
  },
  {
    id: 20,
    text: 'Which gas is commonly known as "Laughing Gas"?',
    textMl: '"ചിരിപ്പിക്കുന്ന വാതകം" (Laughing Gas) എന്നറിയപ്പെടുന്ന രാസവസ്തു ഏതാണ്?',
    optionA: 'Nitrous Oxide (N2O)',
    optionAMl: 'നൈട്രസ് ഓക്സൈഡ്',
    optionB: 'Carbon Monoxide',
    optionBMl: 'കാർബൺ മോണോക്സൈഡ്',
    optionC: 'Sulfur Dioxide',
    optionCMl: 'സൾഫർ ഡയോക്സൈഡ്',
    optionD: 'Methane',
    optionDMl: 'മീഥെയ്ൻ',
    correctOption: 'A',
    explanation: 'Nitrous Oxide (N2O) is used as an anesthetic and analgesic gas, commonly known as laughing gas.',
    explanationMl: 'നൈട്രസ് ഓക്സൈഡ് ആണ് ചിരിപ്പിക്കുന്ന വാതകം എന്നറിയപ്പെടുന്നത്.'
  }
];

/**
 * Generates an expanded question bank guaranteeing at least requestedCount questions.
 */
export function getExpandedQuestionBank(requestedCount: number = 20): Question[] {
  const pool = [...initialPscQuestionBank];

  if (pool.length >= requestedCount) {
    return pool.slice(0, requestedCount);
  }

  // Generate procedural dynamic PSC questions to reach requestedCount
  let nextId = pool.length + 1;

  const topics = [
    { cat: 'Kerala History', title: 'Malabar Rebellion', year: '1921', detail: 'Variyamkunnath Kunjahammed Haji' },
    { cat: 'Indian Polity', title: 'Article 324', detail: 'Superintendence, direction and control of elections vested in Election Commission' },
    { cat: 'Geography', title: 'Silent Valley National Park', detail: 'Located in Palakkad district, famous for Lion-tailed macaque' },
    { cat: 'Malayalam Grammar', title: 'Lopa Sandhi', detail: 'Deletes one vowel sound during word combination' },
    { cat: 'Science', title: 'Mitochondria', detail: 'Known as the Powerhouse of the Cell' },
    { cat: 'Arithmetic', title: 'Speed Conversion', detail: 'Multiply km/h by 5/18 to get speed in m/s' }
  ];

  while (pool.length < requestedCount) {
    const idx = pool.length;
    const t = topics[idx % topics.length];
    const p1 = (idx + 1) * 1500;
    const rate = 5 + (idx % 5);
    const yrs = 2 + (idx % 3);
    const si = (p1 * rate * yrs) / 100;

    if (idx % 2 === 0) {
      pool.push({
        id: nextId++,
        text: `[Q${pool.length + 1}] What is the Simple Interest on a principal of ₹${p1} at ${rate}% per annum for ${yrs} years?`,
        textMl: `[ചോദ്യം ${pool.length + 1}] ₹${p1} ന് പ്രതിവർഷം ${rate}% നിരക്കിൽ ${yrs} വർഷത്തേക്ക് ലഭിക്കുന്ന സാധാരണ പലിശ എത്ര?`,
        optionA: `₹${si}`,
        optionAMl: `₹${si}`,
        optionB: `₹${si + 100}`,
        optionBMl: `₹${si + 100}`,
        optionC: `₹${si - 50}`,
        optionCMl: `₹${si - 50}`,
        optionD: `₹${si + 250}`,
        optionDMl: `₹${si + 250}`,
        correctOption: 'A',
        explanation: `Simple Interest Formula: SI = (P × R × N) / 100 = (${p1} × ${rate} × ${yrs}) / 100 = ₹${si}.`,
        explanationMl: `സാധാരണ പലിശ = (P × R × N) / 100 = ₹${si}.`
      });
    } else {
      pool.push({
        id: nextId++,
        text: `[Q${pool.length + 1}] Which subject/topic is directly associated with "${t.title}" in the Kerala PSC ${t.cat} syllabus?`,
        textMl: `[ചോദ്യം ${pool.length + 1}] കേരള പബ്ലിക് സർവീസ് കമ്മീഷൻ പാഠ്യപദ്ധതിയിലെ "${t.title}" ഏതുമായി ബന്ധപ്പെട്ടിരിക്കുന്നു?`,
        optionA: t.detail,
        optionAMl: t.detail,
        optionB: 'Fundamental Rights Article 12 to 35',
        optionBMl: 'അടിസ്ഥാന അവകാശങ്ങൾ 12 മുതൽ 35 വരെ',
        optionC: 'First Five Year Plan (1951-1956)',
        optionCMl: 'ഒന്നാം പഞ്ചവത്സര പദ്ധതി (1951-1956)',
        optionD: 'Kerala State Formation (Nov 1, 1956)',
        optionDMl: 'കേരള സംസ്ഥാന രൂപീകരണം (നവംബർ 1, 1956)',
        correctOption: 'A',
        explanation: `${t.title} is a core high-yield topic in ${t.cat}: ${t.detail}.`,
        explanationMl: `${t.cat} വിഭാഗത്തിലെ പ്രധാന ചോദ്യമാണിത്: ${t.detail}.`
      });
    }
  }

  return pool.slice(0, requestedCount);
}
