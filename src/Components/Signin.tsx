import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hook/useAuth';
import { createSigninSchema, CreateSigninSchema } from '../util/types';
import Button from './Button';
import Footer from './Footer';
import Header from './Header';
import Signup from './Signup';
import styles from './Signup.module.css';

interface SigninCredentials {
  email: string;
  password: string;
}

export interface destinationProps {
  destination: 'notes' | 'todos';
}

export default function Signin({ destination }: destinationProps) {
  const [showSignin, setShowSignin] = useState(false);
  const { loginAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateSigninSchema>({
    resolver: zodResolver(createSigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: CreateSigninSchema) => {
    const signinCredentials: SigninCredentials = {
      email: data.email,
      password: data.password,
    };
    try {
      await loginAuth(signinCredentials);
      toast.success(`Hey, Welcome back! ✅`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        theme: 'light',
        transition: Slide,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error(error);
      let errorMessage = 'Incorrect Credentials please try again';

      if (error instanceof Error) {
        switch (error.message) {
          case 'INVALID_CREDENTIALS':
            errorMessage = 'Invalid email or password. Please try again';
            break;
          case 'NOT_AUTHORIZED':
            errorMessage = 'You are already logged in.';
            break;
          default:
            errorMessage = error.message;
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
    return <Signup destination={destination} />;
  }

  return (
    <>
      <Header />
      <div className={styles.body}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <header>Signin to use Notepod</header>
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
      <Footer />
    </>
  );
}
