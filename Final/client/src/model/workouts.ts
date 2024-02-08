//InShaAllah

import {api} from "./session";
export interface Workout {
    _id?: string;
    id?: number;
    email: string;
    workoutName: string;
    date: string;
    duration: number;
    calories: number;
  }

  export async function getWorkouts(): Promise<Workout[]> {
    return api("/WorkoutsController/getAllWorkouts"); 
  }
  export async function addWorkout(workout: Workout): Promise<Workout> {
    return api("/WorkoutsController/addWorkout",  workout );
  }
  export async function deleteWorkout(workout: Workout): Promise<Workout> {
    return api("/WorkoutsController/deleteWorkout", { workout });
  }
  export async function getWorkoutById(id: string): Promise<Workout> {
    return api(`/WorkoutsController/getWorkoutById/${id}`);
  }
  export async function getWorkoutByEmail(email: string): Promise<Workout[]> {
    return api(`/WorkoutsController/getWorkoutByEmail/${email}`);
  }
  
