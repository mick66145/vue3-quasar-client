import useResource from '@/hooks/useResource'
import { CityViewModel } from '@core/modules/city/models'

export const CityResource = ({
  uri = 'city',
}) => {
  const { list, get } = useResource({ uri, listModel: CityViewModel, getModel: CityViewModel })

  return {
    list,
    get,
  }
}
