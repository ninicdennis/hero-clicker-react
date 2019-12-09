import React from 'react';
import '../css/main.css'
class MainBoard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         gold: 0,
         click: 1,
         shop: {
            owned: 0,
            price: 10
         },
         guild: {
            owned: 0,
            price: 100
         },
         ironSword: {
            price: 10,
            upgrade: 1,
            isOwned: false
         }
      }
   };
// Interval start per second
   componentDidMount() {
      this.shopInterval = setInterval(() => this.setState({gold: this.state.gold + this.state.shop.owned * 1 }), 1000);
      this.guildInterval = setInterval(() => this.setState({gold: this.state.gold + this.state.guild.owned * 10 }), 2000);
    };

    componentWillUnmount() {
      clearInterval(this.shopInterval);
      clearInterval(this.guildInterval)
    };
// Interval ends

   addGold = (event) => {
      event.preventDefault()
      this.setState({gold: this.state.gold + this.state.click})
   };
// Purchasing Method
   buyShop = (event) => {
      event.preventDefault()
      if(this.state.gold < this.state.shop.price) {
         console.log('Not enough gold!')
      }
      else{
         this.setState({
            gold: this.state.gold - this.state.shop.price,
            shop: {  owned:this.state.shop.owned + 1,
                     price:Math.round(this.state.shop.price * 1.3)}
          })
         }
      };

   buyGuild = (event) => {
      event.preventDefault()
      if(this.state.gold < this.state.guild.price) {
         console.log('Not enough gold!')
      }
      else{
         this.setState({
            gold: this.state.gold - this.state.guild.price,
            guild:{ owned: this.state.guild.owned + 1 , price:Math.round(this.state.guild.price * 1.4)}
         })
      }
   };

   buyShopReady = () => {
      if(this.state.gold < this.state.shop.price) {
         return(
            <div>
               <button className = 'lowgold' onClick= {e => this.buyShop(e)}>Buy</button>
            </div>
         )
      }
      else return (
         <div>
            <button className='buybutton' onClick= {e => this.buyShop(e)}>Buy</button>
         </div>
      )
   };

   buyguildReady = () => {
      if(this.state.gold < this.state.guild.price) {
         return(
            <div>
               <button className = 'lowgold' onClick= {e => this.buyGuild(e)}>Buy</button>
            </div>
         )
      }
      else return (
         <div>
            <button className='buybutton' onClick= {e => this.buyGuild(e)}>Buy</button>
         </div>
      )
   };

   buyIronSword = (event) => {
      event.preventDefault()
      if(this.state.gold < this.state.ironSword.price) {
         console.log('Not enough gold!')
      }
      else if(this.state.ironSword.isOwned === true) {
         console.log('You already own this!')
      }

      else {
         this.setState({
            gold: this.state.gold - this.state.ironSword.price,
            click: this.state.click + this.state.ironSword.upgrade,
            ironSword: {upgrade: 2, isOwned: true}
         })
      }
   };

   buyIronSwordReady = () => {
      if(this.state.gold < this.state.ironSword.price) {
         return(
            <div>
               
               <div id = 'iron-sword-icon' onClick= {e => this.buyIronSword(e)}>Iron Sword</div>
            </div>
         )
      }
      else if(this.state.gold >= this.state.ironSword.price) {
         return(
         <div>
            <div id = 'iron-sword-icon' className = 'buybutton' onClick= {e => this.buyIronSword(e)}>Iron Sword</div>
         </div>
         )
      }
      else if(this.state.ironSword.isOwned === true) {
         return(
            <div>
               <div id = 'iron-sword-icon'>OWNED</div>
            </div>
         )
      }
   };

   render() {
      return(
         <div className = 'main'>
            <div onClick = {e => {this.addGold(e)}} className = 'clickybox'>
            </div>
            <h1>Gold: {this.state.gold}</h1>

            <h1>Upgrades</h1>
            <div className = 'buy'>
               <div className = 'bar'>
                  <div>
                     <h2>ShopKeep</h2>
                     <h3>Price: {this.state.shop.price}</h3>
                     <h4>Owned: {this.state.shop.owned}</h4>
                  </div>
                  {this.buyShopReady()}

               </div>

               <div className = 'bar'>
                  <div>
                     <h2>Guild</h2>
                     <h3>Price: {this.state.guild.price}</h3>
                     <h4>Owned: {this.state.guild.owned}</h4>
                  </div>
                  {this.buyguildReady()}
               </div>
            </div>
            <h1>Click Upgrades</h1>
            <div className = 'buy'>
               <div className = 'bar'>
                  {this.buyIronSwordReady()}
               </div>      
            </div>
         </div>
      )
   }
}

export default MainBoard;
