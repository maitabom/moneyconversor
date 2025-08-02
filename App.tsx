/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { PickerItem } from './src/components/picker';
import { api } from './src/services/api';
import CurrencyPicker from './src/model/currency_picker';

function App() {
  const [currenciesPicker, setCurrenciesPicker] = useState<CurrencyPicker[]>(
    [],
  );
  const [currencyPickerSelect, setCurrencyPickerSelect] =
    useState<CurrencyPicker | null>(null);
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
      setCurrencyPickerSelect(currencies[0]);
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
        <PickerItem
          currencies={currenciesPicker}
          selected={currencyPickerSelect}
          onChange={currency => setCurrencyPickerSelect(currency)}
        />
      </View>

      <View style={styles.valueArea}>
        <Text style={styles.title}>
          Digite o valor para converter em real (R$).
        </Text>
        <TextInput keyboardType='numeric' style={styles.input} placeholder="Exemplo 1.50" />
      </View>

      <TouchableOpacity style={styles.buttonArea}>
        <Text style={styles.buttonText}>Converter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 1
  },
  valueArea: {
    backgroundColor: '#F9F9F9',
    width: '90%',
    paddingTop: 8,
    paddingBottom: 8
  },
  buttonArea: {
    width: '90%',
    backgroundColor: '#FB4B57',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  input: {
    width: '100%',
    padding: 8,
    fontSize: 18,
    color: '#000'
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    paddingLeft: 5,
    paddingTop: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default App;
