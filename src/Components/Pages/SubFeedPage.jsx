import React from 'react';
import fingerImage from '../../assets/image_2408.svg'

const SubfeedMessage = () => {
  return (
    <div className='subfeed-container'>
    <div className="subfeed">
      <p className="text-[16px] text-[#888888] font-[500]">This page is private or not available anymore..</p>
      <div className='subfeed-center'>
      <div className="my-6">
      <img src={fingerImage} alt='' height={'auto'} width={'auto'} />
      </div>
      <h2 className="text-[24px] font-[700]">Subfeed</h2>
      <button className="openappbtn mt-4 bg-[#0085FF] border-[none] px-6 py-2 text-white rounded-full hover:bg-blue-600">
        OPEN APP
      </button>
      </div>
    </div>
    </div>
  );
};

export default SubfeedMessage;
