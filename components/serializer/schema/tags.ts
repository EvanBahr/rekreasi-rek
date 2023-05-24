export default {
  blacklist: ['meta'],
  links: {
    self: (data: any) => '/tags/' + data.id
  },
  relationships: {
    activities: {
      type: 'activities'
    },
    cover: {
      type: 'media'
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
