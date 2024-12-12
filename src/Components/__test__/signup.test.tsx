import { createSignupSchema } from '../../util/types';

describe('Signup schema validation', () => {
  it('should validate a correct signup input', () => {
    const userDetails = {
      email: 'new22@gmail.com',
      password: 'new_23345',
      username: 'new_22m4g',
    };

    expect(() => createSignupSchema.parse(userDetails)).not.toThrow();
  });

  it('should fail when the password is too short', () => {
    const userDetails = {
      email: 'new22@gmail.com',
      password: '123',
      username: 'new_22m4g',
    };

    expect(() => createSignupSchema.parse(userDetails)).toThrow(
      'Password must be at least 5 characters'
    );
  });

  it('Should fail if email is invalid', () => {
    const userDetails = {
      email: 'invite-mebruv',
      password: '1234567',
      username: 'new_224mg',
    };

    expect(() => createSignupSchema.parse(userDetails)).toThrow(
      'Invalid email'
    );
  });

  it('Should fail if username is too short', () => {
    const userDetails = {
      email: 'yourmail@gmail.com',
      password: '1234567',
      username: 'new',
    };

    expect(() => createSignupSchema.parse(userDetails)).toThrow(
      'username must be at least 4 characters'
    );
  });
});
