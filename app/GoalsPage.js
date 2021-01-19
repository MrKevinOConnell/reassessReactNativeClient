import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Platform,
  Dimensions,
} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';

const GoalsPage = (props) => {
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const _handleMore = () => console.log('more');
  let fullWidth = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Goals" />
        <Appbar.Action
          icon={MORE_ICON}
          onPress={() => {
            _handleMore;
          }}
        />
      </Appbar.Header>
      <View style={styles.goals}>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Daily Goal:</Text>
        <Text style={{fontFamily: "Futura",}}>To build an app</Text>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Weekly Goal:</Text>
        <Text style={{fontFamily: "Futura",}}>To get laid</Text>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Monthly Goal:</Text>
        <Text style={{fontFamily: "Futura",}}>To not suck at coding</Text>
         <Text style={{fontWeight: 'bold', fontSize: 25}}>Yearly Goal:</Text>
        <Text style={{fontFamily: "Futura",}}>me make lots of money</Text>
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('window');
export default GoalsPage;
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 10,
  },
  goals: {
    height: height/1.3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  appbar: {
    backgroundColor: '#00BFFF',
  },
});
