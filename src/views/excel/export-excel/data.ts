export interface DataItem {
  key: number;
  name: string;
  sex: string;
  phone: number;
  birth: string;
  education: string;
  hobby: string;
  forbid: boolean;
  editable: boolean;
}

export const tableData: DataItem[] = [
  {
    key: 1001,
    name: 'Zhang San',
    sex: 'Male',
    phone: 15266001235,
    birth: '2002-05-06',
    education: 'High School',
    hobby: 'Badminton, Basketball, Listening to Music, Reading',
    forbid: false,
    editable: true,
  },
  {
    key: 1002,
    name: 'Li Si',
    sex: 'Male',
    phone: 15266006621,
    birth: '1998-09-21',
    education: 'Middle School',
    hobby: 'Table Tennis, Volleyball, Swimming',
    forbid: true,
    editable: false,
  },
  {
    key: 1003,
    name: 'Wang Wu',
    sex: 'Male',
    phone: 15264848125,
    birth: '1993-06-06',
    education: "Bachelor's Degree",
    hobby: 'Roller Skating, Skiing, High Jump, Gaming',
    forbid: false,
    editable: false,
  },
  {
    key: 1004,
    name: 'Xin Ba',
    sex: 'Male',
    phone: 15248491001,
    birth: '1995-08-03',
    education: 'Associate Degree',
    hobby: 'Tennis, Basketball, Skydiving',
    forbid: true,
    editable: false,
  },
  {
    key: 1005,
    name: 'Liu Er',
    sex: 'Female',
    phone: 15248411021,
    birth: '1999-11-05',
    education: "Bachelor's Degree",
    hobby: 'Gliding, Swimming, Basketball, Watching Movies',
    forbid: true,
    editable: false,
  },
  {
    key: 1006,
    name: 'Zhao Qi',
    sex: 'Male',
    phone: 15298621500,
    birth: '2000-07-18',
    education: 'Associate Degree',
    hobby: 'Swimming, Basketball, Diving',
    forbid: false,
    editable: false,
  },
  {
    key: 1007,
    name: 'Yang Yi',
    sex: 'Female',
    phone: 15267499461,
    birth: '1998-12-25',
    education: 'High School',
    hobby: 'Surfing, Surfing the Internet, Reading, Gaming',
    forbid: false,
    editable: false,
  },
];
