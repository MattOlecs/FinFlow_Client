import { writable } from 'svelte/store';

const initialYear = new Date().getFullYear();
const initialMonth = new Date().getMonth();

export const selectedYear = writable(initialYear);
export const selectedMonth = writable(initialMonth);
