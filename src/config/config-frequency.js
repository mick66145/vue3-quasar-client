export const frequency = {
  hourly: 'hourly',
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
  // custom: 'custom',
}

export const frequencyName = {
  [frequency.hourly]: '每小時',
  [frequency.daily]: '每日',
  [frequency.weekly]: '每週',
  [frequency.monthly]: '每月',
  // [frequency.custom]: '自訂頻率',
}

export const frequencyList = Object.keys(frequencyName).map(key => ({
  label: frequencyName[key],
  value: key,
}))
