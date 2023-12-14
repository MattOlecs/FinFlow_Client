import type { ChartDefinition } from '$lib/grid/grid.svelte';
import { writable } from 'svelte/store';

export const chartsDefinitions = writable<ChartDefinition[]>