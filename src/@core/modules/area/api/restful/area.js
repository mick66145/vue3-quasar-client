import useResource from '@/hooks/useResource'
import { AreaViewModel } from '@core/modules/area/models'

export const AreaResource = ({
  uri = 'area',
}) => {
  const { list, get } = useResource({ uri, listModel: AreaViewModel, getModel: AreaViewModel })

  return {
    list,
    get,
  }
}
