import React, { FC } from 'react';
import Def from '../../../../model/widget/def/Def';
import './DefUI.scss';

type MyProps = {
  def: Def,
  onClick?: any,
};

const DefUI: FC<MyProps> = (props: MyProps) => {
  const { def } = props;
  const myOnClick = () => {
    const { onClick } = props;
    if (onClick) {
      onClick(def);
    }
  };
  return (
    <div
      className="widget-def-ui"
      title={def.name}
      onClick={myOnClick}
    >
      <img className="def-icon" src={def.icon} alt={def.name} />
      <div className="def-name">{def.name}</div>
    </div>
  );
};

export default DefUI;
