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
      isDeleted: true,
      deletedAt: '2024-12-16',
      user: {
        id: 'afadf333',
        email: 'new@yahoo.com',
        username: 'new1',
      },
    },
  ],
  [
    '657bwclZg-',
    {
      id: '657bwclZg-',
      title: 'New fourth note',
      body: 'This is a fourth new note from me',
      isDeleted: true,
      deletedAt: '2024-12-15',
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
      isDeleted: false,
      deletedAt: '',
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
      isDeleted: false,
      deletedAt: '',
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
      isDeleted: true,
      deletedAt: '2023-12-16',
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
      isDeleted: false,
      deletedAt: '',
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

const initialUsers = new Map([
  [
    '',
    {
      id: '',
      email: '',
      username: '',
    },
  ],
]);

const users = [
  { id: 'EiyRGZTh2B', email: 'new1@gmail.com', password: 'new121kk2' },
  { id: 'YJ8USol2Va', email: 'new2@gmail.com', password: 'new11234343' },
  { id: '5k7fUFQcmR', email: 'new3@gmail.com', password: 'new33534343' },
];

export const handlers = [
  graphql.query('GetNotes', ({ variables }) => {
    const { isDeleted } = variables;
    const filteredNotes = Array.from(allNotes.values()).filter(
      (note) => note.isDeleted === isDeleted
    );

    return HttpResponse.json({
      data: {
        getNotes: filteredNotes,
      },
    });
  }),

  graphql.mutation('LoginUser', ({ variables }) => {
    const { email, password } = variables;

    const verifiedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (verifiedUser) {
      return HttpResponse.json({
        data: {
          loginUser: verifiedUser,
        },
      });
    }

    if (!verifiedUser) {
      return HttpResponse.json(
        {
          errors: [{ message: 'Invalid credentials' }],
        },
        { status: 401 }
      );
    }
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

  graphql.query('GetTodos', ({ variables }) => {
    const { isDeleted } = variables;
    const filteredTodos = Array.from(allTodos.values()).filter(
      (todo) => todo.isDeleted === isDeleted
    );
    return HttpResponse.json({
      data: {
        getTodos: filteredTodos,
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

  graphql.query('GetPasswords', ({ variables }) => {
    const { isDeleted } = variables;
    const filteredPasswords = Array.from(allPasswords.values()).filter(
      (password) => password.isDeleted === isDeleted
    );
    return HttpResponse.json({
      data: {
        getPasswordFields: filteredPasswords,
      },
    });
  }),

  graphql.query('CurrentUser', () => {
    return HttpResponse.json({
      data: {
        currentUser: Array.from(initialUsers.values()),
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

  graphql.query('GetDeletedItems', ({ variables }) => {
    const { isDeleted } = variables;
    const filteredNotes = Array.from(allNotes.values()).filter(
      (note) => note.isDeleted === isDeleted
    );

    const filteredTodos = Array.from(allTodos.values()).filter(
      (todo) => todo.isDeleted === isDeleted
    );

    const filteredPasswords = Array.from(allPasswords.values()).filter(
      (password) => password.isDeleted === isDeleted
    );

    return HttpResponse.json({
      data: {
        getNotes: filteredNotes,
        getTodos: filteredTodos,
        getPasswordFields: filteredPasswords,
      },
    });
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

  graphql.mutation('CreateUser', ({ variables }) => {
    const { id, email, username, password } = variables;

    const isDuplicate = Array.from(initialUsers.values()).some(
      (user) => user.email === email
    );

    if (isDuplicate) {
      return HttpResponse.json({
        errors: [
          {
            message: 'Email already exists',
            extensions: { code: 'DUPLICATE_EMAIL' },
          },
        ],
      });
    }

    const newUser = {
      id,
      email,
      username,
      password,
    };

    initialUsers.set(id, newUser);
    return HttpResponse.json({
      data: {
        createUser: newUser,
      },
    });
  }),

  graphql.mutation('LogoutUser', () => {
    return HttpResponse.json({
      data: {
        logoutUser: true,
      },
    });
  }),

  graphql.mutation('RestoreNote', ({ variables }) => {
    const { id } = variables;

    const isNoteAvailable = Array.from(allNotes.values()).find(
      (note) => note.id === id
    );

    if (!isNoteAvailable) {
      return HttpResponse.json({
        errors: [{ message: 'Note not found' }],
      });
    }

    if (!isNoteAvailable.isDeleted) {
      return HttpResponse.json({
        errors: [{ message: 'Note is not in deleted state' }],
      });
    }

    const restoredNote = {
      ...isNoteAvailable,
      isDeleted: false,
      deletedAt: null,
      updatedAt: new Date().toISOString(),
    };

    allNotes.set(id, restoredNote);

    return HttpResponse.json({
      data: {
        restoreNote: restoredNote,
      },
    });
  }),

  graphql.mutation('RestoreTodo', ({ variables }) => {
    const { id } = variables;

    const isTodoAvailable = Array.from(allTodos.values()).find(
      (todo) => todo.id === id
    );

    if (!isTodoAvailable) {
      return HttpResponse.json({
        errors: [{ message: 'Todo not found' }],
      });
    }

    if (!isTodoAvailable.isDeleted) {
      return HttpResponse.json({
        errors: [{ message: 'Todo is not in deleted state' }],
      });
    }

    const restoredTodo = {
      ...isTodoAvailable,
      isDeleted: false,
      deletedAt: '',
      updatedAt: new Date().toISOString(),
    };

    allTodos.set(id, restoredTodo);

    return HttpResponse.json({
      data: {
        restoreTodo: restoredTodo,
      },
    });
  }),
  
  graphql.mutation('RestorePassword', ({ variables }) => {
    const { id } = variables;

    const isPasswordAvailable = Array.from(allPasswords.values()).find(
      (password) => password.id === id
    );

    if (!isPasswordAvailable) {
      return HttpResponse.json({
        errors: [{ message: 'Password not found' }],
      });
    }

    if (!isPasswordAvailable.isDeleted) {
      return HttpResponse.json({
        errors: [{ message: 'Password is not in deleted state' }],
      });
    }

    const restoredPassword = {
      ...isPasswordAvailable,
      isDeleted: false,
      deletedAt: '',
      updatedAt: new Date().toISOString(),
    };

    allPasswords.set(id, restoredPassword);

    return HttpResponse.json({
      data: {
        restorePassword: restoredPassword,
      },
    });
  }),
];
