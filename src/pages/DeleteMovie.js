import React, {useState} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {DatabaseConnection} from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const DeleteMovie = ({navigation}) => {
    let [inputMovieId, setInputMovieId] = useState('');

    let deleteMovie = () => {
        db.transaction((tx) => {
            tx.executeSql(
                 'DELETE FROM  table_movie where movie_id=?',
                 [inputMovieId],
                 (tx, results) => {
                     console.log('Results', results.rowsAffected);
                     if (results.rowsAffected > 0) {
                         Alert.alert(
                              'Sucesso',
                              'Filme Excluído com Sucesso !',
                              [
                                  {
                                      text: 'Ok',
                                      onPress: () => navigation.navigate('HomeScreen'),
                                  },
                              ],
                              {cancelable: false}
                         );
                     } else {
                         alert('Por favor entre com um código de Filme válido !');
                     }
                 }
            );
        });
    };

    return (
         <SafeAreaView style={{flex: 1}}>
             <View style={{flex: 1, backgroundColor: 'white'}}>
                 <View style={{flex: 1}}>
                     <Mytextinput
                          placeholder="Entre com o Código do Filme"
                          onChangeText={
                              (inputMovieId) => setInputMovieId(inputMovieId)
                          }
                          style={{padding: 10}}
                     />
                     <Mybutton title="Excluir Resenha" customClick={deleteMovie}/>
                 </View>
             </View>
         </SafeAreaView>
    );
};

export default DeleteMovie;