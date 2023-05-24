export default {
  blacklist: ['meta'],
  links: {
    self: (data: any) => '/users/' + data.id
  },
  relationships: {
    activities: {
      type: 'activities'
    },
    wishlists: {
      type: 'activities'
    },
    joining: {
      type: 'activities'
    },
    followers: {
      type: 'users'
    },
    following: {
      type: 'users'
    },
    media: {
      type: 'media'
    },
    avatar: {
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
