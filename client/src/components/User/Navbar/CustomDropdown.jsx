import React, { useState } from 'react';
import styles from './CustomDropdown.module.css';

const CustomDropdown = ({ options, onSelect, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.custom_dropdown} ${isOpen ? styles.open : ''}`}>
      <div className={styles.dropdown_header} onClick={toggleDropdown}>
        <span>{selectedOption}</span>
        {/* <i className={`${styles.arrow} ${isOpen ? styles.arrow_up : styles.arrow_down}`}>j</i> */}
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
