import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, View,} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {DatabaseConnection} from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdateMovie = ({navigation}) => {
    let [inputMovieId, setInputMovieId] = useState('');
    let [MovieName, setMovieName] = useState('');
    let [MovieStars, setMovieStars] = useState('');
    let [MovieResenha, setMovieResenha] = useState('');

    let updateAllStates = (name, stars, resenha) => {
        setMovieName(name);
        setMovieStars(stars);
        setMovieResenha(resenha);
    };

    let searchMovie = () => {
        console.log(inputMovieId);
        db.transaction((tx) => {
            tx.executeSql(
                 'SELECT * FROM table_movie where movie_id = ?',
                 [inputMovieId],
                 (tx, results) => {
                     var len = results.rows.length;
                     if (len > 0) {
                         let res = results.rows.item(0);
                         updateAllStates(
                              res.movie_name,
                              res.movie_stars,
                              res.movie_resenha
                         );
                     } else {
                         alert('Filme não encontrado!');
                         updateAllStates('', '', '');
                     }
                 }
            );
        });
    };
    let updateMovie = () => {
        console.log(inputMovieId, MovieName, MovieStars, MovieResenha);

        if (!inputMovieId) {
            alert('Por Favor informe o Código!');
            return;
        }
        if (!MovieName) {
            alert('Por favor informe o Nome !');
            return;
        }
        if (!MovieStars) {
            alert('Por Favor informe o numero de estrelas !');
            return;
        }
        if (!MovieResenha) {
            alert('Por Favor informe o inicio da resenha !');
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                 'UPDATE table_movie set movie_name=?, movie_stars=? , movie_resenha=? where movie_id=?',
                 [MovieName, MovieStars, MovieResenha, inputMovieId],
                 (tx, results) => {
                     console.log('Results', results.rowsAffected);
                     if (results.rowsAffected > 0) {
                         Alert.alert(
                              'Sucesso',
                              'Filme atualizado com sucesso !!',
                              [
                                  {
                                      text: 'Ok',
                                      onPress: () => navigation.navigate('HomeScreen'),
                                  },
                              ],
                              {cancelable: false}
                         );
                     } else alert('Erro ao atualizar o dados do Filme');
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
                             <Mytext text="Filtro de Filme"/>
                             <Mytextinput
                                  placeholder="Entre com o Código do Filme"
                                  style={{padding: 10}}
                                  onChangeText={
                                      (inputMovieId) => setInputMovieId(inputMovieId)
                                  }
                             />
                             <Mybutton
                                  title="Buscar Filme"
                                  customClick={searchMovie}
                             />
                             <Mytextinput
                                  placeholder="Entre com o Nome do filme"
                                  value={MovieName}
                                  style={{padding: 10}}
                                  onChangeText={
                                      (MovieName) => setMovieName(MovieName)
                                  }
                             />
                             <Mytextinput
                                  placeholder="Entre com a quantidade de estrelas"
                                  value={'' + MovieStars}
                                  onChangeText={
                                      (MovieStars) => setMovieStars(MovieStars)
                                  }
                                  maxLength={10}
                                  style={{padding: 10}}
                                  keyboardType="numeric"
                             />
                             <Mytextinput
                                  value={MovieResenha}
                                  placeholder="Entre com a resenha"
                                  onChangeText={
                                      (MovieResenha) => setMovieResenha(MovieResenha)
                                  }
                                  maxLength={225}
                                  numberOfLines={5}
                                  multiline={true}
                                  style={{textAlignVertical: 'top', padding: 10}}
                             />
                             <Mybutton
                                  title="Atualizar Filme"
                                  customClick={updateMovie}
                             />
                         </KeyboardAvoidingView>
                     </ScrollView>
                 </View>
             </View>
         </SafeAreaView>
    );
};

export default UpdateMovie;