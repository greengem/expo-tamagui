import { create } from 'zustand';

interface Purchase {
  id: number;
  amount: number;
  category: string;
  date: string;
  note?: string;
}

type Store = {
  purchases: Purchase[];
  addPurchase: (amount: number, category: string, date: string, note?: string) => void;
  deletePurchase: (id: number) => void;
};

export const useStore = create<Store>((set) => ({
  purchases: [],
  addPurchase: (amount, category, date, note) =>
    set((state) => ({
      purchases: [
        ...state.purchases,
        {
          id: state.purchases.length + 1,
          amount,
          category,
          date,
          note,
        },
      ],
    })),
  deletePurchase: (id) =>
    set((state) => ({
      purchases: state.purchases.filter(purchase => purchase.id !== id),
    })),
}));

// Update selectors to include deletePurchase
export const usePurchases = () => useStore((state) => state.purchases);
export const useAddPurchase = () => useStore((state) => state.addPurchase);
export const useDeletePurchase = () => useStore((state) => state.deletePurchase);
