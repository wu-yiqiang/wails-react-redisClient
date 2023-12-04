import { useEffect, useState } from 'react'
import { Col, Row, Input, Form, Button, message, Select } from 'antd'
import { DeleteFilled, SyncOutlined, SaveOutlined } from '@ant-design/icons'
import { GetKeyValue, DeleteKeyValue, SetKeyValue } from '../../wailsjs/go/main/App'
const { TextArea } = Input
import {typeOptions} from '../utils/const'
import '../style/Content.css'
function Content(props:any) {
  const { info, flush } = props
  let [form] = Form.useForm()
  const [options, setOptions] = useState(typeOptions)
  useEffect(() => {
    console.log('sadas', info)
    form.setFieldsValue(info)
  }, [info])

  const handleDelete = async () => {
    const { data, code, msg } = await DeleteKeyValue({ conn_identify: info.identify, db: parseInt(info.db.slice(2)), key: info.key })
    if (code === 200) {
      message.success('删除键成功')
    } else {
      message.error(msg)
    }
  }

  const handleFlush = async () => {
    const { data, code, msg } = await GetKeyValue({ conn_identify: info.identify, db: parseInt(info.db.slice(2)), key: info.key })
    if (code === 200) {
      form.setFieldsValue(data)
      message.success('重新获取成功')
    } else {
      message.error(msg)
    }
  }

  const handleSave = async () => {
    const params = {
      conn_identify: info.identify,
      db: parseInt(info.db),
      key: form.getFieldValue('key'),
      value: form.getFieldValue('value'),
      type: form.getFieldValue('type'),
      ttl: form.getFieldValue('ttl')
    }
    const { data, code, msg } = await SetKeyValue(params)
    if (code === 200) {
      form.setFieldsValue(data)
      message.success('键信息更新成功')
    } else {
      message.error(msg)
    }
  }
  return (
    <div className="contentItem">
      <Form form={form} autoComplete="off">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="key" label="键">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="type" label="类型">
              {/* <Input /> */}
              <Select defaultValue={info.type} options={options} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ttl" label="TTL">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="value" label="值">
              <TextArea rows={6} />
            </Form.Item>
          </Col>
        </Row>
        <div className="submit">
          <Button type="primary" icon={<DeleteFilled />} danger onClick={handleDelete}>
            删除
          </Button>
          <Button type="primary" icon={<SyncOutlined />} onClick={handleFlush}>
            刷新
          </Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            保存
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Content
