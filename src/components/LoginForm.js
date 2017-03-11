import React, { Component, PropTypes } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import {
  emailChanged,
  passwordChanged,
  loginUser
} from '../actions'
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner
} from './common'

class LoginForm extends Component {
  onEmailChange (text) {
    this.props.emailChanged(text.toLowerCase())
  }

  onPasswordChange (text) {
    this.props.passwordChanged(text)
  }

  onButtonPress () {
    const { email, password } = this.props

    this.props.loginUser({ email, password })
  }

  renderButton () {
    if (this.props.loading) {
      return <Spinner size='large' />
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )
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
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  emailChanged: PropTypes.func,
  loading: PropTypes.bool,
  passwordChanged: PropTypes.func,
  loginUser: PropTypes.func
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth
  return {
    email,
    password,
    error,
    loading
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(LoginForm)
