export const provider = {
  line: 'line',
  google: 'google',
  facebook: 'facebook',
}

export const providerText = {
  [provider.line]: 'Line',
  [provider.google]: 'Google',
  [provider.facebook]: 'Facebook',
}

export const providerList = Object.keys(providerText).map(key => ({
  label: providerText[key],
  value: key,
}))
