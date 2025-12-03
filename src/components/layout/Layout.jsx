//src/components/layout/layout.jsx

import { Outlet} from 'react-router';
import Header from './Header';
// import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header /> {/* This is sticky top-0 */}
      <main className="grow">
        <Outlet /> {/* TopIconNav is inside here, so it scrolls under the header */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;