import React, {Component} from 'react';
import {Link} from 'react-router';

export default class AuctionEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentPrice: undefined
    };
    this.calcPrice = this.calcPrice.bind(this);
  }

  componentDidMount () {
    this.setState({
      currentPrice: '$  ' + this.calcPrice().toFixed(2),
      timeRemaing: this.calcTime()
    });
    setInterval(() => this.setState({
      currentPrice: '$  ' + this.calcPrice().toFixed(2),
      timeRemaing: this.calcTime()
    }), 1000);
    this.calcPrice = this.calcPrice.bind(this);
    this.calcTime = this.calcTime.bind(this);

  }

  calcPrice () {

    var cal = ((this.props.item.startPrice - this.props.item.endPrice) /
    ((Date.parse(this.props.item.endDate) + 2.592e+9) - Date.parse(this.props.item.startDate))) * (Date.parse(this.props.item.endDate) + 2.592e+9 - Date.now());
    return cal;
  }

  calcTime () {
    var duration = Date.parse(this.props.item.endDate) + 2.592e+9 - Date.now();
    var seconds = parseInt((duration / 1000) % 60);
    var minutes = parseInt((duration / (1000 * 60)) % 60);
    var hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    var days = parseInt(((duration) / (1000 * 60 * 60 * 24)) % 365);

    days = (days < 10) ? '0' + days : days;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return days + ' days  ' + hours + ':' + minutes + ':' + seconds + ' hours';
  }

  render () {
    var button;
    var id = '/item/' + this.props.item.id;
    return (
      <div className='auction-entry-container col-md'>
        <h3>{this.props.item.item.title || 'Sample Title'}</h3>
        <div>
          <img src={'http://www.officeshop.co.nz/shop/494-664-large/account-overdue-dixon-stamp.jpg'}></img>
        </div>
        <div>
          Current Price: <span>{this.state.currentPrice}</span>
        </div>
        <div>
          Time remaining: <span>{this.state.timeRemaing}</span>
        </div>
        { 
          button = this.props.auth() ? (
          <div>
            <Link className='btn btn-primary' to={id} > Bid </Link>
          </div>
          )
        : <div /> 
        }
        
      </div>
    );
  }
}