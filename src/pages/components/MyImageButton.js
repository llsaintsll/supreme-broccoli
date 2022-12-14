import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const MyImageButton = (props) => {

    return (
         <TouchableOpacity
              style={[styles.button, {backgroundColor: props.btnColor}]}
              onPress={props.customClick}>

             <Icon style={styles.icon}
                   name={props.btnIcon} size={30} color='white'/>

             <Text style={styles.text}>
                 {props.title}
             </Text>
         </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        color: '#ffffff',
        padding: 10,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 100,
    },
    text: {
        color: '#ffffff',
    },
    icon: {
        paddingBottom: 5,
    }
});

export default MyImageButton;