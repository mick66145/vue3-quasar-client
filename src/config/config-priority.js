export const priority = {
  low: 'low',
  medium: 'medium',
  high: 'high',
}

export const priorityName = {
  [priority.low]: '低',
  [priority.medium]: '中',
  [priority.high]: '高',
}

export const priorityList = Object.keys(priorityName).map(key => ({
  label: priorityName[key],
  value: key,
}))
