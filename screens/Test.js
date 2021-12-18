import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, SafeAreaView, Pressable, TouchableOpacity, route } from 'react-native'

function Test ({navigation, route}) {

    const {ajdi} = route.params
    console.log(ajdi)
    const questions = [
        {
          questionText: ' Która góra świata jest najwyższa?',
          answerOptions: [
            { answerText: 'Mount Blanc', isCorrect: false },
            { answerText: 'Mount Everest', isCorrect: true },
            { answerText: 'K2', isCorrect: false },
            { answerText: 'Kilimandżaro', isCorrect: false },
          ],
        },
        {
          questionText: 'Jaka jest najdłuższa rzeka w Europie?',
          answerOptions: [
            { answerText: 'Sekwana', isCorrect: false },
            { answerText: 'Wołga', isCorrect: true },
            { answerText: 'Wisła', isCorrect: false },
            { answerText: 'Dunaj', isCorrect: false },
          ],
        },
        {
          questionText: 'Jaka jest najdłuższa pustynia świata?',
          answerOptions: [
            { answerText: 'Atacama', isCorrect: false },
            { answerText: 'Gobi', isCorrect: false },
            { answerText: 'Sahara', isCorrect: true },
            { answerText: 'Pustynia Arabska', isCorrect: false },
          ],
        },
        {
          questionText: 'Co nie wchodzi w skład Wielkiej Brytanii?',
          answerOptions: [
            { answerText: 'Anglia', isCorrect: false },
            { answerText: 'Szkocja', isCorrect: false },
            { answerText: 'Walia', isCorrect: false },
            { answerText: 'Islandia', isCorrect: true },
          ],
        },
      ]
    const [isLoading, setLoading] = useState(true);
            const [data2, setData2] = useState([]);

                const getMovies = async () => {


                     try {
                      const response = await fetch(`https://tgryl.pl/quiz/test/${ajdi}`, {
                                              method: 'GET',
                                              headers: {
                                                  'Accept': 'application/json',
                                                  'Content-Type': 'application/json'
                                              },
                                            });
                                            const json = await response.json();
                                            setData2(json);
                                            console.log(json)

                    } catch (error) {
                      console.error(error);
                    } finally {
                      setLoading(false);
                    }

                  }

                  useEffect(() => {
                    getMovies();
                  }, []);



      const [currentQuestion, setCurrentQuestion] = useState(0)
      const [showScore, setShowScore] = useState(false)
      const [score, setScore] = useState(0)
      const handleAnswerButtonClick = (isCorrect) => {
        if (isCorrect === true) {
          setScore(score + 1);
        }

        const nextQuetions = currentQuestion + 1;

        if (nextQuetions < questions.length) {
          setCurrentQuestion(nextQuetions);
        }
        else {

         (async () => {
          const rawResponse = await fetch('https://tgryl.pl/quiz/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick: 'Jan',
                score: 5,
                total: 20,
                type: 'historia'
            })
          });
          const content = await rawResponse.json();

          console.log(content);
          })();


          setShowScore(true)
          navigation.navigate('Results',{
          paramKey: score,})
        }

      }
        console.log(score)
        console.log(JSON.stringify(data2.tasks[0]))
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.numberQuestions}>
                <Text style={styles.textNumberQuestions}> Pytanie {currentQuestion + 1} na {questions.length} </Text>
            </View>
            <View style={styles.Questions}>
                <Text style={styles.textQuestions}> { questions[currentQuestion].questionText } </Text>
            </View>
            <View style={styles.Answer}>
                <Text style={styles.textQuestions}>
                    {questions[currentQuestion].answerOptions.map((answerOptions, pos) =>  (
                    <View key={pos} style={styles.answerView}>
                    <Button color='gray' onPress={() => handleAnswerButtonClick(answerOptions.isCorrect)}
                    title={answerOptions.answerText} />
                    </View>
                ))} </Text>
                <Text style={styles.textLiczba}> Liczba zdobytych punktów: {score} </Text>
            </View>
        </SafeAreaView>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'#8FBC8F',
  },
  numberQuestions: {
    backgroundColor:'#dc143c',
    flex:0.3,
    margin:10,
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
  textNumberQuestions: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Questions: {
    backgroundColor:'#b8860b',
    margin:10,
    marginLeft:22,
    flex:0.2,
    height:50,
    width:350,
    alignItems:'center',
    justifyContent:'center'
  },
  textQuestions: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  Answer: {
    backgroundColor:'#b8860b',
    margin:10,
    marginLeft:30,
    flex:1,
    height:250,
    width:330,
    alignItems:'center',
    justifyContent:'center'

  },
  answerView:{
    width:250,
    height:80,
  },
  textLiczba:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'white'
  }
});

export default Test;