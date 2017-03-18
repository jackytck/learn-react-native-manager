import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { each } from 'lodash'
import Communications from 'react-native-communications'
import {
  Card,
  CardSection,
  Button
} from './common'
import {
  employeeUpdate,
  employeeSave
} from '../actions/EmployeeActions'
import EmployeeForm from './EmployeeForm'

class EmployeeEdit extends Component {
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
  employeeSave: PropTypes.func
}

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave
})(EmployeeEdit)
