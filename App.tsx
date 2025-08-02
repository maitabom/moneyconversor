/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { PickerItem } from './src/components/picker';
import { api } from './src/services/api';
import CurrencyPicker from './src/model/currency_picker';

function App() {
  const [currenciesPicker, setCurrenciesPicker] = useState<CurrencyPicker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCurrency() {
      const response = await api.get<any>('all');
      let currencies: CurrencyPicker[] = [];

      Object.keys(response.data).map(key => {
        currencies.push({
          key: key,
          value: key,
          label: key,
        });
      });

      setCurrenciesPicker(currencies);
    }

    loadCurrency();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" /> 
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.currencyArea}>
        <Text style={styles.title}>Selecione a sua moeda</Text>
        <PickerItem />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#101215',
    paddingTop: 40,
    alignItems: 'center',
  },
  currencyArea: {
    backgroundColor: '#F9F9F9',
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    paddingLeft: 5,
    paddingTop: 5,
  },
});

export default App;
