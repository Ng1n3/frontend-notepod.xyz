import { createSigninSchema } from '../../util/types';

describe('Sigin schema validation', () => {
  it('should validate a correct signin input', () => {
    const userInput = {
      email: 'new1@gmail.com',
      password: 'new121kk2',
    };

    expect(() => createSigninSchema.parse(userInput)).not.toThrow();
  });

  it('should fail if password is too short', () => {
    const userInput = {
      email: 'new1@gmail.com',
      password: 'asd',
    };

    expect(() => createSigninSchema.parse(userInput)).toThrow(
      'Password must be at least 4 characters'
    );
  });

  it('should fail if email is invalid', () => {
    const userInput = {
      email: 'new--dafdad',
      password: 'asdfasdfsdf'
    }

    expect(() => createSigninSchema.parse(userInput)).toThrow('Invalid email')
  })
});
