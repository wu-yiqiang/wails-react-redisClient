interface redisDataType {
  label: string,
  value: string
}
export const typeOptions: redisDataType[] = [
  { label: 'string', value: 'string' },
  { label: 'hash', value: 'hash' }
]