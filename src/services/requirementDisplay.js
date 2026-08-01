import i18n from '@/plugins/i18n';
import RequirementAddForm from '@/forms/RequirementAddForm';

export function requirementIcon(req) {
  const type = RequirementAddForm.types[req.type];
  return type ? type.icon : 'mdi-help-circle-outline';
}

// Short human-readable description of a requirement, e.g. "Permission Level ≥ 50".
// keyName, when provided, is the resolved display name for req.key (e.g. a group or
// packet name looked up from its id) and is shown in place of the raw id.
export function requirementLabel(req, formatDate, keyName) {
  const parts = [i18n.global.t(`_requirement.types.${req.type}`)];

  if (req.operator) {
    parts.push(i18n.global.t(`_requirement.operators.${req.operator}`).toString().toLowerCase());
  }

  const key = keyName ?? req.key;
  if (key !== undefined && key !== null && key !== '') {
    parts.push(key);
  }

  let value = req.value;
  if (req.type === 'DATE' && value && formatDate) {
    value = formatDate(value);
  }
  if (value !== undefined && value !== null && value !== '') {
    parts.push(value);
  }

  return parts.join(' ');
}
