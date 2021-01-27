import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../store';
import Modal from 'react-native-modal';
import {Appbar} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const GoalsPage = (props) => {
  const [globalState, dispatch] = store();
  const {currentUser} = globalState;

  const [isModalVisible, setModalVisible] = useState(false);
  const [clickedOnGoal, setClickedOnGoal] = useState(false);
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  let fullWidth = Dimensions.get('window').height;
  const signOut = () => {
    setModalVisible(!isModalVisible);
    dispatch({type: 'LOGOUT_USER'});
  };

  const [fieldValues, setFieldValues] = useState({
    dailyGoal: '',
    weeklyGoal: '',
    monthlyGoal: '',
    yearlyGoal: '',
  });

  const updateDailyGoal = (e) => {
    setFieldValues({
      ...fieldValues,
      dailyGoal: e,
    });
  };

  const updateWeeklyGoal = (e) => {
    setFieldValues({
      ...fieldValues,
      weeklyGoal: e,
    });
  };

  const updateMonthlyGoal = (e) => {
    setFieldValues({
      ...fieldValues,
      monthlyGoal: e,
    });
  };
  const updateYearlyGoal = (e) => {
    setFieldValues({
      ...fieldValues,
      yearlyGoal: e,
    });
  };
  const {dailyGoal, weeklyGoal, monthlyGoal, yearlyGoal} = fieldValues;
  const onSave = async () => {
    try {
      dispatch({
        type: 'UPDATE_GOALS',
        payload: {
          dailyGoal,
          weeklyGoal,
          monthlyGoal,
          yearlyGoal,
          id: currentUser.id,
          email: currentUser.email,
        },
      });
      const jsonGoals = JSON.stringify(fieldValues);
      console.log('json', jsonGoals);
      await AsyncStorage.setItem('userGoals', jsonGoals);
    } catch (e) {}
  };

  const getGoals = async () => {
    try {
      const jsonGoals = await AsyncStorage.getItem('userGoals');
      if (jsonGoals !== null) {
        return await JSON.parse(jsonGoals);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function grabGoals() {
      const goals = await getGoals();
      setFieldValues(goals);
    }
    async function setGoals() {
      await onSave();
    }
    grabGoals();
    return () => {
      setGoals();
    };
  }, []);

  const customModal = (props) => {
    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text> WANT MORE INFO ON YOUR LIFE COACH? </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut}>
            <Text> SIGN OUT </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Goals" />
          <Appbar.Action
            icon={MORE_ICON}
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}
          />
        </Appbar.Header>
        {customModal(props)}
        <KeyboardAwareScrollView
          contentContainerStyle={styles.goals}
          extraScrollHeight={75}
          scrollEnabled={false}>
          <View>
            <View style={styles.goalContainer}>
              <Text style={styles.goalLabels}>Daily Goal:</Text>
              <TextInput
                onTouchStart={() => setClickedOnGoal(true)}
                style={styles.usergoals}
                value={dailyGoal}
                placeholder="What is something you want to do every day?"
                onChangeText={updateDailyGoal}
                onEndEditing={() => {
                  setClickedOnGoal(false);
                }}
              />
            </View>
            <View style={styles.goalContainer}>
              <Text style={styles.goalLabels}>Weekly Goal:</Text>
              <TextInput
                onTouchStart={() => setClickedOnGoal(true)}
                style={styles.usergoals}
                value={weeklyGoal}
                placeholder="What is something you want to do every week?"
                onChangeText={updateWeeklyGoal}
                onEndEditing={() => {
                  setClickedOnGoal(false);
                }}
              />
            </View>
            <View style={styles.goalContainer}>
              <Text style={styles.goalLabels}>Monthly Goal:</Text>
              <TextInput
                onTouchStart={() => setClickedOnGoal(true)}
                style={styles.usergoals}
                value={monthlyGoal}
                placeholder="What is something you want to do every month?"
                onChangeText={updateMonthlyGoal}
                onEndEditing={() => {
                  setClickedOnGoal(false);
                }}
              />
            </View>
            <View style={styles.goalContainer}>
              <Text style={styles.goalLabels}>Yearly Goal:</Text>
              <TextInput
                onTouchStart={() => setClickedOnGoal(true)}
                style={styles.usergoals}
                value={yearlyGoal}
                placeholder="What is something you want to do every year?"
                onChangeText={updateYearlyGoal}
                onEndEditing={() => {
                  setClickedOnGoal(false);
                }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};
const {width, height} = Dimensions.get('window');
export default GoalsPage;
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  goalContainer: {
    margin: 50,
  },
  goals: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  usergoals: {
    fontFamily: 'Futura',
  },
  goalLabels: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  modal: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: height / 6,
  },
  issueButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  appbar: {
    backgroundColor: '#00BFFF',
  },
});
