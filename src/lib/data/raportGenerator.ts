import dataStoreInstance from '$lib/data/dataStore';
import { selectedYear, selectedMonth } from './dateStore';
import { get } from 'svelte/store';

class RaportGenerator {
    constructor() {}

    getRaport(): string {
        let dateInfo = `Raport za ${get(selectedMonth) + 1}/${get(selectedYear)}`
        let aggregated =  JSON.stringify(dataStoreInstance.getAggregatedData());
        let simple = JSON.stringify(dataStoreInstance.getGridData());
        return dateInfo + '\n' + aggregated + '\n' + simple
    }
}

const raportGenerator = new RaportGenerator();

export default raportGenerator;