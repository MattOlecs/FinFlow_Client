import dataStoreInstance from '$lib/data/dataStore';

class RaportGenerator {

    constructor() {}

    getRaport(): string {
        let dateInfo = "Raport za 03/2024"
        let aggregated =  JSON.stringify(dataStoreInstance.getAggregatedData());
        let simple = JSON.stringify(dataStoreInstance.getGridData());
        return dateInfo + '\n' + aggregated + '\n' + simple
    }
}

const raportGenerator = new RaportGenerator();

export default raportGenerator;