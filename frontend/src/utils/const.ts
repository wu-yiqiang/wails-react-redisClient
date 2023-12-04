interface redisDataType {
  label: string,
  value: string
}
export const typeOptions = <redisDataType>(<unknown>[
  { label: 'string', value: 'string' },
  { label: 'hash', value: 'hash' },
])