import { Picker } from '@react-native-picker/picker';
import PickerItemProperties from './properties';

export function PickerItem(properties: PickerItemProperties) {
  let currenciesTag = properties.currencies.map((item, index) => {
    return <Picker.Item value={item.value} key={index} label={item.label} />;
  });

  return (
    <Picker
      selectedValue={properties.selected!}
      onValueChange={value => properties.onChange(value)}
    >
      {currenciesTag}
    </Picker>
  );
}
