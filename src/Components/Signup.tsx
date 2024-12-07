import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Slide, toast } from 'react-toastify';
import useAuth from '../hook/useAuth';
import useSafeNavigate from '../hook/useSafeNavigate';
import { createSignupSchema, CreateSignupSchema } from '../util/types';
import Button from './Button';
import Signin, { destinationProps } from './Signin';
import styles from './Signup.module.css';

interface SignUpCredentials {
  email: string;
  username: string;
  password: string;
}

export default function Signup({ destination }: destinationProps) {
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
  const navigate = useSafeNavigate();

  const onSubmit = async (data: CreateSignupSchema) => {
    const signupCredentials: SignUpCredentials = {
      email: data.email,
      password: data.password,
      username: data.username,
    };
    try {
      await createAuth(signupCredentials);
      toast.success(`Hey, Welcome! ✅`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        theme: 'light',
        transition: Slide,
        hideProgressBar: false,
      });
      navigate(destination === 'notes' ? '/notes' : '/todos');
    } catch (error) {
      console.error(error);
      let errorMessage = 'An Error Occured during signup';
      if (error instanceof Error) {
        switch (error.message) {
          case 'EMAIL_EXISTS':
            errorMessage =
              'This email is already in use. Please use a different email or signin with this email';
            break;
          case 'USERNAME_EXISTS':
            errorMessage =
              'This username is already in use. Please use a different username or signin.';
            break;

          case 'INVALID_USERNAME':
            errorMessage = 'Please enter a valid username.';
            break;
          case 'ALREADY_AUTHENTICATED':
            errorMessage = 'You are already logged in.';
            break;
          case 'INVALID_INPUT':
            errorMessage = 'Please check your input and try again.';
            break;
          case 'UNKNOWN_ERROR':
            errorMessage = 'An unknown error occurred. Please try again later.';
            break;
          default:
            errorMessage = error.message;
            break;
        }
      }
      toast.error(errorMessage, {
        position: 'top-left',
        autoClose: 5000,
        closeOnClick: true,
        theme: 'light',
        transition: Slide,
        hideProgressBar: false,
      });
    }
  };

  if (showSignin) {
    return <Signin destination={destination} />;
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
