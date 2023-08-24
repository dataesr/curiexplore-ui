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
  if (fields.ue27 === 'True') {
    items.push({ label: 'UE27', code: 'ue27' });
  }
  if (fields.g7 === 'True') {
    items.push({ label: 'G7', code: 'g7' });
  }
  if (fields.g20 === 'True') {
    items.push({ label: 'G20', code: 'g20' });
  }

  return items;
}
