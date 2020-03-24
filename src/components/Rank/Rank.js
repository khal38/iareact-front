import React from "react";

// I pass two props to update the Rank:
const Rank = ({name, entries}) => {
  
  return (
    <div>
      {`${name} , your current entry count is...`}
      <div className='white f1 '>
        {entries}
      </div>
    </div>
  );
};

export default Rank;
