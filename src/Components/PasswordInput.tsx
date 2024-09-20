import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { signUpSchema, SignupSchema } from '../util/types';
import Button from './Button';
import styles from './PasswordInput.module.css';

export default function PasswordInput() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signUpSchema),
  });

  function onSubmit(data: FieldValues) {
    console.log(data);
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.passwordBody}>
        <header className={styles.header}>
          <h1>Create a Password</h1>
          <Button disabled={isSubmitting}>Add Password</Button>
        </header>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <input
              {...register('field', {
                required: 'Field Name is required',
                minLength: {
                  value: 1,
                  message: 'fieldname must be at least 1 character',
                },
              })}
              type="text"
              placeholder="field name"
            />
            {errors.field && <p>{`${errors.field?.message}`}</p>}
          </div>
          <div className={styles.input}>
            <input
              {...register('username', {
                minLength: {
                  value: 5,
                  message:
                    'A minimum of five characters is required in this field.',
                },
              })}
              type="text"
              placeholder="username"
            />
            {errors.username && <p>{`${errors.username?.message}`}</p>}
          </div>
          <div className={styles.input}>
            <input {...register('email')} type="email" placeholder="email" />
            {errors.email && <p>{`${errors.email?.message}`}</p>}
          </div>
          <div className={styles.input}>
            <input
              {...register('password', {
                required: 'password or Passcode is required',
                minLength: {
                  value: 4,
                  message: 'Password or passcode must be at least 4 characters',
                },
              })}
              type="password"
              placeholder="password/keys"
            />
            {errors.password && <p>{`${errors.password?.message}`}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}
