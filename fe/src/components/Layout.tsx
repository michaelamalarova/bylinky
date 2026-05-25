import type { ReactNode } from 'react';
import Navbar from './Navbar'
import '../styles/Layout.css'

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children } : LayoutProps ) => {
    const sidebarItems = ['Mapa', 'Seznam bylin', 'Oleje', 'Parfémy', 'Tinktury', 'Čaje'];

    return (
      <>
        <Navbar/>
        <div className="page-shell">
          <aside className="sidebar" aria-label="Kategorie">
            <ul className="sidebar-list">
              {sidebarItems.map((item) => (
                <li key={item} className={`sidebar-item ${item === 'Mapa' ? 'active' : ''}`}>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
          <main>
              {children}
          </main>
        </div>
      </>
    );
  };

  export default Layout
