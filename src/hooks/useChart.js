// 按需引入
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import {
  PieChart,
  LineChart,
  BarChart,
} from 'echarts/charts'
import {
  CanvasRenderer,
} from 'echarts/renderers'

echarts.use(
  [
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    PieChart,
    LineChart,
    BarChart,
    CanvasRenderer,
  ],
)

export default function useChart ({
  element,
  theme = 'light',
}) {
  const chart = echarts.init(element)

  // methods
  const setOption = option => {
    return chart.setOption(option, theme)
  }
  const resize = () => chart.resize()

  return {
    echarts,
    setOption,
    resize,
  }
}
