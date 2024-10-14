import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../context/useAuth';
import { createSignupSchema, CreateSignupSchema } from '../util/types';
import Button from './Button';
import Signin from './Signin';
import styles from './Signup.module.css';

interface SignUpCredentials {
  email: string;
  username: string;
  password: string;
}

export default function Signup() {
  const [showSignin, setShowSignin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateSignupSchema>({
    resolver: zodResolver(createSignupSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });
  const { createAuth } = useAuth();

  const onSubmit = async (data: CreateSignupSchema) => {
    const signinCredentials: SignUpCredentials = {
      email: data.email,
      password: data.password,
      username: data.username,
    };
    try {
      await createAuth(signinCredentials);
    } catch (error) {
      console.error(error);
    }
  };

  if (showSignin) {
    return <Signin />;
  }

  return (
    <div className={styles.body}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>Create your Notepod account</header>
        <div>
          <div className={styles.input}>
            <input {...register('email')} type="text" placeholder="Email" />
            {errors.email && <p>{`${errors.email?.message}`}</p>}
          </div>
          <div className={styles.input}>
            <input
              {...register('username')}
              type="text"
              placeholder="Username"
            />
            {errors.username && <p>{`${errors.username?.message}`}</p>}
          </div>
          <div className={styles.input}>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p>{`${errors.password?.message}`}</p>}
          </div>
          <Button disabled={isSubmitting}>Sign up</Button>
        </div>
        <div className={styles.signup}>
          Already a NotePoder?{' '}
          <span onClick={() => setShowSignin(true)}>Sign in</span>
        </div>
      </form>
    </div>
  );
}
