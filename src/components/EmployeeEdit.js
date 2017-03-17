import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { each } from 'lodash'
import {
  Card,
  CardSection,
  Button
} from './common'
import { employeeUpdate } from '../actions/EmployeeActions'
import EmployeeForm from './EmployeeForm'

class EmployeeEdit extends Component {
  componentWillMount () {
    each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value })
    })
  }

  onButtonPress () {
    const { name, phone, shift } = this.props
    console.log(name, phone, shift)
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
  employeeUpdate: PropTypes.func
}

export default connect(mapStateToProps, { employeeUpdate })(EmployeeEdit)
