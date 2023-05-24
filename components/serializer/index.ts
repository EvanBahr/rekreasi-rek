import JSONAPISerializer from 'json-api-serializer'
import users from './schema/users'
import activities from './schema/activities'
import media from './schema/media'
import places from './schema/places'
import cities from './schema/cities'
import tags from './schema/tags'
import costs from './schema/costs'
import schedules from './schema/schedules'



const Serializer = new JSONAPISerializer()

Serializer.register('users', users)
Serializer.register('activities', activities)
Serializer.register('media', media)
Serializer.register('places', places)
Serializer.register('cities', cities)
Serializer.register('tags', tags)
Serializer.register('costs', costs)
Serializer.register('schedules', schedules)

export default Serializer
