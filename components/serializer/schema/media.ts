export default {
  blacklist: ['meta'],
  links: {
    self: (data: any) => '/media/' + data.id
  },
  relationships: {
    owner: {
      type: 'users'
    },
    activities: {
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
