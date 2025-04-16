import { PropsWithChildren } from "react";
import styles from './Header.module.scss';

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <h1>PartyShark</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        <hr />
      </div>
      {children}
    </header>
  );
}

export default Header;