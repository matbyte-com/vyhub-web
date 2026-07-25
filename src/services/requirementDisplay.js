import i18n from '@/plugins/i18n';
import RequirementAddForm from '@/forms/RequirementAddForm';

export function requirementIcon(req) {
  const type = RequirementAddForm.types[req.type];
  return type ? type.icon : 'mdi-help-circle-outline';
}

// Short human-readable description of a requirement, e.g. "Permission Level ≥ 50".
export function requirementLabel(req, formatDate) {
  const parts = [i18n.global.t(`_requirement.types.${req.type}`)];

  if (req.operator) {
    parts.push(i18n.global.t(`_requirement.operators.${req.operator}`).toString().toLowerCase());
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
