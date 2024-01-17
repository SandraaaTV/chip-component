// ChipComponent.js
import React, { useState, useEffect, useRef } from 'react';
import './ChipComponent.css';

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);

  const items = [
    { text: 'Item 1', image: 'https://picsum.photos/id/1/200/300' },
    { text: 'Item 2', image: 'https://picsum.photos/id/73/200/300' },
    { text: 'Item 3', image: 'https://picsum.photos/id/26/200/300' },
    { text: 'Item 4', image: 'https://picsum.photos/id/41/200/300' },
    { text: 'Item 5', image: 'https://picsum.photos/id/57/200/300' },
  ];

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === '') {
      setFilteredItems([]);
    } else {
      const filtered = items.filter((item) =>
        item.text.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setFilteredItems(filteredItems.filter((i) => i !== item));
    setInputValue('');
    inputRef.current.focus();
  };

  const handleChipRemove = (chip) => {
    setChips(chips.filter((item) => item !== chip));
    setFilteredItems([...filteredItems, chip]);
    inputRef.current.focus();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!inputRef.current.contains(event.target)) {
        setFilteredItems([]);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="chip-container">
      <div className="chips">
        {chips.map((chip, index) => (
          <div key={index} className="chip">
            <img src={chip.image} alt={chip.text} className="profile-pic" />
            {chip.text}{' '}
            <span className="chip-remove" onClick={() => handleChipRemove(chip)}>
              X
            </span>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type to search..."
      />
      <ul className="item-list">
        {filteredItems.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            <img src={item.image} alt={item.text} className="profile-pic" />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChipComponent;
