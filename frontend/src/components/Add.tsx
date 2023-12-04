import { useEffect, useState } from 'react'
import { Col, Row, Input, Form, Button, message, Modal, Select } from 'antd'
const { TextArea } = Input
import { SaveOutlined } from '@ant-design/icons'
import { SetKeyValue } from '../../wailsjs/go/main/App'
import { typeOptions } from '../utils/const'
import '../style/Content.css'
function Add(props: any) {
  const { info, open, handleOpen } = props
  let [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [options, setOptions] = useState(typeOptions)
  useEffect(() => {
    setIsModalOpen(open)
  }, [open])
  const handleAdd = async () => {
    const params = {
      conn_identify: info.identify,
      db: info.db,
      key: form.getFieldValue('key'),
      value: form.getFieldValue('value'),
      type: form.getFieldValue('type'),
      ttl: form.getFieldValue('ttl')
    }
    const { data, code, msg } = await SetKeyValue(params)
    if (code === 200) {
      message.success('键信息新增成功')
      form.resetFields()
      handleOpen(false)
    } else {
      message.error(msg)
    }
  }

  const handleCancel = () => {
    handleOpen(false)
  }
  return (
    <Modal title="新增" width={'80%'} open={isModalOpen} onCancel={handleCancel} footer={null}>
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
              <Select options={options} />
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
          <Button type="primary" icon={<SaveOutlined />} onClick={handleAdd}>
            保存
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default Add
