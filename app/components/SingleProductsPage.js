import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MultipleProductsContainer from '../containers/MultipleProductsContainer';
import Reviews from '../components/Reviews';

export default function SingleProductsPage (props) {

  const product = props.product;
  const reviews = props.reviews;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = Math.round(total / reviews.length);
  const starsArr = [];
  const quantityMenu = [];

  for (let i = 1; i <= 5; i++){
    if (i <= average) starsArr.push(<i key = {i} className="fa fa-star" aria-hidden="true" />);
    else starsArr.push(<i key = {i} className="fa fa-star-o" aria-hidden="true" />);
  }
  for (let i = 0; i <= product.inventory; i++ ) {
    quantityMenu.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
  }


  return (
    <div style={{color: 'white'}}>
      <div className="row">
        <div className="col-xs-4 col-xs-offset-2">
          <img className="img-responsive" src={'/images/main bottles/' + product.image} />
        </div>
        <div className="col-md-4">
          <h2>{product.name}</h2>
          <h3>$ {product.price}</h3>
          <h3>{starsArr}</h3>
          <SelectField
          floatingLabelText="Quantity"
          floatingLabelStyle={{color: 'white'}}
          value={props.quantity}
          onChange={props.handleQuantityChange}
          disabled = {!product.inventory}
          errorText={!product.inventory && 'Out of Stock'}
          >
          {quantityMenu}
          </SelectField>
          <div>
            <RaisedButton
            label="Add to Cart"
            disabled = {!product.inventory}
            onClick = {props.handleAddtoCart}
            primary = {true}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-md-offset-2">
          <Tabs>
            <Tab label="Details" >
              <div>
              {product.description}
              </div>
            </Tab>
            <Tab label="Reviews">
              <div>
              <Reviews reviews ={reviews} />
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="col-md-4">
          <h3> Related Products </h3>
          <MultipleProductsContainer />
        </div>
      </div>
    </div>
  )
}
