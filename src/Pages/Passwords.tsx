import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import PasswordInput from '../Components/PasswordInput';
import PasswordsList from '../Components/PasswordsList';
import usePasswords from '../context/usePassword';

export default function Passwords() {
  const { id } = useParams();
  const { fetchPassword } = usePasswords();

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
      {/* <CreatePasswords/> */}
      <PasswordInput />
      <PasswordsList />
      <Footer />
    </div>
  );
}
