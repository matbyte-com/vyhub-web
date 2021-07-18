import i18n from '@/plugins/i18n';
import AddressForm from '@/forms/AddressForm';

const form = { ...AddressForm };

form.properties.vat_number = {
  type: 'string',
  title: i18n.t('_address.labels.vat_number'),
};

export default form;
