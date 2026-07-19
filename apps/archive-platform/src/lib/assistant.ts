import { publicRecords } from "./records";
import { highlightedPassage, searchRecords } from "./search";

export function answerGroundedQuestion(question: string) {
  const publicOnly = publicRecords();
  const matches = searchRecords({ q: question })
    .filter((result) => publicOnly.some((record) => record.id === result.record.id))
    .slice(0, 3);

  if (matches.length === 0) {
    return {
      aiGenerated: true,
      answer:
        "I could not answer from approved public WMRN Archive records. Try a narrower name, accession number, program, or date.",
      sources: []
    };
  }

  const sources = matches.map(({ record }) => ({
    accessionNumber: record.accessionNumber,
    title: record.title,
    url: record.stableIdentifier,
    passage: highlightedPassage(record, question)
  }));

  return {
    aiGenerated: true,
    answer:
      "Based only on approved public archive records, the strongest match is " +
      `${sources[0].title}. Review the cited source records before using this as final research language.`,
    sources
  };
}
