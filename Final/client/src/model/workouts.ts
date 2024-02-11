// بسم الله

import { api } from "./session";
export interface Workout {
  _id?: string;
  id?: number;
  workoutName: string;
  date: string;
  duration: number;
  calories: number;
}

export async function getWorkouts(): Promise<Workout[]> {
  return api("/WorkoutsController/getAllWorkouts");
}
export async function addWorkout(workout: Workout): Promise<Workout> {
  return api("/WorkoutsController/addWorkout", workout);
}
export async function deleteWorkout(_id: string): Promise<Workout> {
  return api(`/WorkoutsController/deleteWorkout/${_id}`, null, "DELETE");
}
export async function getWorkoutsById(id: number): Promise<Workout[]> {
  return api(`/WorkoutsController/getWorkoutsById/${id}`);
}
