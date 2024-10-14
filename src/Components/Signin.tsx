import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useAuth from '../context/useAuth';
import { createSignupSchema, CreateSignupSchema } from '../util/types';
import Button from './Button';
import styles from './Signup.module.css';
import Signup from './Signup';
import { useState } from 'react';

interface SigninCredentials {
  email: string;
  password: string;
}

export default function Signin() {
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
    },
  });
  const { createAuth } = useAuth();

  const onSubmit = async (data: CreateSignupSchema) => {
    const signinCredentials: SigninCredentials = {
      email: data.email,
      password: data.password,
    };
    try {
      await createAuth(signinCredentials);
    } catch (error) {
      console.error(error);
    }
  };

  if (showSignin) {
    return <Signup />;
  }

  return (
    <div className={styles.body}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>Sign in to you Notepod account</header>
        <div>
          <div className={styles.input}>
            <input {...register('email')} type="text" placeholder="Email" />
            {errors.email && <p>{`${errors.email?.message}`}</p>}
          </div>
          <div className={styles.input}>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p>{`${errors.password?.message}`}</p>}
          </div>
          <Button disabled={isSubmitting}>Sign in</Button>
        </div>
        <div className={styles.forgotPassword}>
          Forgot NotePod <span>Password?</span>
        </div>
        <div className={styles.signup}>
          New to NotePod?{' '}
          <span onClick={() => setShowSignin(true)}>Sign up</span>
        </div>
      </form>
    </div>
  );
}
