import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { emailChanged } from '../actions'
import {
  Card,
  CardSection,
  Input,
  Button
} from './common'

class LoginForm extends Component {
  onEmailChange (text) {
    this.props.emailChanged(text.toLowerCase())
  }

  render () {
    return (
      <Card>
        <CardSection>
          <Input
            label='Email'
            placeholder='email@gmail.com'
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label='Password'
            placeholder='password'
          />
        </CardSection>

        <CardSection>
          <Button>
            Login
          </Button>
        </CardSection>
      </Card>
    )
  }
}

LoginForm.propTypes = {
  email: PropTypes.string,
  emailChanged: PropTypes.func
}

const mapStateToProps = state => {
  return {
    email: state.auth.email
  }
}

export default connect(mapStateToProps, { emailChanged })(LoginForm)
