import React, { useEffect } from 'react';
import CategorySelection from './category/categorySelection';
import SortByOption from './sortBy/sortBy';

export default function Filters(props) {
  useEffect(() => {
    console.log(props);
  }, [props]);
  return (
    <div style={{ display: 'flex' }}>
      <SortByOption updateState={props.updateState} tasks={props.tasks} />
      <CategorySelection
        categoryList={props.categoryList}
        updateState={props.updateState}
        category={props.category}
      />
    </div>
  );
}
