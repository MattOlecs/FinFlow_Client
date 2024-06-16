import { selectedYear, selectedMonth } from './dateStore';
import { get } from 'svelte/store';

export interface GridData {
    Description: string,
    Category: string,
    Type: string,
    Amount: number
}

export interface AggregatedData {
    Group: string,
    Value: number
}

class DataStore {
    private gridDataList: GridData[]
    private categories = ['Wydatki podstawowe', 'Edukacja', 'Transport'];

    constructor() {
        this.gridDataList = [];
    }

    addGridData(data: GridData): void {
        this.gridDataList.push(data)
    }

    async getGridData(): Promise<GridData[]> {

        const year = get(selectedYear);
        const month = get(selectedMonth);
        const date = new Date(year, month, 1);
        console.log('selected datetime: ' + date.toISOString);

        let gridData;
		try {
			const response = await fetch('http://localhost:5273/transaction-records/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					date: date.toISOString()
				})
			});

			if (response.ok) {
                const data = await response.json();
                console.log(data);
                gridData = data.map((item: any) => ({
                    Description: item.description,
                    Category: item.categoryName,
                    Type: item.transactionRecordType === 2 ? 'Wydatek' : 'Przychód',
                    Amount: item.amount
                }));
                this.gridDataList = gridData
                return gridData;
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error('Error:', error);
		}

		return gridData;
    }

    async getAggregatedData(): Promise<AggregatedData[]> {
        let gridData: GridData[] = await this.getGridData();
        const aggregatedData: Record<string, number> = {};

        gridData
            .filter(item => item.Type === 'Wydatek')
            .forEach(item => {
                if (aggregatedData[item.Category]) {
                    aggregatedData[item.Category] += item.Amount;
                } else {
                    aggregatedData[item.Category] = item.Amount;
                }
            });

        const aggregatedList: AggregatedData[] = Object.entries(aggregatedData).map(([group, value]) => ({
            Group: group,
            Value: value
        }));

        console.log('agg list: ' + aggregatedList.length)
        return aggregatedList;
    }

    addCategory(category: string) {
        this.categories.push(category);
        console.log("kategorie:")
        console.log(this.categories)
    }

    getCategories(): string[] {
        return this.categories;
    }

}

// Create a singleton instance
const dataStoreInstance = new DataStore();

// Export the singleton instance
export default dataStoreInstance;
