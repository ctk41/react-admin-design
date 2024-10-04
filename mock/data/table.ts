import { Random } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_utils';

const getPhone = () => {
  const prefixList = [135, 136, 137, 138, 139, 155, 158, 183, 185, 189];
  const randomNum = Math.floor(Math.random() * 10);
  const phoneStr = prefixList[randomNum] + Math.random().toString().slice(-8);
  return Number(phoneStr);
};

const getEducation = () => {
  const educationList = [
    'Elementary',
    'Middle School',
    'High School',
    'Associate Degree',
    "Bachelor's Degree",
    'Graduate',
  ];
  const randomNum = Math.floor(Math.random() * educationList.length);
  return educationList[randomNum];
};

const getMarried = () => {
  return Math.floor(Math.random() * 4); // 0-3 for married status (e.g., single, married, divorced, widowed)
};

const getHobby = () => {
  const list: any[] = [];
  const hobbyList = [
    'Badminton',
    'Table Tennis',
    'Basketball',
    'Volleyball',
    'Tennis',
    'Swimming',
    'Skiing',
    'High Jump',
    'Gliding',
    'Diving',
  ];
  const len = [3, 4][Number(Random.boolean())]; // Randomly choose between 3 or 4 hobbies
  for (let key = 0; key < len; key++) {
    const randomNum = Math.floor(Math.random() * hobbyList.length);
    list.push(hobbyList[randomNum]);
  }
  return list;
};

const genList = () => {
  const list: any[] = [];
  for (let index = 0; index < 100; index++) {
    const num = index < 10 ? '0' + index : index.toString();
    list.push({
      id: Number(`10${num}`) + 1,
      name: Random.cname(), // Generates a random Chinese name
      sex: ['Male', 'Female'][Number(Random.boolean())],
      phone: getPhone(),
      education: getEducation(),
      married: getMarried(),
      forbid: Random.boolean(),
      hobby: getHobby(),
    });
  }
  return list;
};

export default [
  {
    url: '/api/table/getTableList',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { current = 1, pageSize = 10 } = query;
      return resultPageSuccess(current, pageSize, genList());
    },
  },
] as MockMethod[];
