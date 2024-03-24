import React, { useEffect, useState } from 'react';
import { Text, ScrollView, Button, Card, YStack } from 'tamagui'
import { fetchPurchases } from '../services/database';

type Transaction = {
  id: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
};

export default function TabHistoryScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchPurchases((error, result) => {
      if (error) {
        console.error("Error fetching purchases:", error);
      } else {
        setTransactions(result);
      }
    });
  }, []);

  return (
    <ScrollView padding="$3">
      <YStack gap="$3">
        {transactions.map((transaction) => (
          <Card key={transaction.id}>
            <Card.Header padded>
              <YStack gap="$2">
                <Text>Amount: ${transaction.amount}</Text>
                <Text>Category: {transaction.category}</Text>
                <Text>Date: {transaction.date}</Text>
                {transaction.note && <Text>Note: {transaction.note}</Text>}
              </YStack>
            </Card.Header>
            <Card.Footer padded>
              <Button onPress={() => deletePurchase(transaction.id)}>Delete Transaction</Button>
            </Card.Footer>
          </Card>
        ))}
      </YStack>
    </ScrollView>
  );
}
