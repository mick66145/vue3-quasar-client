// https://github.com/cuatromedios/quasar-app-extension-vuelidate-rules

import * as methods from '@vuelidate/validators'
import {
  isGuiNumberValid, // 統一編號
  isNationalIdentificationNumberValid, // 身分證字號
  isResidentCertificateNumberValid, // 居留證編號
  isNewResidentCertificateNumberValid, // 新式居留證編號
  isOriginalResidentCertificateNumberValid, // 舊式居留證編號
  isCitizenDigitalCertificateNumberValid, // 自然人憑證
  isEInvoiceCellPhoneBarcodeValid, // 手機條碼
  isEInvoiceDonateCodeValid, // 捐贈碼
  isCreditCardNumberValid, // 信用卡
} from './taiwan-id-validator'

import dayjs from 'dayjs'

export const vuelidate = {
  is (value, message) {
    message = message !== undefined ? message : false
    return (val) => {
      let result
      switch (typeof value) {
      case 'string':
        result = String(val) === value
        break
      case 'number':
        result = Number(val) === value
        break
      default:
        result = val === value
      }
      return result || message
    }
  },
  required (message = false) {
    return (val) => methods.required.$validator(val) || message
  },
  requiredIf (ref, message = false) {
    return (val) => methods.requiredIf(ref).$validator(val) || message
  },
  requiredUnless (ref, message = false) {
    return (val) => methods.requiredUnless(ref).$validator(val) || message
  },
  minLength (length, message = false) {
    return (val) => methods.minLength(length).$validator(val) || message
  },
  maxLength (length, message = false) {
    return (val) => methods.maxLength(length).$validator(val) || message
  },
  minValue (value, message = false) {
    return (val) => methods.minValue(value).$validator(val) || message
  },
  maxValue (value, message = false) {
    return (val) => methods.maxValue(value).$validator(val) || message
  },
  between (min, max, message = false) {
    return (val) => methods.between(min, max).$validator(val) || message
  },
  alpha (message = false) {
    return (val) => methods.alpha.$validator(val) || message
  },
  alphaNum (message = false) {
    return (val) => methods.alphaNum.$validator(val) || message
  },
  numeric (message = false) {
    return (val) => methods.numeric.$validator(val) || message
  },
  integer (message = false) {
    return (val) => methods.integer.$validator(val) || message
  },
  decimal (message = false) {
    return (val) => methods.decimal.$validator(val) || message
  },
  email (message = false) {
    return (val) => methods.email.$validator(val) || message
  },
  ipAddress (message = false) {
    return (val) => methods.ipAddress.$validator(val) || message
  },
  macAddress (separator = ':', message = false) {
    return (val) => methods.macAddress.$validator(separator)(val) || message
  },
  url (message = false) {
    return (val) => methods.url.$validator(val) || message
  },
  or (...args) {
    let message = false
    if (typeof args[args.length - 1] === 'string') {
      message = args.pop()
    }
    return (val) => methods.or(...args).$validator(val) || message
  },
  and (...args) {
    let message = false
    if (typeof args[args.length - 1] === 'string') {
      message = args.pop()
    }
    return (val) => methods.and(...args).$validator(val) || message
  },
  not (rule, message = false) {
    return (val) => methods.not(rule).$validator(val) || message
  },
  sameAs (locator, message = false) {
    return (val) => val === locator || message
  },
  regex (regex, message = false) {
    return (val) => {
      if (!val) return true
      return regex.test(val) || message
    }
  },
  dayjIsBefore (locator, message = false, format = 'YYYY-MM-DD') {
    return (val) => {
      if (!val) return true
      return dayjs(val, format).isBefore(dayjs(locator, format)) || message
    }
  },
  dayIsSameOrBefore (locator, message = false, format = 'YYYY-MM-DD') {
    return (val) => {
      if (!val) return true
      return dayjs(val, format).isSameOrBefore(dayjs(locator, format)) || message
    }
  },
  dayjIsAfter (locator, message = false, format = 'YYYY-MM-DD') {
    return (val) => {
      if (!val) return true
      return dayjs(val, format).isAfter(dayjs(locator, format)) || message
    }
  },
  dayIsSameOrAfter (locator, message = false, format = 'YYYY-MM-DD') {
    return (val) => {
      if (!val) return true
      return dayjs(val, format).isSameOrAfter(dayjs(locator, format)) || message
    }
  },
  isTrue (message = false) {
    return (val) => val === true || message
  },
  isGuiNumberValid (extended = true, message = false) {
    return (val) => {
      if (!val) return true
      return isGuiNumberValid(val, extended) || message
    }
  },
  isNationalIdentificationNumberValid (message = false) {
    return (val) => {
      if (!val) return true
      return isNationalIdentificationNumberValid(val) || message
    }
  },
  isCreditCardNumberValid (message = false) {
    return (val) => {
      if (!val) return true
      return isCreditCardNumberValid(val) || message
    }
  },
}

export default function (app) {
  app.config.globalProperties.$rules = vuelidate
  app.provide('vuelidate', vuelidate)
}
