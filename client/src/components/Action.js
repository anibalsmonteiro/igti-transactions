import React from 'react';

export default function Action({
  type,
  id,
  currentTransaction,
  onActionClick,
}) {
  const handleIconClick = () => {
    onActionClick(id, type, currentTransaction);
  };

  return (
    <i
      className="material-icons"
      onClick={handleIconClick}
      style={{ cursor: 'pointer' }}
    >
      {type}
    </i>
  );
}
