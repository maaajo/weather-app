import React from 'react';
import { getLocalTime } from '../Utils/Utils';
import { translation } from '../Base/Constants';

const Badge = ({ language, timezone, time, iconSrc, alt }) => {
  return (
    <div className="flex justify-center items-center badge p-1 sm:mr-4 lg:p-2">
      <img className="w-10 h-10 mr-1" src={iconSrc} alt={alt} />
      <p className="text-sm lg:text-base">
        {translation[`${alt}-${language}`]}: {getLocalTime(timezone, time)}
      </p>
    </div>
  );
};

export default Badge;
