import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { useGame } from '../../context/GameContext';
import './ProgressChart.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ProgressChart = () => {
  const { gameState } = useGame();

  if (!gameState) return null;

  const { player } = gameState;

  // Process workout logs to extract lift data over time
  const liftData: {
    [key: string]: { date: Date; weight: number }[];
  } = {
    'Bench Press': [],
    'Squat': [],
    'Overhead Press': [],
    'Deadlift': [],
  };

  // Extract data from workout logs
  player.workoutLogs.forEach((log) => {
    log.exercises.forEach((exercise) => {
      const exerciseName = exercise.name;
      // Only track the main 4 lifts with weight data
      if (liftData[exerciseName] !== undefined && exercise.weight) {
        liftData[exerciseName].push({
          date: new Date(log.date),
          weight: exercise.weight,
        });
      }
    });
  });

  // Sort each lift's data by date
  Object.keys(liftData).forEach((lift) => {
    liftData[lift].sort((a, b) => a.date.getTime() - b.date.getTime());
  });

  // Check if there's any data
  const hasData = Object.values(liftData).some((data) => data.length > 0);

  if (!hasData) {
    return (
      <div className="card progress-chart-card">
        <h2>📈 Progress Chart</h2>
        <div className="empty-state">
          <p>No workout data yet!</p>
          <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
            Log workouts to track your strength progress over time.
          </p>
        </div>
      </div>
    );
  }

  // Prepare data for Chart.js
  const allDates = Array.from(
    new Set(
      Object.values(liftData)
        .flat()
        .map((d) => d.date.toLocaleDateString())
    )
  ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const datasets = Object.entries(liftData)
    .filter(([_, data]) => data.length > 0)
    .map(([liftName, data], index) => {
      const colors = [
        { border: '#ff6b6b', bg: 'rgba(255, 107, 107, 0.1)' }, // Bench - Red
        { border: '#4ecdc4', bg: 'rgba(78, 205, 196, 0.1)' }, // Squat - Teal
        { border: '#ffd93d', bg: 'rgba(255, 217, 61, 0.1)' }, // OHP - Yellow
        { border: '#a29bfe', bg: 'rgba(162, 155, 254, 0.1)' }, // Deadlift - Purple
      ];
      const color = colors[index % colors.length];

      return {
        label: liftName,
        data: allDates.map((date) => {
          const entry = data.find((d) => d.date.toLocaleDateString() === date);
          return entry ? entry.weight : null;
        }),
        borderColor: color.border,
        backgroundColor: color.bg,
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        spanGaps: true,
      };
    });

  const chartData = {
    labels: allDates,
    datasets,
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
          font: {
            size: 12,
            family: "'Press Start 2P', monospace",
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ffd700',
        borderWidth: 2,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} lbs`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#aaa',
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#aaa',
          font: {
            size: 10,
          },
          callback: (value) => `${value} lbs`,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="card progress-chart-card">
      <h2>📈 Progress Chart</h2>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
