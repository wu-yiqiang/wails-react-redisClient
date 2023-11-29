import { useEffect, useState } from 'react'
import { Button, Collapse, message } from 'antd'
const { Panel } = Collapse
import Connection from '../connection'
import { ConnectionList, ConnectionCreate } from '../../wailsjs/go/main/App'
function Pannel() {
  const [list, setList] = useState([])
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('新建连接')
  useEffect(() => {
    const fetchData = async () => {
      const { data, code, msg } = await ConnectionList()
      if (code === 200) {
        setList(data)
      } else {
        message.error(msg ? msg : '连接失败')
      }
    };
    fetchData()
  }, [])
  const onChange = (key: string | string[]) => {
    console.log(key)
  }
  const createLink = () => {
    setOpen(true)
  }
  const handleOpen = (value: boolean) => {
    setOpen(value)
  }
  return (
    <>
      <Button type="primary" onClick={createLink} style={{marginBottom: '10px'}}>
        创建连接
      </Button>
      <Collapse defaultActiveKey={['0']} onChange={onChange}>
        {list.length &&
          list.map((item: any) => {
            return (
              <Panel header={item.name} key={item.name}>
                {item.addr}
              </Panel>
            )
          })}
      </Collapse>
      <Connection open={open} handleOpen={handleOpen} title={title} />
    </>
  )
}

export default Pannel
