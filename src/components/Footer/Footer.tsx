import { PropsWithChildren } from "react";

export const Footer=({children}: PropsWithChildren) => {
    return(
        <footer>
            <p>&copy; {new Date().getFullYear()} Your Website Name</p>
            {children}
        </footer>
    );
}

export default Footer