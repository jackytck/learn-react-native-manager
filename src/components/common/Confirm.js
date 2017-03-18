import React, { PropTypes } from 'react'
import {
  Text,
  View,
  Modal
} from 'react-native'
import CardSection from './CardSection'
import Button from './Button'

const Confirm = ({ visible, children, onAccept, onDecline }) => {
  const { cardSectionStyle, textStyle, containerStyle } = styles

  return (
    // required to call onRequestClose on Android
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={onAccept}>Yes</Button>
          <Button onPress={onDecline}>No</Button>
        </CardSection>
      </View>
    </Modal>
  )
}

Confirm.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  onAccept: PropTypes.func,
  onDecline: PropTypes.func
}

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
}

export default Confirm
