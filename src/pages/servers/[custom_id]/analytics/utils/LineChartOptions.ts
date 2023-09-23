import { ApexOptions } from 'apexcharts'

export const chartOptions: ApexOptions = {
  chart: {
    fontFamily: 'DM Sans, sans-serif',
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: false,
  },
  markers: {
    size: 3,
    colors: '#84F9FE',
    strokeColors: '#84F9FE',
    strokeWidth: 6,
    strokeOpacity: 0.2,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    hover: {
      sizeOffset: 1,
    },
  },
  stroke: {
    show: true,
    curve: 'straight',
    lineCap: 'butt',
    colors: ['#84F9FE'],
    width: 1,
  },
  grid: {
    show: true,
    borderColor: '#343434',
    strokeDashArray: 2,
    yaxis: {
      lines: {
        show: true,
        offsetY: 0,
      },
    },
    padding: {
      top: 8,
      right: 8,
      bottom: 8,
      left: 8,
    },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      show: true,
      style: {
        fontFamily: 'DM Sans, sans-sherif',
        fontSize: '0.875rem',
        colors: '#A3A3A3',
        fontWeight: 400,
      },
    },
    axisBorder: {
      show: true,
      color: '#A3A3A3',
      strokeWidth: 1,
    },
    axisTicks: {
      show: true,
      color: '#A3A3A3',
      height: 3,
    },
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        fontFamily: 'DM Sans, sans-sherif',
        fontSize: '0.75rem',
        colors: '#F4F4F6',
        fontWeight: 400,
      },
      offsetY: 2,
    },
  },
}
