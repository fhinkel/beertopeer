[![Build Status](https://travis-ci.org/knaufk/beertopeer.png?branch=master)](https://travis-ci.org/knaufk/beertopeer)

## BlitzPay

[http://blitzpay.biz](http://blitzpay.biz) (Login in with existing RippleTrade Accounts.)

Simple payments among groups (C2C) and to businesses (B2C) using your smartphone.  Real-time, cross-border, multi-currency, and low-cost by leveraging existing crypto currency technologies. 


**Winner of special prize for the highest economic impact by Bavarian Ministry of Economic Affairs and Media, Energy and Technology 
         at [http://www.burdahackday.de](http://www.burdahackday.de) episode 3: future of finance.**


*MVP*: A simple web app for ad hoc payments. One user can create an invoice event, others can join the event and pay him. Instant, real-time feedback is given about received payments. Users log in with their existing Ripple credentials. 

*Target group*: Individuals for paying and receiving money from friends; small businesses that want to receive secure payments at low cost in real-time. 

### Use Case

*C2C*: A group of co-workers orders take-out. One of them pays the delivery person and creates a new event. His coworkers join the event in BlitzPay and each one pays his share. Everybody sees the current total in real time and can pitch in more if they realize the numbers do not add up. 

*B2C*: At a restaurant, the waiter creates a payment event for the check, everybody at the table pays to this event with their smartphone. No long searching for change, no too large bills, the payment is fast and easy. Low fees for the restaurant. 

##Challenges & solutions
The rapid prototyping process includes a permanent danger of breaking the code. We used Continuous integration and Continuous Delivery, so we got instant feedback about any change and possible bugs.  

Instead of dealing with banking regulations and customer liquidity, we leverage crypto currency technologies. Our app is based on the Ripple payment network. Users do not need a separate account to use BlitzPay, they use their existing Ripple account. Ripple allows cross-currency transactions using automatic exchange between currencies stored in the Ripple account and any desired payment currency. All Ripple transactions are handled on the client side, no sensitive data is passed to our servers. 

Opportunity for banks to offer comfortable interface to their customers to fund their Ripple accounts. Currently supported by e.g., Fidor Bank AG, Wells Fargo, or Bank of America.

##Scalability

The current setup can easily handle fifteen thousand simultaneously active customers. Almost all operations are handled client-side. The involved components scale horizontally and can easily scale up to an arbitrary number of customers. 

## Code

*Technology*: We used JavaScript with react.js and Flux for the front-end and node.js for the back-end. The look and feel of the front-end builds on Material-UI. The handling of the ripple transaction was done using the ripple-lib API. Continuous delivery with TravisCI, deployment on DigitalOcean Cloud infrastructure. 

*Source code*: Front-end: https://github.com/knaufk/beertopeer
Back-end: https://github.com/fhinkel/backend

##Team

 [![http://www.tngtech.com/](http://www.tngtech.com/typo3conf/ext/kk_template/Resources/Public/Images/Logox2.gif)](http://www.tngtech.com/)

- Martin Kreidenweis (concept, front-end, Ripple API), @mkreidenweis
- Philip Schmitt (documentation, front-end), @maeh2k
- Steffen Rath (design, back-end)
- Konstantin Knauf (concept, design, front-end)
- Franziska Hinkelmann (back-end, infrastructure, continuous integration), @fhinkel



![BlitzPay](https://raw.githubusercontent.com/knaufk/beertopeer/master/resources/images/CreateEvent.png)
![BlitzPay](https://raw.githubusercontent.com/knaufk/beertopeer/master/resources/images/EventCreated2.png)
![BlitzPay](https://raw.githubusercontent.com/knaufk/beertopeer/master/resources/images/Join.png)
![BlitzPay](https://raw.githubusercontent.com/knaufk/beertopeer/master/resources/images/JoinUnknownEventCode.png)
![BlitzPay](https://raw.githubusercontent.com/knaufk/beertopeer/master/resources/images/LogoutBalance.png)
![BlitzPay](https://raw.githubusercontent.com/knaufk/beertopeer/master/resources/images/Pay.png)
![BlitzPay](https://raw.githubusercontent.com/knaufk/beertopeer/master/resources/images/ShowWithPayment.png)
