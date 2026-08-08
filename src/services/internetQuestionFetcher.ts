import type { Question } from '../components/student/ExamRunnerScreen';
import { apiService } from './api';
import { initialPscQuestionBank } from './pscQuestionBank';

export class InternetQuestionFetcher {
  /**
   * Dynamically fetches live questions from real-time Internet APIs (Wikipedia Search & OpenTrivia DB).
   */
  public static async fetchQuestionsFromInternet(amount: number = 20): Promise<Question[]> {
    const liveResults: Question[] = [];

    // 1. Real-time live Wikipedia Search API query for Kerala PSC topics
    try {
      const wikiQuery = 'Kerala Renaissance Sree Narayana Guru Constitution Geography';
      const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(wikiQuery)}&format=json&origin=*`;
      const wikiRes = await fetch(wikiUrl);

      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        const searchHits = wikiData?.query?.search || [];

        searchHits.slice(0, Math.min(amount, 10)).forEach((hit: any, idx: number) => {
          const cleanSnippet = hit.snippet.replace(/<[^>]*>/g, '');
          const title = hit.title;

          liveResults.push({
            id: Date.now() + idx + Math.floor(Math.random() * 10000),
            text: `[Realtime Web Topic - ${title}] What key historical detail is associated with ${title}?`,
            textMl: `[തത്സമയ ഇന്റർനെറ്റ് വിവരശേഖരണം - ${title}] ${title} എന്ന വിഷയവുമായി ബന്ധപ്പെട്ട പ്രധാന വസ്തുത ഏതാണ്?`,
            optionA: cleanSnippet.length > 80 ? cleanSnippet.substring(0, 80) + '...' : cleanSnippet,
            optionAMl: cleanSnippet.length > 80 ? cleanSnippet.substring(0, 80) + '...' : cleanSnippet,
            optionB: 'Article 14 - Equality before Law',
            optionBMl: 'അനുച്ഛേദം 14 - സമത്വത്തിനുള്ള അവകാശം',
            optionC: 'Vaikom Satyagraha (1924)',
            optionCMl: 'വൈക്കം സത്യാഗ്രഹം (1924)',
            optionD: 'Temple Entry Proclamation (1936)',
            optionDMl: 'ക്ഷേത്രപ്രവേശന വിളംബരം (1936)',
            correctOption: 'A',
            explanation: `Real-time Wikipedia Fact: ${cleanSnippet}`,
            explanationMl: `തത്സമയ വിവരശേഖരണം: ${cleanSnippet}`,
            relatedFacts: [`Source: Wikipedia Live Web Search`, `Title: ${title}`]
          });
        });
      }
    } catch (e) {
      console.warn('Real-time Wikipedia fetch error:', e);
    }

    // 2. Real-time live OpenTrivia DB query
    try {
      const triviaUrl = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
      const triviaRes = await fetch(triviaUrl);
      if (triviaRes.ok) {
        const triviaData = await triviaRes.json();
        if (triviaData.results && Array.isArray(triviaData.results)) {
          triviaData.results.forEach((item: any, idx: number) => {
            const decode = (s: string) =>
              s
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');

            const text = decode(item.question);
            const correctAnswer = decode(item.correct_answer);
            const incorrect = item.incorrect_answers.map((ans: string) => decode(ans));
            const options = [correctAnswer, ...incorrect].sort(() => 0.5 - Math.random());
            const correctIdx = options.indexOf(correctAnswer);
            const optionKeys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

            liveResults.push({
              id: Date.now() + idx + Math.floor(Math.random() * 20000),
              text: `[Kerala PSC General Knowledge - ${decode(item.category)}] ${text}`,
              textMl: `[തത്സമയ ചോദ്യശേഖരം - ${decode(item.category)}] ${text}`,
              optionA: options[0] || '',
              optionAMl: options[0] || '',
              optionB: options[1] || '',
              optionBMl: options[1] || '',
              optionC: options[2] || '',
              optionCMl: options[2] || '',
              optionD: options[3] || '',
              optionDMl: options[3] || '',
              correctOption: optionKeys[correctIdx] || 'A',
              explanation: `Correct Answer: ${correctAnswer}. Category: ${item.category}`,
              explanationMl: `ശരിയായ ഉത്തരം: ${correctAnswer}. വിഭാഗം: ${item.category}`,
              relatedFacts: [`Source: Internet Live Quiz API`, `Difficulty: ${item.difficulty}`]
            });
          });
        }
      }
    } catch (e) {
      console.warn('Real-time Trivia API fetch error:', e);
    }

    // 3. Fallback to Kerala PSC Question Pool if offline or low count
    if (liveResults.length < amount) {
      const pool = [...initialPscQuestionBank].sort(() => 0.5 - Math.random());
      while (liveResults.length < amount && pool.length > 0) {
        const q = pool.pop();
        if (q) liveResults.push({ ...q, id: Date.now() + liveResults.length });
      }
    }

    // Save fetched questions asynchronously to local IndexedDB and cloud
    for (const q of liveResults) {
      apiService.saveQuestion(q).catch(() => {});
    }

    return liveResults.slice(0, amount);
  }
}
