import { ApexOptions } from 'apexcharts'

export const chartOptions: ApexOptions = {
  chart: {
    fontFamily: 'DM Sans, sans-serif',
    toolbar: {
      show: false,
    },
  },
  fill: {
    colors: ['#3B7FF1'],
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: 16,
      dataLabels: {
        position: 'top',
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: true,
    borderColor: '#343434',
    strokeDashArray: 2,
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
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
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#8F92A1'],
      fontFamily: 'DM Sans, sans-serif',
      fontWeight: 400,
      fontSize: '12px',
    },
    offsetX: 20,
  },
  xaxis: {
    type: 'numeric',
    labels: {
      show: true,
      style: {
        fontFamily: 'DM Sans, sans-sherif',
        fontSize: '0.875rem',
        colors: '#8F92A1',
        fontWeight: 400,
      },
    },
    axisBorder: {
      show: true,
      color: '#8F92A1',
      strokeWidth: 1,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        fontFamily: 'DM Sans, sans-sherif',
        fontSize: '0.75rem',
        colors: '#8F92A1',
        fontWeight: 400,
      },
      offsetY: 2,
    },
  },
}
