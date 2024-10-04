import type { EChartsOption } from 'echarts';

export const countUpData = [
  {
    title: "Today's Clicks",
    icon: 'location',
    count: 682,
    color: '#1890ff',
  },
  {
    title: 'New Users',
    icon: 'person',
    count: 259,
    color: '#fa541c',
  },
  {
    title: 'Messages Sent',
    icon: 'message',
    count: 1262,
    color: '#faad14',
  },
  {
    title: 'Likes Count',
    icon: 'like',
    count: 508,
    color: '#13c2c2',
  },
  {
    title: 'Total Favorites',
    icon: 'heart',
    count: 379,
    color: '#722ed1',
  },
];

export const pieOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: 0,
    left: 'center',
  },
  series: [
    {
      name: 'Source of Visits',
      type: 'pie',
      radius: '70%',
      center: ['50%', '45%'],
      color: ['#1890ff', '#fa541c', '#faad14', '#13c2c2', '#722ed1'],
      data: [
        { value: 1620, name: 'Direct Access' },
        { value: 1169, name: 'Email Marketing' },
        { value: 986, name: 'Affiliate Advertising' },
        { value: 624, name: 'Video Ads' },
        { value: 857, name: 'Search Engines' },
      ],
      roseType: 'radius',
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay: function () {
        return Math.random() * 400;
      },
    },
  ],
};

export const ringOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: 0,
    left: 'center',
  },
  series: [
    {
      color: ['#1890ff', '#fa541c', '#faad14', '#13c2c2', '#722ed1'],
      name: 'Source of Visits',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1620, name: 'Direct Access' },
        { value: 1169, name: 'Email Marketing' },
        { value: 986, name: 'Affiliate Advertising' },
        { value: 624, name: 'Video Ads' },
        { value: 2758, name: 'Search Engines' },
      ],
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay: function () {
        return Math.random() * 100;
      },
    },
  ],
};

export const radarOptions: EChartsOption = {
  legend: {
    bottom: 0,
    data: ['Promotion Channels', 'Ad Placement', 'Source of Visits'],
  },
  radar: {
    radius: '70%',
    center: ['50%', '45%'],
    splitNumber: 8,
    indicator: [
      {
        name: 'Direct Access',
      },
      {
        name: 'Email Marketing',
      },
      {
        name: 'Affiliate Advertising',
      },
      {
        name: 'Video Ads',
      },
      {
        name: 'Search Engines',
      },
    ],
  },
  series: [
    {
      type: 'radar',
      symbolSize: 0,
      areaStyle: {
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,.2)',
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        opacity: 1,
      },
      data: [
        {
          value: [1920, 1920, 1920, 0, 0],
          name: 'Promotion Channels',
          itemStyle: {
            color: '#1890ff',
          },
        },
        {
          value: [1920, 0, 0, 1920, 1920],
          name: 'Source of Visits',
          itemStyle: {
            color: '#722ed1',
          },
        },
        {
          value: [920, 920, 920, 920, 920],
          name: 'Ad Placement',
          itemStyle: {
            color: '#faad14',
          },
        },
      ],
    },
  ],
};

export const barOptions: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1,
        color: '#fa541c',
      },
    },
  },
  grid: {
    left: 0,
    right: '1%',
    top: '2%',
    bottom: 0,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: 'value',
    max: value => {
      return Math.ceil(value.max / 100) * 100 + 300;
    },
  },
  label: {
    show: true,
    fontSize: 14,
    color: '#1890ff',
    position: 'top',
    formatter: '{c}',
  },
  series: [
    {
      type: 'bar',
      name: 'Visits',
      barWidth: '40%',
      color: ['#1890ff'],
      data: [782, 925, 1196, 812, 328, 223, 1080],
    },
  ],
};

export const lineOptions: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1,
        color: '#fa541c',
      },
    },
  },
  grid: {
    left: 0,
    right: '1%',
    top: '2%',
    bottom: 0,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: 'value',
    max: value => {
      return Math.ceil(value.max / 100) * 100 + 300;
    },
  },
  label: {
    show: true,
    fontSize: 14,
    color: '#722ed1',
    position: 'top',
    formatter: '{c}',
  },
  series: [
    {
      type: 'line',
      name: 'Visits',
      color: ['#722ed1'],
      smooth: true,
      data: [782, 925, 1196, 812, 328, 223, 1080],
    },
  ],
};
