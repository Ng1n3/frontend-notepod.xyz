import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Password } from '../context/passwordContext/';
import { useAuth } from '../hook/useAuth';
import usePasswords from '../hook/usePassword';
import { createPasswordSchema, CreatePasswordSchema } from '../util/types';
import Button from './Button';
import styles from './PasswordInput.module.css';
import Spinner from './Spinner';

function PasswordInput() {
  const {
    createPassword,
    error,
    currentPassword,
    updatePassword,
    isLoading,
    setCurrentPassword,
    clearCurrentPassword,
  } = usePasswords();
  const { currentAuth } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePasswordSchema>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      fieldname: '',
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (currentPassword && Object.keys(currentPassword).length > 0) {
      setValue('fieldname', currentPassword.fieldname || '');
      setValue('username', currentPassword.username || '');
      setValue('password', currentPassword.password || '');
      setValue('email', currentPassword.email || '');
    } else {
      reset();
    }
  }, [currentPassword, setValue, reset]);

  if (isLoading) return <Spinner />;

  const onSubmit = async (data: CreatePasswordSchema) => {
    try {
      const newPassword: Password = {
        fieldname: data.fieldname,
        email: data.email,
        username: data.username,
        password: data.password,
        userId: currentAuth!.id,
      };

      // console.log("the new password", newPassword);

      if (currentPassword) {
        await updatePassword({
          ...currentPassword,
          ...newPassword,
          id: currentPassword.id,
        });
        setCurrentPassword(null);
        reset();
        clearCurrentPassword();
      } else {
        await createPassword(newPassword);
        setCurrentPassword(null);
        reset();
        clearCurrentPassword();
      }
    } catch {
      console.error(error);
    }
  };
  const isEditing = currentPassword && Object.keys(currentPassword).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.passwordBody}>
        <header className={styles.header}>
          <h1>{isEditing ? 'Edit Password' : 'Add Password'}</h1>
          <Button disabled={isSubmitting}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </header>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <input
              {...register('fieldname', {
                required: 'Field Name is required',
                minLength: {
                  value: 1,
                  message: 'fieldname must be at least 1 character',
                },
              })}
              type="text"
              placeholder="field name"
            />
            {errors.fieldname && <p>{`${errors.fieldname?.message}`}</p>}
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

export default React.memo(PasswordInput);
