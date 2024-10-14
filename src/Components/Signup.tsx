import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useAuth from '../context/useAuth';
import { createSignupSchema, CreateSignupSchema } from '../util/types';
import Button from './Button';
import styles from './Signup.module.css'

interface SigninCredentials {
  email: string;
  username: string;
  password: string;
}

export default function Signup() {
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
      username: data.username,
    };
    try {
      await createAuth(signinCredentials);
    } catch (error) {
      console.error(error);
    }
  };
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
          <Button disabled={isSubmitting}>Sign in</Button>
        </div>
        <div className={styles.forgotPassword}>
          Forgot NotePod <span>Password?</span>
        </div>
        <div className={styles.signup}>
          New to NotePod? <span>Sign up</span>
        </div>
      </form>
    </div>
  );
}
