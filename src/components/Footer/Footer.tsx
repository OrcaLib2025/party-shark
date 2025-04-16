import React from "react";

interface FooterProps {
    children: React.ReactNode,
}

export const Footer: React.FC<FooterProps>=({children}) => {
    return(
        <footer>
            <p>&copy; {new Date().getFullYear()} Your Website Name</p>
            {children}
        </footer>
    );
}

export default Footer;
