import React from 'react';
import '../Footer/Footer.css'


const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="footer">
            <footer>
                <p>Copyright© {currentYear} Ankur Vasani. All Rights Reserved.</p>
                <p><a href="https://www.linkedin.com/in/ankurmvasani" target="_blank"><i className="fab fa-linkedin fa-2x"></i></a> Connect With Me</p>
            </footer>
        </div>        
    );
};

export default Footer;
