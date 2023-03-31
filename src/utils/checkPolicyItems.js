export default function checkPolicyItems(fields) {
  const items = [];

  if (fields.bologne === 'True') {
    items.push('Processus de bologne');
  }
  if (fields.oecd_members === 'True') {
    items.push('Membre de l\'OCDE');
  }
  if (fields.euro_area === 'True') {
    items.push('Zone euro');
  }

  return items;
}
