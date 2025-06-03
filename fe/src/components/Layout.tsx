import Navbar from './Navbar'
import '../styles/Layout.css'

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children } : LayoutProps ) => {
    return (
      <>
        <Navbar/>
        <main>
            {children}
        </main>
      </>
    );
  };

  export default Layout