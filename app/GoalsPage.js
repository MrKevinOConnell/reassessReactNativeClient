import React, {useState, useRef, useEffect, useCallback} from 'react';
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
    dailyGoals: '',
    weeklyGoals: '',
    monthlyGoals: '',
    yearlyGoals: '',
  });

  const goalsRef = useRef();

  goalsRef.current = fieldValues;

  const updateDailyGoal = (e) => {
    setFieldValues({
      ...fieldValues,
      dailyGoals: e,
    });
  };

  const updateWeeklyGoal = (e) => {
    setFieldValues({
      ...fieldValues,
      weeklyGoals: e,
    });
  };

  const updateMonthlyGoal = (e) => {
    setFieldValues({
      ...fieldValues,
      monthlyGoals: e,
    });
  };
  const updateYearlyGoal = (e) => {
    setFieldValues({
      ...fieldValues,
      yearlyGoals: e,
    });
  };

  const {dailyGoals, weeklyGoals, monthlyGoals, yearlyGoals} = fieldValues;
  const onSave = async () => {
    try {
      dispatch({
        type: 'UPDATE_GOALS',
        payload: {
          dailyGoals: goalsRef.current.dailyGoals.split(','),
          weeklyGoals: goalsRef.current.weeklyGoals.split(','),
          monthlyGoals: goalsRef.current.monthlyGoals.split(','),
          yearlyGoals: goalsRef.current.yearlyGoals.split(','),
          id: currentUser.id,
          email: currentUser.email,
        },
      });
      const user = JSON.stringify(goalsRef.current);
      await AsyncStorage.setItem('goals', user);
    } catch (e) {}
  };

  const getGoals = async () => {
    try {
      const user = await AsyncStorage.getItem('goals');
      if (user) {
        const goals = JSON.parse(user);
        setFieldValues(goals);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    async function grabGoals() {
      await getGoals();
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
              <Text style={styles.goalLabels}>Daily Goals:</Text>
              <TextInput
                onTouchStart={() => setClickedOnGoal(true)}
                multiline={true}
                style={styles.usergoals}
                value={dailyGoals}
                placeholder="get up at 8AM."
                onChangeText={updateDailyGoal}
                onEndEditing={() => {
                  setClickedOnGoal(false);
                }}
              />
            </View>
            <View style={styles.goalContainer}>
              <Text style={styles.goalLabels}>Weekly Goals:</Text>
              <TextInput
                onTouchStart={() => setClickedOnGoal(true)}
                multiline={true}
                style={styles.usergoals}
                value={weeklyGoals}
                placeholder="Work out two days, reach out to 4 people."
                onChangeText={updateWeeklyGoal}
                onEndEditing={() => {
                  setClickedOnGoal(false);
                }}
              />
            </View>
            <View style={styles.goalContainer}>
              <Text style={styles.goalLabels}>Monthly Goals:</Text>
              <TextInput
                multiline={true}
                onTouchStart={() => setClickedOnGoal(true)}
                style={styles.usergoals}
                value={monthlyGoals}
                placeholder="Hang out with my friends three times, reach out to acquaintances 4 times."
                onChangeText={updateMonthlyGoal}
                onEndEditing={() => {
                  setClickedOnGoal(false);
                }}
              />
            </View>
            <View style={styles.goalContainer}>
              <Text style={styles.goalLabels}>Yearly Goals:</Text>
              <TextInput
                onTouchStart={() => setClickedOnGoal(true)}
                multiline={true}
                style={styles.usergoals}
                value={yearlyGoals}
                placeholder="DOTS,idk"
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
    backgroundColor: '#F5FCFF',
  },
  usergoals: {
    fontFamily: 'Futura',
    textAlign: 'left',
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
