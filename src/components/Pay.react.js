/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var DropDownMenu = mui.DropDownMenu;

var currencyItems = [
    { payload: '1', text: 'EUR' }
];

var Pay = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Contribute to event {this.props.eventname}</h1>
                <p>This event has been created by {this.props.creator}. The total requested amount is
                    {this.props.totalamount} {this.props.currency} of which
                    {this.props.openamount} {this.props.currency} are still open</p>
                <TextField defaultValue="0,00"/>
                <DropDownMenu menuItems={currencyItems}/>
                <RaisedButton label="Pay!" primary={true}/>
            </div>
        );
    }
});

module.exports = Pay;
