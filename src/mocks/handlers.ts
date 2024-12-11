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

const allTodos = new Map([
  [
    'fa1gRLM79u',
    {
      id: 'fa1gRLM79u',
      title: 'Things to do today',
      body: 'Just a few things here and there.',
      updatedAt: '',
      priority: 'LOW',
      dueDate: '',
      user: {
        id: 'afadf333',
        email: 'new@yahoo.com',
        username: 'new1',
      },
    },
  ],
  [
    'bk2hTJN89x',
    {
      id: 'bk2hTJN89x',
      title: 'Grocery Shopping',
      body: 'Buy milk, eggs, and bread from the store.',
      updatedAt: '',
      priority: 'MEDIUM',
      dueDate: '2024-12-15',
      user: {
        id: 'bfgh1234',
        email: 'shopper@gmail.com',
        username: 'shopper2024',
      },
    },
  ],
  [
    'cx3iPLO67z',
    {
      id: 'cx3iPLO67z',
      title: 'Team Meeting',
      body: 'Prepare slides for the Q4 review meeting.',
      updatedAt: '2024-12-10',
      priority: 'HIGH',
      dueDate: '2024-12-12',
      user: {
        id: 'manager001',
        email: 'manager@work.com',
        username: 'teamlead',
      },
    },
  ],
  [
    'dz4kXYZ12v',
    {
      id: 'dz4kXYZ12v',
      title: 'Workout Routine',
      body: 'Plan a 30-minute cardio and strength training session.',
      updatedAt: '',
      priority: 'LOW',
      dueDate: '2024-12-14',
      user: {
        id: 'fitnessFan',
        email: 'fitlife@gmail.com',
        username: 'fitguru',
      },
    },
  ],
]);

const allPasswords = new Map([
  [
    'M7MbMwCXN0',
    {
      id: 'M7MbMwCXN0',
      fieldname: 'Telegram',
      username: 'telenova2',
      email: 'telenova@gmail.com',
      password: '123456',
      isDeleted: false,
      deletedAt: '',
      user: {
        email: 'telenova@gmail.com',
        username: 'telenova2',
      },
    },
  ],
  [
    'A2KjLqBX92',
    {
      id: 'A2KjLqBX92',
      fieldname: 'Facebook',
      username: 'fb_star99',
      email: 'fb_star99@gmail.com',
      password: 'password123',
      isDeleted: false,
      deletedAt: '',
      user: {
        email: 'fb_star99@gmail.com',
        username: 'fb_star99',
      },
    },
  ],
  [
    'Z9VpQrTY56',
    {
      id: 'Z9VpQrTY56',
      fieldname: 'Twitter',
      username: 'tweet_master',
      email: 'tweet_master@gmail.com',
      password: 'tw33tmaster',
      isDeleted: true,
      deletedAt: '2024-12-01',
      user: {
        email: 'tweet_master@gmail.com',
        username: 'tweet_master',
      },
    },
  ],
  [
    'L5HnJkCW03',
    {
      id: 'L5HnJkCW03',
      fieldname: 'Instagram',
      username: 'insta_queen',
      email: 'instaqueen@gmail.com',
      password: 'insta$ecure',
      isDeleted: false,
      deletedAt: '',
      user: {
        email: 'instaqueen@gmail.com',
        username: 'insta_queen',
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

  graphql.query('GetTodos', () => {
    return HttpResponse.json({
      data: {
        getTodos: Array.from(allTodos.values()),
      },
    });
  }),

  graphql.query('GetTodo', ({ variables }) => {
    const { id } = variables;
    const todo = allTodos.get(id);
    if (todo) {
      return HttpResponse.json({
        data: {
          getTodo: todo,
        },
      });
    } else {
      return HttpResponse.json({
        errors: [{ message: 'Todo not found' }],
      });
    }
  }),

  graphql.query('GetPasswords', () => {
    return HttpResponse.json({
      data: {
        getPasswordFields: Array.from(allPasswords.values()),
      },
    });
  }),

  graphql.query('getPassword', ({ variables }) => {
    const { id } = variables;
    const password = allPasswords.get(id);
    if (password) {
      return HttpResponse.json({
        data: {
          getPasswordField: password,
        },
      });
    } else {
      return HttpResponse.json({
        errors: [{ message: 'Password not found' }],
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
