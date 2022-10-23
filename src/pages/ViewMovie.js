import React, {useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {DatabaseConnection} from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewMovie = () => {
    let [inputMovieId, setInputMovieId] = useState('');
    let [movieData, setMovieData] = useState({});

    let searchMovie = () => {
        console.log(inputMovieId);
        setMovieData({});
        db.transaction((tx) => {
            tx.executeSql(
                 'SELECT * FROM table_movie where movie_id = ?',
                 [inputMovieId],
                 (tx, results) => {
                     var len = results.rows.length;
                     console.log('len', len);
                     if (len > 0) {
                         setMovieData(results.rows.item(0));
                     } else {
                         alert('Filme não encontrado !');
                     }
                 }
            );
        });
    };

    return (
         <SafeAreaView style={{flex: 1}}>
             <View style={{flex: 1, backgroundColor: 'white'}}>
                 <View style={{flex: 1}}>
                     <Mytext text="Filtro de Filme"/>
                     <Mytextinput
                          placeholder="Entre com o Código do Filme"
                          onChangeText={
                              (inputMovieId) => setInputMovieId(inputMovieId)
                          }
                          style={{padding: 10}}
                     />
                     <Mybutton title="Buscar Filme" customClick={searchMovie}/>
                     <View
                          style={{
                              marginLeft: 35,
                              marginRight: 35,
                              marginTop: 10
                          }}>
                         <Text>Código : {movieData.movie_id}</Text>
                         <Text>Nome : {movieData.movie_name}</Text>
                         <Text>Estrelas : {movieData.movie_stars}</Text>
                         <Text>Resenha : {movieData.movie_resenha}</Text>
                     </View>
                 </View>
             </View>
         </SafeAreaView>
    );
};

export default ViewMovie;