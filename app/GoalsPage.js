import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Platform,
} from 'react-native';

const GoalsPage = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Goals!</Text>
    </View>
  );
};

export default GoalsPage;
const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  appbar: {
    backgroundColor: '#00BFFF',
  },
});
