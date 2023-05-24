export default {
  blacklist: ['meta'],
  links: {
    self: (data: any) => '/costs/' + data.id
  },
  relationships: {
    activity: {
      type: 'activities'
    }
  },
  topLevelMeta(_: any, extra: any) {
    return {
      total: extra.total
    }
  },
  meta(data: any) {
    return data.meta
  }
}
