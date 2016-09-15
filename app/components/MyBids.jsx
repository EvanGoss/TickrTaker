import React, {Component} from 'react';
import Listing from './Listing.jsx';

export default class MyBids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsBidOn: [],
    };
  }

  componentDidMount() { // Retrieve user data form, show items seller items on dashboard page
    var context = this;
    $.ajax({
      method: 'GET',
      url: 'api/user_data',
      success: function(user) {
        console.log('MyBids username:', user.user.firstName + ' ' + user.user.lastName);
        $.ajax({ // Retrieve data to show user's winning and losing bid on dashboard page
          method: 'POST',
          url: 'api/bids',
          headers: {'Content-Type': 'application/json'},
          data: JSON.stringify(user),
          success: function(auctionItems) {
            context.setState({
              'itemsBidOn': auctionItems,
            });
            console.log('itemsBidOn:', auctionItems);
            context.render();
          },
          error: function(err) {
            console.log(err);
          }
        });
      }
    });
  }

  setWinningLosing(auctionItem){
    if (auctionItem.myBid.price === auctionItem.highestBid) {
      return 'winning';
    } else {
      return 'losing';
    }
  };

  render() {
    return (
      <div>
        <div className="col-sm-12 bid-container">
          {this.state.itemsBidOn.map((auctionItem, index) => {
            {console.log(auctionItem)}
            return (
              <Listing
                key={index} parity={index % 2}
                status={this.setWinningLosing(auctionItem)}
                auctionEnded={new Date() >= auctionItem.auctionEndDateByHighestBid}
                item={auctionItem}
                auth={this.props.auth} // NOT WORKING!!!
              />
            );
          })}
        </div>
      </div>
    );
  }
}