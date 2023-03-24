import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: [],
    }),
    defineField({
      name: 'studyDegree',
      title: 'Study Degree',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'diplomes',
      title: 'Diplomes',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: [],
    }),
    defineField({
      name: 'yearsOfExp',
      title: 'Work Experience',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
