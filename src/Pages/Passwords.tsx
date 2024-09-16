import CreatePasswords from '../Components/CreatePasswords';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import PasswordsList from '../Components/PasswordsList';

export default function Passwords() {
  return (
    <div>
      <Header />
      <CreatePasswords/>
      <PasswordsList/>
      <Footer/>
    </div>
  );
}
