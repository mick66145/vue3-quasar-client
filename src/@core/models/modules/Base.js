import { randomHashKey } from '@/utils'

const Base = {
}

const BaseModel = () => (
  {
    ...Base,
    hashKey: randomHashKey(['up_en', 'low_en', 'num'], 40),
  }
)

export default BaseModel
