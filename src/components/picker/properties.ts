import CurrencyPicker from '../../model/currency_picker';

export default interface PickerItemProperties {
  currencies: CurrencyPicker[];
  selected: CurrencyPicker | null;
  onChange: (currency: CurrencyPicker) => void;
}
