import type { Question } from '../components/student/ExamRunnerScreen';
import { apiService } from './api';

function decodeHtmlEntities(str: string): string {
  if (typeof document !== 'undefined') {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&deg;/g, '°');
}

export class InternetQuestionFetcher {
  /**
   * Dynamically searches and fetches real-time topic-related questions from internet APIs (Wikipedia Search API & OpenTrivia DB).
   */
  public static async fetchQuestionsFromInternet(amount: number = 20): Promise<Question[]> {
    const fetched: Question[] = [];
    const targetAmount = Math.min(Math.max(amount, 5), 100);

    // 1. Fetch Real-time live topic facts from Wikipedia API for Kerala PSC topics
    try {
      const pscTopics = [
        'Sree Narayana Guru',
        'Vaikom Satyagraha',
        'Constitution of India Article 14',
        'Periyar River Kerala',
        'Silent Valley National Park',
        'Temple Entry Proclamation',
        'Ayyankali',
        'Chattampi Swamikal'
      ];
      const selectedTopic = pscTopics[Math.floor(Math.random() * pscTopics.length)];
      const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(selectedTopic)}&format=json&origin=*`;
      const wikiRes = await fetch(wikiUrl);

      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        const hits = wikiData?.query?.search || [];

        hits.slice(0, 5).forEach((hit: any, idx: number) => {
          const cleanSnippet = hit.snippet.replace(/<[^>]*>/g, '');
          const title = hit.title;

          fetched.push({
            id: Date.now() + idx + Math.floor(Math.random() * 10000),
            text: `[Live Web Search - ${title}] What key historical detail is associated with ${title}?`,
            textMl: `[തത്സമയ ഇന്റർനെറ്റ് വിവരശേഖരണം - ${title}] ${title} എന്ന വിഷയവുമായി ബന്ധപ്പെട്ട പ്രധാന വസ്തുത ഏതാണ്?`,
            optionA: cleanSnippet.length > 90 ? cleanSnippet.substring(0, 90) + '...' : cleanSnippet,
            optionAMl: cleanSnippet.length > 90 ? cleanSnippet.substring(0, 90) + '...' : cleanSnippet,
            optionB: 'Article 14 - Equality before Law',
            optionBMl: 'അനുച്ഛേദം 14 - സമത്വത്തിനുള്ള അവകാശം',
            optionC: 'Vaikom Satyagraha (1924)',
            optionCMl: 'വൈക്കം സത്യാഗ്രഹം (1924)',
            optionD: 'Temple Entry Proclamation (1936)',
            optionDMl: 'ക്ഷേത്രപ്രവേശന വിളംബരം (1936)',
            correctOption: 'A',
            explanation: `Real-time Wikipedia Search Result: ${cleanSnippet}`,
            explanationMl: `തത്സമയ വിവരശേഖരണം: ${cleanSnippet}`,
            relatedFacts: [`Topic: ${title}`, `Source: Wikipedia Live Web Search`]
          });
        });
      }
    } catch (e) {
      console.warn('Real-time Wikipedia fetch warning:', e);
    }

    // 2. Fetch Real-time live questions from OpenTrivia DB
    try {
      const triviaUrl = `https://opentdb.com/api.php?amount=${targetAmount}&type=multiple`;
      const triviaRes = await fetch(triviaUrl);
      if (triviaRes.ok) {
        const triviaData = await triviaRes.json();
        if (triviaData.results && Array.isArray(triviaData.results)) {
          triviaData.results.forEach((item: any, idx: number) => {
            const text = decodeHtmlEntities(item.question);
            const correctAnswer = decodeHtmlEntities(item.correct_answer);
            const incorrect = item.incorrect_answers.map((ans: string) => decodeHtmlEntities(ans));

            const options = [correctAnswer, ...incorrect].sort(() => 0.5 - Math.random());
            const correctIdx = options.indexOf(correctAnswer);
            const optionKeys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

            fetched.push({
              id: Date.now() + idx + Math.floor(Math.random() * 20000),
              text: `[Live Internet Question - ${decodeHtmlEntities(item.category)}] ${text}`,
              textMl: `[ഇന്റർനെറ്റ് ചോദ്യബാങ്ക് - ${decodeHtmlEntities(item.category)}] ${text}`,
              optionA: options[0] || '',
              optionAMl: options[0] || '',
              optionB: options[1] || '',
              optionBMl: options[1] || '',
              optionC: options[2] || '',
              optionCMl: options[2] || '',
              optionD: options[3] || '',
              optionDMl: options[3] || '',
              correctOption: optionKeys[correctIdx] || 'A',
              explanation: `Correct Answer: "${correctAnswer}". Category: ${item.category}.`,
              explanationMl: `ശരിയായ ഉത്തരം: "${correctAnswer}". വിഭാഗം: ${item.category}.`,
              relatedFacts: [`Category: ${item.category}`, `Difficulty: ${item.difficulty}`, `Source: Live Internet API`]
            });
          });
        }
      }
    } catch (e) {
      console.warn('Real-time Trivia API fetch warning:', e);
    }

    // Save all fetched questions to local IndexedDB & backend API
    for (const q of fetched) {
      apiService.saveQuestion(q).catch(() => {});
    }

    return fetched.slice(0, targetAmount);
  }
}
