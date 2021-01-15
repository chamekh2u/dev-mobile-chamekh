import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout } from '@ui-kitten/components';
import ListTest from './List.component';
import {fakeItems} from '../helpers/fakeItems';

/* const data = new Array(8).fill({

    title: 'Title for Item',
    description: 'Description for Item',
  }); */
  

export const HomeScreen = ({ navigation }) => {

   
  const navigateDetails = () => {
    const test = "test Route param"
    navigation.navigate('Details', {test});
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
  
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center' }}>
        <Button onPress={navigateDetails}>OPEN DETAILs</Button>
        <ListTest data={fakeItems} isFavorisList={false}/>
      </Layout>
    </SafeAreaView>
  );
};