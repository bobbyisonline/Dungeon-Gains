// API Ninjas Exercise API integration
const API_KEY = import.meta.env.VITE_API_NINJAS_KEY || '';
const API_BASE_URL = 'https://api.api-ninjas.com/v1/exercises';

export interface APIExercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

export const fetchExercises = async (params: {
  muscle?: string;
  type?: string;
  difficulty?: string;
}): Promise<APIExercise[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.muscle) queryParams.append('muscle', params.muscle);
    if (params.type) queryParams.append('type', params.type);
    if (params.difficulty) queryParams.append('difficulty', params.difficulty);

    const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
};

// Map API muscle groups to our stat types
export const mapMuscleToStat = (muscle: string): 'strength' | 'power' | 'endurance' | 'stamina' => {
  const lowerMuscle = muscle.toLowerCase();
  
  if (lowerMuscle.includes('chest') || lowerMuscle.includes('triceps')) {
    return 'strength'; // Bench-related
  } else if (lowerMuscle.includes('quadriceps') || lowerMuscle.includes('glutes') || lowerMuscle.includes('hamstrings')) {
    return 'power'; // Squat-related
  } else if (lowerMuscle.includes('shoulders') || lowerMuscle.includes('traps')) {
    return 'endurance'; // OHP-related
  } else {
    return 'stamina'; // Default to cardio
  }
};

export const mapMuscleToCategory = (muscle: string): 'bench' | 'squat' | 'overhead' | 'cardio' | 'accessory' => {
  const lowerMuscle = muscle.toLowerCase();
  
  if (lowerMuscle.includes('chest') || lowerMuscle.includes('triceps')) {
    return 'bench';
  } else if (lowerMuscle.includes('quadriceps') || lowerMuscle.includes('glutes') || lowerMuscle.includes('hamstrings')) {
    return 'squat';
  } else if (lowerMuscle.includes('shoulders') || lowerMuscle.includes('traps')) {
    return 'overhead';
  } else if (lowerMuscle.includes('cardio')) {
    return 'cardio';
  } else {
    return 'accessory'; // For biceps, lats, calves, abs, etc.
  }
};
