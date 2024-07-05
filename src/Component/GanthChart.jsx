import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DropdownComp from './DropdownComp'

// import {chevronLeft  , chevronRight} from 'lucide-react';
// import { Padding } from '@mui/icons-material';

const AttendanceChart = () => {
  const chartContainer = useRef(null);


  class Colors {
    static RED = 'rgba(255, 0, 0, 0.2)';
    static GREEN = 'rgba(0, 255, 0, 0.2)';
    static BLUE = 'rgba(0, 0, 255, 0.2)';
    static ORANGE = 'rgba(255, 165, 0, 0.2)';
    static YELLOW = 'rgba(255, 255, 0, 0.2)';
    static CYAN = 'rgba(0, 255, 255, 0.2)';
    static PINK = 'rgba(255, 192, 203, 0.2)';
    static PURPLE = 'rgba(128, 0, 128, 0.2)';
  }






  useEffect(() => {
    const jsonData = {
      "reports": {
        "Monday": [
          {"days": "monday", "subject": "Science", "startHour": 1, "present": 20, "absent": 6, "total": 26,"color":Colors.RED},
          {"days": "monday", "subject": "Drawing", "startHour": 1, "present": 0, "absent": 26, "total": 26,"color":Colors.ORANGE},
          {"days": "monday", "subject": "English", "startHour": 2, "present": 20, "absent": 6, "total": 26,"color":Colors.GREEN},
          {"days": "monday", "subject": "NO___CLASSES", "startHour": 2, "present": 0, "absent": 0, "total": 0,"color":'transparent'},
          {"days": "monday", "subject": "Chemistry", "startHour": 1, "present": 20, "absent": 6, "total": 26 ,"color":Colors.CYAN}
        ],
        "Tuesday": [
          {"days": "tuesday", "subject": "Math", "startHour": 1, "present": 19, "absent": 7, "total": 26,"color":Colors.YELLOW},
          {"days": "tuesday", "subject": "Science", "startHour": 1, "present": 19, "absent": 7, "total": 26,"color":Colors.PURPLE},
          {"days": "tuesday", "subject": "English", "startHour": 2, "present": 19, "absent": 7, "total": 26,"color":Colors.RED},
          {"days": "tuesday", "subject": "Hindi", "startHour": 1, "present": 19, "absent": 7, "total": 26,"color":Colors.ORANGE},
          {"days": "tuesday", "subject": "Physics", "startHour": 2, "present": 19, "absent": 7, "total": 26,"color":Colors.CYAN}
        ],
        "Wednesday": [
          {"days": "wednesday", "subject": "Science", "startHour": 1, "present": 26, "absent": 0, "total": 26,"color":Colors.CYAN},
          {"days": "wednesday", "subject": "Math", "startHour": 2, "present": 26, "absent": 0, "total": 26,"color":Colors.RED},
          {"days": "wednesday", "subject": "English", "startHour": 1,  "present": 26, "absent": 0, "total": 26,"color":Colors.YELLOW}
        ],
        "Thursday": [
          {"days": "thursday", "subject": "Science", "startHour": 1, "present": 23, "absent": 3, "total": 26,"color":Colors.YELLOW},
          {"days": "thursday", "subject": "Math", "startHour": 1, "present": 23, "absent": 3, "total": 26,"color":Colors.BLUE},
          {"days": "thursday", "subject": "English", "startHour": 2, "present": 23, "absent": 3, "total": 26,"color":Colors.PURPLE}
        ],
        "Friday": [
          {"days": "friday", "subject": "Science", "startHour": 1, "present": 24, "absent": 2, "total": 26,"color":Colors.PINK},
          {"days": "friday", "subject": "Math", "startHour": 1, "present": 24, "absent": 2, "total": 26,"color":Colors.GREEN},
          {"days": "friday", "subject": "English", "startHour": 1, "present": 24, "absent": 2, "total": 26,"color":Colors.PURPLE}
        ],
        "Saturday": [
          {"days": "saturday", "subject": "Science", "startHour": 2, "present": 24, "absent": 2, "total": 26,"color":Colors.RED},
          {"days": "saturday", "subject": "Math", "startHour": 1, "present": 24, "absent": 2, "total": 26,"color":Colors.BLUE},
          {"days": "saturday", "subject": "English", "startHour": 1,"present": 24, "absent": 2, "total": 26,"color":Colors.ORANGE}
        ],
        "Sunday": [
          {"days": "saturday", "subject": "HOLIDAY", "startHour": 7, "present": 0, "absent": 0, "total": 0,"color":Colors.GREEN},
          // {"days": "saturday", "subject": "Math", "startHour": 1, "present": 24, "absent": 2, "total": 26,"color":Colors.BLUE},
          // {"days": "saturday", "subject": "English", "startHour": 1,"present": 24, "absent": 2, "total": 26,"color":Colors.ORANGE}
        ]
      }
    };

    const fetchData = () => {
      const datasets = [];
      Object.keys(jsonData.reports).forEach(day => {
        jsonData.reports[day].forEach(report => {
          datasets.push({
            label: report.subject,
            data: [{ x: day, y: report.startHour, total: report.total, present: report.present, absent: report.absent }],
            backgroundColor: report.color,
            borderColor: 'rgba(255,255,255,0.5)',
            borderWidth: 5,
            // borderRadius: 10, // Add border radius
            barPercentage: 0.9, // Adjust bar width percentage to create margin
            categoryPercentage: 0.9,
            borderSkipped: false, // Ensure the border is not skipped
            datalabels: {
              anchor: 'end',
              align: 'start',
              font: {
                size: 12,
              },
              formatter: (value) => `T: ${value.total}, P: ${value.present}, A: ${value.absent} , \n ${report.subject}`
            }
          });
        });
      });

      const days = Object.keys(jsonData.reports);
      chart.data.labels = days;
      chart.data.datasets = datasets;
      chart.update();
    };

    // Config
    const config = {
      type: 'bar',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
          datalabels: {
            color: 'Black',
            anchor: 'end',
            align: 'start',
            font: {
              size: 12,
            },
            formatter: (value) => `T: ${value.total}, P: ${value.present}, A: ${value.absent}`
          }
        },
        scales: {
          x: {
            stacked: true,
            beginAtZero: true,
            position: 'top' // Set x-axis position to 'top'
          },
          y: {
            stacked: true,
            reverse: true,
            min: 0,
            max: 7,
            ticks: {
              stepSize: 1,
              callback: function(value) {
                return `Hour ${value}`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    };

    // Initialize chart
    const chart = new Chart(chartContainer.current, config);

    // Fetch data initially
    fetchData();

    // Cleanup function
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <h1 className='flex justify-center font-bold'>STUDENT ATTENDANCE</h1>
      <div className='flex justify-between items-center pb-6 '>
    <div className='flex flex-row gap-2'>
      <button className='p-2 bg-white rounded-md border text-sm'>Today</button>
      <button className='py-2 px-4 bg-white rounded-md border text-lg'>+</button>
      <button className='py-2 px-4 bg-white rounded-md border text-lg'>-</button>
      <DropdownComp/>
      </div>
      <button className='p-2 bg-white rounded-md border text-sm'>Download report  v</button>
      </div>
      <div className="chartCard">
        <div className="chartBox">
          <canvas ref={chartContainer} id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
