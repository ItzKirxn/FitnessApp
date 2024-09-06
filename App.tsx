import { StatusBar } from 'expo-status-bar';
import { SetStateAction, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableHighlight } from 'react-native';
import { Picker } from "@react-native-picker/picker";

// Define the type for workout details
export type WorkOutDetails = {
  WorkOut_Name: string;
  duration: number;
  exercise_Type: string;
  calories: number;
};

export default function App() {
  // Default workout data
  const [workouts, setWorkOuts] = useState<WorkOutDetails[]>([
    { WorkOut_Name: "Russian twists", duration: 2, exercise_Type: "Cardio", calories: 75 },
    { WorkOut_Name: "Jumping Jacks", duration: 50, exercise_Type: "Cardio", calories: 50 },
    { WorkOut_Name: "Push-ups", duration: 10, exercise_Type: "Strength", calories: 100 },
  ]);

  // States for user input
  const [WorkOutName, setWorkOutName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [exerciseType, setType] = useState<string>('');
  const [calories, setCalories] = useState<string>('');

  // Predefined exercise types
  const ExerciseType = ['Cardio', 'Strength', 'Flexibility', 'Balance', 'HIIT'];

  // Function to add a workout to the list
  const handleSubmit = () => {
    if (WorkOutName && duration && exerciseType && calories) {
      const newWorkout: WorkOutDetails = {
        WorkOut_Name: WorkOutName,
        duration: parseInt(duration),
        exercise_Type: exerciseType,
        calories: parseInt(calories),
      };
      setWorkOuts([...workouts, newWorkout]);

      // Reset the input fields after adding a workout
      setWorkOutName('');
      setDuration('');
      setType('');
      setCalories('');
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Fitness Tracker</Text>
      </View>

      {/* List of workouts */}
      <FlatList
        style={styles.listStyle}
        data={workouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.workoutName}>Workout Name: {item.WorkOut_Name}</Text>
            <Text style={styles.otherDetails}>Duration: {item.duration} min</Text>
            <Text style={styles.otherDetails}>Workout Type: {item.exercise_Type}</Text>
            <Text style={styles.otherDetails}>Calories Burnt: {item.calories}</Text>
          </View>
        )}
      />

      {/* Input fields */}
      <View style={styles.userInputView}>
        <TextInput
          style={styles.input}
          placeholder="Workout Name"
          value={WorkOutName}
          onChangeText={setWorkOutName}
        />

        <TextInput
          style={styles.input}
          placeholder="Duration (min)"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />

        <Picker
          selectedValue={exerciseType}
          onValueChange={(itemValue: SetStateAction<string>) => setType(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="Select Workout Type" value="" />
          {ExerciseType.map((type) => (
            <Picker.Item label={type} value={type} key={type} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Calories Burnt"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />

        {/* Add workout button */}
        <TouchableHighlight onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

// Style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  itemContainer: {
    backgroundColor: '#C3B1E1',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  otherDetails: {
    fontSize: 16,
  },
  listStyle: {
    maxHeight: 400,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  userInputView: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#001418',
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 16,
  },
  inputPicker: {
    backgroundColor: 'white',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#C3B1E1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
