import { useState } from 'react'
import '../style/Keys.css'
import { message, } from 'antd'
import { GetKeyValue } from '../../wailsjs/go/main/App'
function Keys(props: any) {
  const { keyList, db, identify } = props
  const queryKeyValue = async (key: string) => {
    const { data, code, msg } = await GetKeyValue({ conn_identify: identify, db: parseInt(db.slice(2)), key: key })
    if (code === 200) {
      console.log(data)
      
    } else {
      message.error(msg)
    }
  }
  return (
    <>
      {keyList.map((key: string) => {
        return <div className='key' key={ key } onClick={() => queryKeyValue(key)} >{key} { db }</div>
      })}
    </>
  )
}

export default Keys
