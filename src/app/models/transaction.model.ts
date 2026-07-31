export interface Transaction {
    id: number,
    name: string,
    amount: number,
    type: 'income' | 'expense',
    date: Date
}