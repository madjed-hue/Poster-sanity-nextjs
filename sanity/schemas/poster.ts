import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'poster',
  title: 'Poster',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title of Post',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'postType',
      title: 'Type of Post',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description of Post',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'blockImagePoster',
      title: 'Block Post',
      description: 'ADMIN controls: Block post if it is inappropriate .',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Poster Image',
      type: 'string',
    }),
    defineField({
      name: 'video',
      title: 'Poster Video',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'gigType',
      title: 'Gig Type',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'category',
      title: 'Gig Category',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'subcategory',
      title: 'Gig Sub-Category',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'gigTags',
      title: 'Gig Tags',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: [],
    }),
    defineField({
      name: 'location',
      title: 'Gig Location',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'price',
      title: 'Gig Price',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'name',
      title: 'Event Name',
      type: 'string',
      initialValue: '',
    }),

    defineField({
      name: 'eventStartDate',
      title: 'Event Start Date',
      type: 'date',
      initialValue: new Date().toISOString().split('T')[0],
    }),

    defineField({
      name: 'eventEndDate',
      title: 'Event End Date',
      type: 'date',
      initialValue: new Date().toISOString().split('T')[0],
    }),

    defineField({
      name: 'address',
      title: 'Event Address',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'eventLink',
      title: 'Event Link',
      type: 'string',
      initialValue: '',
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
