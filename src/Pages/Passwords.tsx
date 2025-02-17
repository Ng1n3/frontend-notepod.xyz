import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import NotAllowed from '../Components/NotAllowed';
import PasswordInput from '../Components/PasswordInput';
import PasswordsList from '../Components/PasswordsList';
import {useAuth} from '../hook/useAuth';
import usePasswords from '../hook/usePassword';

export default function Passwords() {
  const { id } = useParams();
  const { fetchPassword } = usePasswords();
  const { currentAuth } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          await fetchPassword(id);
        } catch (error) {
          console.error('error fetching passwords', error);
        }
      }
    }
    fetchData();
  }, [id, fetchPassword]);

  return (
    <div>
      <Header />

      {currentAuth ? (
        <>
          <PasswordInput />
          <PasswordsList />
        </>
      ) : (
        <NotAllowed />
      )}
      <Footer />
    </div>
  );
}
