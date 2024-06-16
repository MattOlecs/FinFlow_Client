import { selectedYear, selectedMonth } from './dateStore';
import { get } from 'svelte/store';

export interface GridData {
    Description: string,
    Category: string,
    Type: string,
    Amount: number,
    CategoryId: number
}

export interface AggregatedData {
    Group: string,
    Value: number
}

export interface Category {
    Id: number,
    Name: string
}

class DataStore {
    private gridDataList: GridData[]
    private categories = ['Wydatki podstawowe', 'Edukacja', 'Transport'];

    constructor() {
        this.gridDataList = [];
    }

    async addGridData(data: GridData): Promise<void> {
        try {
			const response = await fetch('http://localhost:5273/transaction-records', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					description: data.Description,
                    transactionRecordType: data.Type == 'Wydatek'? 2 : 1,
                    amount: data.Amount,
                    categoryId: data.CategoryId,
                    date: (new Date()).toISOString(),
				})
			});

			if (response.ok) {
                console.log('data added');
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error('Error:', error);
		}
    }

    async getGridData(): Promise<GridData[]> {

        const year = get(selectedYear);
        const month = get(selectedMonth);
        const date = new Date(year, month + 1, 1);
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

    async addCategory(category: Category): Promise<Category> {
        try {
			const response = await fetch('http://localhost:5273/transaction-category', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					Name: category.Name
				})
			});

			if (response.ok) {
                console.log('category added');
                const data = await response.json();
                category.Id = data.id;

                return category;
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error('Error:', error);
		}
        
        return category;
    }

    async getCategories(): Promise<Category[]> {
        let categories: Category[] = [];
		try {
			const response = await fetch('http://localhost:5273/transaction-category/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
				})
			});

			if (response.ok) {
                const data = await response.json();
                console.log('data:' + data);
                categories = data.map((item: any) => ({
                    Id: item.id,
                    Name: item.name
                }));
                return categories;
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error('Error:', error);
		}

        return categories;
    }

}

// Create a singleton instance
const dataStoreInstance = new DataStore();

// Export the singleton instance
export default dataStoreInstance;
