interface IDataRow {
    Description: String,
    Category: String,
    Type: TransactionType,
    Amount: Number
}

enum TransactionType {
    Expenditure,
    Income,
}

export type { IDataRow, TransactionType }