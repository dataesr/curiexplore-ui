export default function checkPolicyItems(fields) {
  const items = [];

  if (fields.bologne === 'True') {
    items.push({ label: 'Processus de bologne', code: 'bologne' });
  }
  if (fields.oecd_members === 'True') {
    items.push({ label: 'Membre de l\'OCDE', code: 'oecd_members' });
  }
  if (fields.euro_area === 'True') {
    items.push({ label: 'Zone euro', code: 'euro_area' });
  }

  return items;
}
