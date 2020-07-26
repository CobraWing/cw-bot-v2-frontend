import React from 'react';

import { FooterContent } from './styles';

const Footer: React.FC = () => {
  return (
    <FooterContent>
      <p>
        Copyright ©
        <a
          href="http://discord.io/cobrawing"
          target="_blank"
          rel="noopener noreferrer"
          title="Acesse o discord da Cobra Wing"
        >
          Cobra Wing
        </a>
        - 2020 | develop by
        <span>
          <a
            href="https://github.com/rafaelpivatto"
            target="_blank"
            rel="noopener noreferrer"
          >
            PivattØ
          </a>
        </span>
      </p>
    </FooterContent>
  );
};

export default Footer;
