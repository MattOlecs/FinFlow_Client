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
        this.gridDataList = [
            { Description: 'Zakupy spożywcze', Category: 'Wydatki podstawowe', Type: 'Wydatek', Amount: 240.16 },
            { Description: 'Opłata za studia', Category: 'Edukacja', Type: 'Wydatek', Amount: 2000 },
            { Description: 'Wypłata marzec', Category: 'Przychód podstawowy', Type: 'Przychód', Amount: 6598.36 },
            { Description: 'Rata za samochód', Category: 'Transport', Type: 'Wydatek', Amount: 829.22 },
            { Description: 'Paliwo', Category: 'Transport', Type: 'Wydatek', Amount: 199.98 },
            { Description: 'Czynsz', Category: 'Mieszkanie', Type: 'Wydatek', Amount: 1500.00 },
            { Description: 'Rachunek za prąd', Category: 'Mieszkanie', Type: 'Wydatek', Amount: 242.34 },
            { Description: 'Ogrzewanie', Category: 'Mieszkanie', Type: 'Wydatek', Amount: 120.66 },
            { Description: 'Internet', Category: 'Mieszkanie', Type: 'Wydatek', Amount: 78.99 },
        ];
    }

    addGridData(data: GridData): void {
        this.gridDataList.push(data)
    }

    getGridData(): GridData[] {
        return this.gridDataList;
    }

    getAggregatedData(): AggregatedData[] {
        const aggregatedData: Record<string, number> = {};

        this.gridDataList
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
