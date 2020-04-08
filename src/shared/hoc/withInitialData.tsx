import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface IWithInitialDataProps extends
  RouteComponentProps<{}, { statusCode?: number, initialData: any }>, SSRPage {
}

function WithInitialData<
  P extends IWithInitialDataProps
>(
  PageComponent: React.ComponentType<P>,
) {
  const WithInitialDataComponent: React.FC<P> = (props) => {
    const { staticContext } = props
    let data = null

    if (process.env.IS_SERVER) {
      data = staticContext?.initialData
    } else {
      data = window.initialData

      window.initialData = null
    }

    return <PageComponent initialData={data} {...props} />
  }
  //console.log(PageComponent)
  return WithInitialDataComponent
}

export default WithInitialData
