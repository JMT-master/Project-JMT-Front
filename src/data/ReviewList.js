const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const test = new Date(year, month, day);


console.log('date' + test)

export const ReveiwList = [
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test1',
    content: '친구들과 갔었지만, 혼자 여행할 때 꼭 한번 가보고 싶어요. 조용하고 마음이 편안해지는 곳이었습니다.',
    img: '../../images/sampleImg01.jpeg',
    date: `${new Date(year, month, day-1)}`,
    gettime: `${new Date(year, month, day-1).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test2',
    content: '작년11월 예술치유 영상 작업을 위해 방문한 사려니숲^^넘 좋았습니다.치유악기 칼림바로 숲속에서 연주하니 새들이 다가왔던 기억이 납니다. 숲속에 오는 분들과 예술로 치유하는 시간을 만들어보고 싶네요',
    img: '../../images/sampleImg02.jpg',
    date: `${new Date(year, month-1, day)}`,
    gettime: `${new Date(year, month-1, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test3',
    content: '너무 좋았습니다.',
    img: '../../images/sampleImg03.jpg',
    date: `${new Date(year-1, month, day)}`,
    gettime: `${new Date(year-1, month, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test4',
    content: '친구들과 갔었지만, 혼자 여행할 때 꼭 한번 가보고 싶어요. 조용하고 마음이 편안해지는 곳이었습니다. 너무 좋았습니다.',
    img: '../../images/sampleImg02.jpg',
    date: `${new Date(year, month-2, day)}`,
    gettime: `${new Date(year, month-2, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: '123',
    id: 'test5',
    content: '친구들과 갔었지만, 혼자 여행할 때 꼭 한번 가보고 싶어요. 조용하고 마음이 편안해지는 곳이었습니다. 너무 좋았습니다.',
    img: '../../images/kakao-icon.png',
    date: `${new Date(year, month, day-5)}`,
    gettime: `${new Date(year, month, day-5).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test6',
    content: '친구들과 갔었지만, 혼자 여행할 때 꼭 한번 가보고 싶어요. 조용하고 마음이 편안해지는 곳이었습니다. 너무 좋았습니다.',
    img: '../../images/JMT.jpg',
    date: `${new Date(year, month-9, day)}`,
    gettime: `${new Date(year, month-9, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test7',
    content: '친구들과 갔었지만, 혼자 여행할 때 꼭 한번 가보고 싶어요. 조용하고 마음이 편안해지는 곳이었습니다. 너무 좋았습니다.',
    img: '../../images/JMT.jpg',
    date: `${new Date(year, month, day-3)}`,
    gettime: `${new Date(year, month, day-3).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test8',
    content: '작년11월 예술치유 영상 작업을 위해 방문한 사려니숲^^넘 좋았습니다.치유악기 칼림바로 숲속에서 연주하니 새들이 다가왔던 기억이 납니다. 숲속에 오는 분들과 예술로 치유하는 시간을 만들어보고 싶네요',
    img: '../../images/JMT.jpg',
    date: `${new Date(year, month, day)}`,
    gettime: `${new Date(year, month, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test9',
    content: '(대충 잘 다녀왔다는 후기)',
    img: '../../images/JMT.jpg',
    date: `${new Date(year, month, day)}`,
    gettime: `${new Date(year, month, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: '123',
    id: 'test10',
    content: '(대충 재밌었다는 후기)',
    img: '../../images/JMT.jpg',
    date: `${new Date(year, month, day)}`,
    gettime: `${new Date(year, month, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test11',
    content: '(아무튼 잘 갔다왔다는 후기)',
    img: '../../images/sampleImg03.jpg',
    date: `${new Date(year, month, day)}`,
    gettime: `${new Date(year, month, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test12',
    content: '작년12월 예술치유 영상 작업을 위해 방문한 사려니숲^^넘 좋았습니다.치유악기 칼림바로 숲속에서 연주하니 새들이 다가왔던 기억이 납니다. 숲속에 오는 분들과 예술로 치유하는 시간을 만들어보고 싶네요',
    img: '../../images/sampleImg01.jpeg',
    date: `${new Date(year, month, day)}`,
    gettime: `${new Date(year, month, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test13',
    content: '후기',
    img: '../../images/sampleImg02.jpg',
    date: `${new Date(year, month, day)}`,
    gettime: `${new Date(year, month, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: 'CNTS_000000000022852',
    id: 'test14',
    content: '대충 잘 갔다옴3',
    img: '../../images/sampleImg03.jpg',
    date: `${new Date(year-2, month-1, day)}`,
    gettime: `${new Date(year-2, month-1, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
  {
    contentsid: '123',
    id: 'test15',
    content: '2 잘 갔다옴',
    img: '../../images/sampleImg01.jpeg',
    date: `${new Date(year-1, month-1, day)}`,
    gettime: `${new Date(year-1, month-1, day).getTime()}`,
    profileImg: '../../images/img_non_profile.png'
  },
];