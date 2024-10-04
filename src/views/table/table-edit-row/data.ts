export interface DataItem {
  key: string;
  name: string;
  sex: string;
  birth: string;
  education: string;
  hobby: string;
  forbid: boolean;
}

export const tableData: DataItem[] = [
  {
    key: '1001',
    name: 'Zhang San',
    sex: 'Male',
    birth: '2002-05-06',
    education: 'High School',
    hobby: 'Badminton, Basketball, Listening to Music, Reading',
    forbid: false,
  },
  {
    key: '1002',
    name: 'Li Si',
    sex: 'Male',
    birth: '1998-09-21',
    education: 'Middle School',
    hobby: 'Table Tennis, Volleyball, Swimming',
    forbid: true,
  },
  {
    key: '1003',
    name: 'Wang Wu',
    sex: 'Male',
    birth: '1993-06-06',
    education: 'Bachelor’s Degree',
    hobby: 'Roller Skating, Skiing, High Jump, Gaming',
    forbid: false,
  },
  {
    key: '1004',
    name: 'Xin Ba',
    sex: 'Male',
    birth: '1995-08-03',
    education: 'Associate Degree',
    hobby: 'Tennis, Basketball, Skydiving',
    forbid: true,
  },
  {
    key: '1005',
    name: 'Liu Er',
    sex: 'Female',
    birth: '1999-11-05',
    education: 'Bachelor’s Degree',
    hobby: 'Gliding, Swimming, Basketball, Watching Movies',
    forbid: true,
  },
  {
    key: '1006',
    name: 'Zhao Qi',
    sex: 'Male',
    birth: '2000-07-18',
    education: 'Associate Degree',
    hobby: 'Swimming, Basketball, Diving',
    forbid: false,
  },
  {
    key: '1007',
    name: 'Yang Yi',
    sex: 'Female',
    birth: '1998-12-25',
    education: 'High School',
    hobby: 'Surfing, Surfing the Internet, Reading, Gaming',
    forbid: false,
  },
];
