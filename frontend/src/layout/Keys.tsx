import { useState } from 'react'
import '../style/Keys.css'
import { message, } from 'antd'
import { GetKeyValue } from '../../wailsjs/go/main/App'
function Keys(props: any) {
  const { keyList, db, identify, setInfo } = props
  const [index, setIndex] = useState("")
  const queryKeyValue = async (key: string) => {
    const { data, code, msg } = await GetKeyValue({ conn_identify: identify, db: parseInt(db.slice(2)), key: key })
    setIndex(key)
    if (code === 200) {
      data.key = key
      data.identify = identify
      data.db = db
      setInfo(data)
      console.log('conte', data)
    } else {
      message.error(msg)
    }
  }
  return (
    <>
      {keyList.map((key: string) => {
        return (
          <div className={index == key ? 'key isActive' : 'key'} key={key} onClick={() => queryKeyValue(key)}>
            {key}
          </div>
        )
      })}
    </>
  )
}

export default Keys
