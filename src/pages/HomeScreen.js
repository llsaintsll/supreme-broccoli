import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import MyImageButton from './components/MyImageButton';
import {DatabaseConnection} from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({navigation}) => {
    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                 "SELECT name FROM sqlite_master WHERE type='table' AND name='table_movie'",
                 [],
                 function (tx, res) {
                     console.log('item:', res.rows.length);
                     if (res.rows.length === 0) {
                         txn.executeSql('DROP TABLE IF EXISTS table_movie', []);
                         txn.executeSql(
                              'CREATE TABLE IF NOT EXISTS table_movie(movie_id INTEGER PRIMARY KEY AUTOINCREMENT, movie_name VARCHAR(20), movie_stars INT(10), movie_resenha VARCHAR(255))',
                              []
                         );
                     }
                 }
            );
        });
    }, []);

    return (
         <SafeAreaView style={{flex: 1}}>
             <View style={{flex: 1, backgroundColor: 'white'}}>
                 <View style={{flex: 1}}>
                     <View style={{flex: 1}}>

                         <MyImageButton
                              title="Cadastrar Novo Filme"
                              btnColor='#2992C4'
                              btnIcon="filmstrip"
                              customClick={() => navigation.navigate('Register')}
                         />

                         <MyImageButton
                              title="Atualizar Resenha"
                              btnColor='#A45BB9'
                              btnIcon="movie-edit-outline"
                              customClick={() => navigation.navigate('Update')}
                         />

                         <MyImageButton
                              title="Visualizar Resenha"
                              btnColor='#F9AD29'
                              btnIcon="movie-search-outline"
                              customClick={() => navigation.navigate('View')}
                         />
                         <MyImageButton
                              title="Visualizar Todos"
                              btnColor='#384F62'
                              btnIcon="movie-roll"
                              customClick={() => navigation.navigate('ViewAll')}
                         />
                         <MyImageButton
                              title="Excluir Resenha"
                              btnColor='#D1503A'
                              btnIcon="movie-remove-outline"
                              customClick={() => navigation.navigate('Delete')}
                         />
                     </View>
                 </View>


             </View>
         </SafeAreaView>
    );
};

export default HomeScreen;