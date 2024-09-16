import DeletedBody from '../Components/DeletedPasswordBody';
import DeletedHeader from '../Components/DeletedHeader';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import DeletedNote from '../Components/DeletedNote';

export default function Deleted() {
  return (
    <div>
      <Header />
      <DeletedHeader/>
      <DeletedBody/>
      <DeletedNote/>
      <Footer/>
    </div>
  );
}
