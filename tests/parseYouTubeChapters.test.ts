import parseYouTubeChapters from '../src/utils/parseYouTubeChapters'

// 모양에 대한 테스트 [], (), 
// 시까지 표시, 분까지 표시
// 앞 뒤 공백
// 사이 공백 개수 1, 2, 3

// 모든 경우의 수 테스트 필요?

describe('parseYouTubeChapters', () => {
  test('분 표기', () => {
    const text = `
00:00 Intro
00:10 Chapter 1
00:20 Chapter 2
00:30 Chapter 3
00:40 Chapter 4
`

    expect(parseYouTubeChapters(text)).toEqual([
      { start: 0, end: 10, title: 'Intro' },
      { start: 10, end: 20, title: 'Chapter 1' },
      { start: 20, end: 30, title: 'Chapter 2' },
      { start: 30, end: 40, title: 'Chapter 3' },
      { start: 40, end: Infinity, title: 'Chapter 4' },
    ])
  })

  test('시 표기', () => {
    const text = `
00:00:00 Intro
00:00:10 Chapter 1
00:00:20 Chapter 2
00:00:30 Chapter 3
00:00:40 Chapter 4
`

    expect(parseYouTubeChapters(text)).toEqual([
      { start: 0, end: 10, title: 'Intro' },
      { start: 10, end: 20, title: 'Chapter 1' },
      { start: 20, end: 30, title: 'Chapter 2' },
      { start: 30, end: 40, title: 'Chapter 3' },
      { start: 40, end: Infinity, title: 'Chapter 4' },
    ])
  })

  test('[]로 감싸진 분 표기', () => {
    const text = `
[00:00] Intro
[00:10] Chapter 1
[00:20] Chapter 2
[00:30] Chapter 3
[00:40] Chapter 4
`

    expect(parseYouTubeChapters(text)).toEqual([
      { start: 0, end: 10, title: 'Intro' },
      { start: 10, end: 20, title: 'Chapter 1' },
      { start: 20, end: 30, title: 'Chapter 2' },
      { start: 30, end: 40, title: 'Chapter 3' },
      { start: 40, end: Infinity, title: 'Chapter 4' },
    ])
  })

  test('()로 감싸진 분 표기', () => {
    const text = `
(00:00) Intro
(00:10) Chapter 1
(00:20) Chapter 2
(00:30) Chapter 3
(00:40) Chapter 4
`

    expect(parseYouTubeChapters(text)).toEqual([
      { start: 0, end: 10, title: 'Intro' },
      { start: 10, end: 20, title: 'Chapter 1' },
      { start: 20, end: 30, title: 'Chapter 2' },
      { start: 30, end: 40, title: 'Chapter 3' },
      { start: 40, end: Infinity, title: 'Chapter 4' },
    ])
  })
})
