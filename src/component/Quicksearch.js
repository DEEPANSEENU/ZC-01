import React from 'react';
import Quicksearchitem from './Quicksearchitem';

class Quicksearch extends React.Component {
  render() {
    const {quicksearchdata} = this.props;
    return (
      <div>
        <div className="bottomSection container">
          <h1 className="qs-heading">Quick Search</h1>
          <h3 className="qs-subheading">Discover restaurants by type of meal</h3>
          <div className="qs-boxes-container row">

          {
            quicksearchdata.map((item)=>{
              return <Quicksearchitem quicksearchitemdata={item}/>
            })
          }

          </div>
        </div>
      </div>
    );
  }
}

export default Quicksearch;
