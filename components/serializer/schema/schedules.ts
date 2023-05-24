export default {
  blacklist: ['meta'],
  links: {
    self: (data: any) => '/schedules/' + data.id
  },
  relationships: {
    destination: {
      type: 'places'
    },
    meeting_place: {
      type: 'places'
    },
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
