import { graphql } from 'msw';

export const handlers = [
  graphql.query('GetNotes', (req, res, ctx) => {
    return res(
      ctx.data({
        notes: [
          {
            id: 'adfa3335',
            title: 'New first note',
            body: 'This is a new note from me',
            isDeleted: false,
            deletedAt: null,
            user: {
              id: 'afadf333',
              email: 'new@yahoo.com',
              username: 'new1',
            },
          },
          {
            id: 'adfa3339',
            title: 'New Second note',
            body: 'This is a second new note from me',
            isDeleted: false,
            deletedAt: null,
            user: {
              id: 'afadf333',
              email: 'new@yahoo.com',
              username: 'new1',
            },
          },
          {
            id: 'adfa3335',
            title: 'New third note',
            body: 'This is a third new note from me',
            isDeleted: true,
            deletedAt: null,
            user: {
              id: 'afadf333',
              email: 'new@yahoo.com',
              username: 'new1',
            },
          },
        ],
      })
    );
  }),
];
