import React from 'react';

export default function YearMonth({
  comboList,
  currentYearMonth,
  handleYearMonthChange,
}) {
  function convertStringMonth(item) {
    let index = item.substring(5, 7);
    //prettier-ignore
    const months = [
      'Jan','Fev','Mar','Abr','Mai','Jun',
      'Jul','Ago','Set','Out','Nov','Dez',
    ];

    let month = months[index - 1];
    let year = item.substring(0, 4);

    return `${year}/${month}`;
  }

  return (
    <div className="input-field col s12" style={css.flexRowStyle}>
      <button className="waves-effect waves-light btn">&lt;</button>

      <select
        className="browser-default"
        style={css.select}
        onChange={handleYearMonthChange}
        defaultValue={convertStringMonth(currentYearMonth)}
      >
        {comboList.map((item, index) => {
          return <option key={index}>{convertStringMonth(item)}</option>;
        })}
      </select>

      <button className="waves-effect waves-light btn">&gt;</button>
    </div>
  );
}

const css = {
  flexRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: { width: '150px', height: '37px', margin: '4px' },
};
