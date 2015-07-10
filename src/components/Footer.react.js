/**
 * Created by kknauf on 16.06.15.
 */
'use strict';

var React = require('react');

var Footer = React.createClass({

    render: function () {

        return (<div id="footer">
                    <span style={{textAlign: "center"}}>
                        BlitzPay by <a href="http://www.tngtech.com/en/"> TNG Technology Consulting</a>. Also visit us on <a href="https://github.com/TNG/BlitzPay_Frontend">GitHub</a>.
                    </span>
        </div>);
    }
});

module.exports = Footer;
