import { Text, ScrollView, Button, Card, YStack } from 'tamagui'
import { usePurchases, useAddPurchase, useDeletePurchase } from '../store';

export default function TabOneScreen() {
  const purchases = usePurchases();
  const deletePurchase = useDeletePurchase();

  return (
    <ScrollView padding="$3">
      <YStack gap="$3">
        {purchases.map((purchase) => (
          <Card key={purchase.id}>
            <Card.Header padded>
              <YStack gap="$2">
                <Text>Amount: ${purchase.amount}</Text>
                <Text>Category: {purchase.category}</Text>
                <Text>Date: {purchase.date}</Text>
                {purchase.note && <Text>Note: {purchase.note}</Text>}
              </YStack>
            </Card.Header>
            <Card.Footer padded>
              <Button onPress={() => deletePurchase(purchase.id)}>Delete Transaction</Button>
            </Card.Footer>
          </Card>
          
        ))}
      </YStack>
    </ScrollView>
  )
}
