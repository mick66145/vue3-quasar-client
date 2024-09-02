export const marriageTypes = {
  married: 'married',
  unmarried: 'unmarried',
  divorce: 'divorce',
}

export const marriageTypeName = {
  [marriageTypes.married]: '已婚',
  [marriageTypes.unmarried]: '未婚',
  [marriageTypes.divorce]: '離婚',
}

export const marriageList = Object.keys(marriageTypeName).map(key => ({
  label: marriageTypeName[key],
  value: key,
}))
