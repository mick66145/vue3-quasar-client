import useResource from '@/hooks/useResource'
import { CountryCodeViewModel } from '@core/modules/country-code/models'

export const CountryCodeResource = ({ 
  uri = 'country_code'
}) => {
  const { list , get  } = useResource({uri , listModel:CountryCodeViewModel, getModel:CountryCodeViewModel})

  return {
    list,
    get,
  }
}


