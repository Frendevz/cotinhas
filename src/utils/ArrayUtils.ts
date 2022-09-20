export function groupBy<T, K>(
  fnGrouping: (x: T) => K,
  arrToGroup: T[]
): Map<K, T[]> {
  const mGroups = new Map();
  arrToGroup.forEach((item) => {
    const strGroup = fnGrouping(item);
    if (!mGroups.get(strGroup)) {
      mGroups.set(strGroup, []);
    }
    mGroups.get(strGroup).push(item);
  });

  return mGroups;
}
