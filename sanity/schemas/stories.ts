import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stories',
  title: 'Stories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'number',
      initialValue: 5000,
    }),
    defineField({
      name: 'url',
      title: 'Story Url',
      type: 'string',
    }),
    defineField({
      name: 'storyType',
      title: 'Story Type',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Story Description',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'seeMore',
      title: 'See More',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      description: 'Reference the User the Poster is associated to:',
      to: {type: 'user'},
    }),
  ],
})
