const formatYearMonth = (date) => {
   const year = date.getFullYear();
   let month = date.getMonth() + 1;
   month = month < 10 ? `0${month}` : `${month}`;

   return `${year}-${month}`;
};

const formatYearMonthDay = (date) => {
   const year = date.getFullYear();
   let month = date.getMonth() + 1;
   let day = date.getDate() + 1;

   day = day < 10 ? `0${day}` : `${day}`;
   month = month < 10 ? `0${month}` : `${month}`;

   return `${year}-${month}-${day}`;
};

export { formatYearMonth, formatYearMonthDay };
