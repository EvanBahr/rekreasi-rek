export default {
  blacklist: ['meta'],
  links: {
    self: (data: any) => '/activities/' + data.id
  },
  relationships: {
    creator: {
      type: 'users'
    },
    destination: {
      type: 'places'
    },
    meeting_place: {
      type: 'places'
    },
    return_place: {
      type: 'places'
    },
    costs: {
      type: 'costs'
    },
    schedules: {
      type: 'schedules'
    },
    participants: {
      type: 'users'
    },
    tags: {
      type: 'tags'
    },
    media: {
      type: 'media'
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
