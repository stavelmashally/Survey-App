import React from 'react'
import {useDispatch} from 'react-redux'
import {handleToken} from '../actions'
import StripeCheckout from 'react-stripe-checkout'

const Payments = () => {
  const dispatch = useDispatch()

  return (
    <StripeCheckout
      name="Survey App"
      description="5$ for 5 surveys credits"
      amount={500}
      token={token => dispatch(handleToken(token))}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  )
}

export default Payments
