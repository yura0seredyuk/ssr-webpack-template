import React from 'react';
import i18n from '../../../../language/i18n';
import styles from './LanguageToggle.module.scss';

function LanguageToggle () {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div className={styles.root}>
      <button type='button' onClick={() => changeLanguage('ua')}>ua</button>
      <button type='button' onClick={() => changeLanguage('ru')}>ru</button>
      <button type='button' onClick={() => changeLanguage('en')}>en</button>
    </div>
  )
}

export default LanguageToggle;
