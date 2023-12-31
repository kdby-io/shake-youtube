import { Chapter } from "../services/youtube";

function makeChapterParser(
  startRx: RegExp,
  lineRx: RegExp,
  timestampIndex: number,
  textIndex: number
) {
  // The first match element is the input, which will never be either the full timestamp or full title
  timestampIndex += 1;
  textIndex += 1;

  return function (description: string) {
    const chapters: Chapter[] = [];

    const firstTimestamp = description.search(startRx);
    if (firstTimestamp === -1) {
      return chapters;
    }

    const chapterLines = description.slice(firstTimestamp).split("\n");

    // console.log(chapterLines);

    for (let i = 0; i < chapterLines.length; i += 1) {
      const line = chapterLines[i];
      // console.log(line);

      const match = lineRx.exec(line);

      if (match) {
        const hours =
          match[timestampIndex] !== undefined
            ? parseInt(match[timestampIndex], 10)
            : 0;
        const minutes = parseInt(match[timestampIndex + 1], 10);
        const seconds = parseInt(match[timestampIndex + 2], 10);
        const title = match[textIndex].trim();

        chapters.push({
          start: hours * 60 * 60 + minutes * 60 + seconds,
          title: title.trim(),
          end: Infinity,
        });
      } else if (!match) {
      }
    }

    // console.log(chapters);
    return chapters;
  };
}

function addM(regex: RegExp) {
  if (regex.flags.indexOf("m") === -1) {
    return new RegExp(regex.source, regex.flags + "m");
  }
  return regex;
}

// $timestamp $title OR $timestamp$title
const lawfulParser = makeChapterParser(
  /^(\d+):(\d+)/m,
  /^(?:(\d+):)?(\d+):(\d+)+(.*?)$/,
  0,
  3
);

// [$timestamp] $title OR [$timestamp]$title
const bracketsParser = makeChapterParser(
  /^\[(\d+):(\d+)\]/m,
  /^\[(?:(\d+):)?(\d+):(\d+)\]+(.*?)$/,
  0,
  3
);

// ($timestamp) $title OR ($timestamp)$title
const parensParser = makeChapterParser(
  /^\((\d+):(\d+)\)/m,
  /^\((?:(\d+):)?(\d+):(\d+)\)+(.*?)$/,
  0,
  3
);

// ($track_id. )$title $timestamp
const postfixRx = /^(?:\d+\.\s+)?(.*)\s+(?:(\d+):)?(\d+):(\d+)$/;
const postfixParser = makeChapterParser(addM(postfixRx), postfixRx, 1, 0);

// ($track_id. )$title ($timestamp)
const postfixParenRx = /^(?:\d+\.\s+)?(.*)\s+\(\s*(?:(\d+):)?(\d+):(\d+)\s*\)$/;
const postfixParenParser = makeChapterParser(
  addM(postfixParenRx),
  postfixParenRx,
  1,
  0
);

// $track_id. $timestamp $title OR $track_id. $timestamp$title
const prefixRx = /^\d+\.\s+(?:(\d+):)?(\d+):(\d+)+(.*)$/;
const prefixParser = makeChapterParser(addM(prefixRx), prefixRx, 0, 3);

export default function parseYouTubeChapters(description: string) {
  let chapters = lawfulParser(description);
  if (chapters.length === 0) chapters = bracketsParser(description);
  if (chapters.length === 0) chapters = parensParser(description);
  if (chapters.length === 0) chapters = postfixParser(description);
  if (chapters.length === 0) chapters = postfixParenParser(description);
  if (chapters.length === 0) chapters = prefixParser(description);

  for (let i = 0; i < chapters.length - 1; i++) {
    const currentChapter = chapters[i];
    const nextChapter = chapters[i + 1];
    currentChapter.end = nextChapter.start;
  }

  // The last chapter doesn't have an end time (it goes to the end of the video)
  const lastChapter = chapters[chapters.length - 1];
  if (lastChapter) {
    lastChapter.end = Infinity;
  }
  // console.log(chapters);

  return chapters;
}
