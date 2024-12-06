import { graphql, HttpResponse } from 'msw';
const allNotes = new Map([
  [
    'u2ngZDjBiU',
    {
      id: 'u2ngZDjBiU',
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
  ],
  [
    'PpR-gLtEX0',
    {
      id: 'PpR-gLtEX0',
      title: 'New second note',
      body: 'This is a new note from me',
      isDeleted: false,
      deletedAt: null,
      user: {
        id: 'afadf333',
        email: 'new@yahoo.com',
        username: 'new1',
      },
    },
  ],
  [
    'BIdqeEi8Gx',
    {
      id: 'BIdqeEi8Gx',
      title: 'New third note',
      body: 'This is a third new note from me',
      isDeleted: false,
      deletedAt: null,
      user: {
        id: 'afadf333',
        email: 'new@yahoo.com',
        username: 'new1',
      },
    },
  ],
]);
export const handlers = [
  graphql.query('GetNotes', () => {
    return HttpResponse.json({
      data: {
        getNotes: Array.from(allNotes.values()),
      },
    });
  }),

  graphql.query('GetNote', ({ variables }) => {
    const { id } = variables;
    const note = allNotes.get(id);

    if (note) {
      return HttpResponse.json({
        data: {
          getNote: note,
        },
      });
    } else {
      return HttpResponse.json({
        errors: [{ message: 'Note not found' }],
      });
    }
  }),

  graphql.mutation('CreateNote', ({ variables }) => {
    const { id, title, body } = variables;

    const newNote = {
      id,
      title,
      body,
      isDeleted: false,
      deletedAt: null,
      user: {
        id: 'afadf333',
        email: 'new@yahoo.com',
        username: 'new1',
      },
    };

    allNotes.set(id, newNote);
    return HttpResponse.json({
      data: {
        createNote: newNote,
      },
    });
  }),
];
