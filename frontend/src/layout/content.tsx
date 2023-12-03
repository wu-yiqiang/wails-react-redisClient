import { useEffect, useState } from 'react'
import { Col, Row, Input, Form, Button } from 'antd'
import { DeleteFilled, SyncOutlined } from '@ant-design/icons'
const { TextArea } = Input
import '../style/Content.css'
function Content(props:any) {
  const { info } = props
  let [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(info)
  }, [info])
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
              <Input />
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
          <Button type="primary" icon={<DeleteFilled />} danger>
            删除
          </Button>
          <Button type="primary" icon={<SyncOutlined />}>
            刷新
          </Button>
          <Button type="primary">提交</Button>
        </div>
      </Form>
    </div>
  )
}

export default Content
