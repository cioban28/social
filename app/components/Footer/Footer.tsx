import React from 'react';
import './styles.scss';

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const Footer = (props: Props) => {
  return (
    <footer {...props}>
      <div className="footer-row">
        <a href="https://vuukle.com/">about</a>
        <a href="https://docs.vuukle.com/">support</a>
        <a href="https://blog.vuukle.com/">blog</a>
        <a href="https://vuukle.com/terms.html">privacy</a>
        <a href="https://vuukle.com/terms.html">terms</a>
      </div>
      <div className="footer-row">
        <span className="copyright">&copy; {`${new Date().getFullYear()} VUUKLE`}</span>
      </div>
    </footer>
  );
};

export default Footer;
