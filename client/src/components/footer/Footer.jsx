import React from 'react'
import Style from "../footer/footer.module.css";


function Footer() {
  return (
    <footer className={Style.footer}>
      <div className={Style.iconContainer}>
        <a href="https://linkedin.com/in/nicolás-alberto-cuello-16100a25a" target="_blank" rel="noopener noreferrer">
          <img src="../../../public/icons8-linkedin.svg" alt="LinkedIn" className={Style.icon} />
        </a>
      </div>
      <div className={Style.iconContainer}>
        <a href="https://github.com/NicolasCuello74" target="_blank" rel="noopener noreferrer">
          <img src="./../../public/icons8-github.svg" alt="GitHub" className={Style.icon} />
        </a>
      </div>
      <div className={Style.iconContainer}>
        <a href="https://wa.me/3516575438" target="_blank" rel="noopener noreferrer">
          <img src="./../../public/icons8-whatsapp.svg" alt="WhatsApp" className={Style.icon} />
        </a>
      </div>
    </footer>
  )
}

export default Footer;