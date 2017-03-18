import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { each } from 'lodash'
import Communications from 'react-native-communications'
import {
  Card,
  CardSection,
  Button,
  Confirm
} from './common'
import {
  employeeUpdate,
  employeeSave,
  employeeDelete
} from '../actions/EmployeeActions'
import EmployeeForm from './EmployeeForm'

class EmployeeEdit extends Component {
  state = { showModal: false }

  componentWillMount () {
    each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value })
    })
  }

  onButtonPress () {
    const { name, phone, shift } = this.props
    this.props.employeeSave({
      name,
      phone,
      shift,
      uid: this.props.employee.uid
    })
  }

  onTextPress () {
    const { phone, shift } = this.props

    Communications.text(phone, `Your upcoming shift is on ${shift}.`)
  }

  flipShowModal () {
    this.setState({ showModal: !this.state.showModal })
  }

  onFirePress () {
    this.flipShowModal()
  }

  onAccept () {
    this.props.employeeDelete({ uid: this.props.employee.uid })
  }

  onDecline () {
    this.flipShowModal()
  }

  render () {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onFirePress.bind(this)}>
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm
  return {
    name,
    phone,
    shift
  }
}

EmployeeEdit.propTypes = {
  employee: PropTypes.object,
  name: PropTypes.string,
  phone: PropTypes.string,
  shift: PropTypes.string,
  employeeUpdate: PropTypes.func,
  employeeSave: PropTypes.func,
  employeeDelete: PropTypes.func
}

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave,
  employeeDelete
})(EmployeeEdit)
