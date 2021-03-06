export default function getLabs(observations) {
  if (!observations) return [];

  return observations.filter((observation) => {
    return observation.category.filter((cat) => {
      return cat.coding.filter(coding => coding.code === 'laboratory').length > 0;
    }).length > 0;
  });
}
