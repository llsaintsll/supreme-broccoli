import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, View,} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {DatabaseConnection} from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const RegisterMovie = ({navigation}) => {
    let [MovieName, setMovieName] = useState('');
    let [MovieStars, setMovieStars] = useState('');
    let [MovieResenha, setMovieResenha] = useState('');

    let register_user = () => {
        console.log(MovieName, MovieStars, MovieResenha);

        if (!MovieName) {
            alert('Por favor preencha o nome !');
            return;
        }
        if (!MovieStars) {
            alert('Por favor preencha o contato');
            return;
        }
        if (!MovieResenha) {
            alert('Por favor preencha o endereço !');
            return;
        }

        db.transaction(function (tx) {
            tx.executeSql(
                 'INSERT INTO table_movie (movie_name, movie_stars, movie_resenha) VALUES (?,?,?)',
                 [MovieName, MovieStars, MovieResenha],
                 (tx, results) => {
                     console.log('Results', results.rowsAffected);
                     if (results.rowsAffected > 0) {
                         Alert.alert(
                              'Sucesso',
                              'Filme Registrado com Sucesso !!!',
                              [
                                  {
                                      text: 'Ok',
                                      onPress: () => navigation.navigate('HomeScreen'),
                                  },
                              ],
                              {cancelable: false}
                         );
                     } else alert('Erro ao tentar Registrar o Filme !!!');
                 }
            );
        });
    };

    return (
         <SafeAreaView style={{flex: 1}}>
             <View style={{flex: 1, backgroundColor: 'white'}}>
                 <View style={{flex: 1}}>
                     <ScrollView keyboardShouldPersistTaps="handled">
                         <KeyboardAvoidingView
                              behavior="padding"
                              style={{flex: 1, justifyContent: 'space-between'}}>
                             <Mytextinput
                                  placeholder="Nome do Filme"
                                  onChangeText={
                                      (MovieName) => setMovieName(MovieName)
                                  }
                                  style={{padding: 10}}
                             />
                             <Mytextinput
                                  placeholder="Quantas estrelas para este filme?"
                                  onChangeText={
                                      (MovieStars) => setMovieStars(MovieStars)
                                  }
                                  maxLength={10}
                                  keyboardType="numeric"
                                  style={{padding: 10}}
                             />
                             <Mytextinput
                                  placeholder="Resenha"
                                  onChangeText={
                                      (MovieResenha) => setMovieResenha(MovieResenha)
                                  }
                                  maxLength={225}
                                  numberOfLines={5}
                                  multiline={true}
                                  style={{textAlignVertical: 'top', padding: 10}}
                             />
                             <Mybutton title="Salvar" customClick={register_user}/>
                         </KeyboardAvoidingView>
                     </ScrollView>
                 </View>
             </View>
         </SafeAreaView>
    );
};

export default RegisterMovie;