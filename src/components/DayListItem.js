import React from 'react';
import classNames from 'classnames';

import './DayListItem.scss';

export default function DayListItem(props) {
  const spots = props.spots;
  const formatSpots = (spots) => {
    if (spots === 1) {
      return `${spots} spot ` 
    }
    if (spots > 1) {
      return `${spots} spots `
    }
    return `no spots `
  }
  
  const dayClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0});
  

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="test--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(spots)}remaining</h3>

    </li>
  );
}