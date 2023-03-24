import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'string',
    }),

    defineField({
      name: 'blockComment',
      title: 'Block Comment',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'reference',
      description: 'Reference the Poster the comment is associated to:',
      to: {type: 'poster'},
    }),
  ],
})
