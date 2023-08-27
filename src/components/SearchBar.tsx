import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={28} color="#08BA59" />
      <TextInput
        style={styles.input}
        placeholder="ค้นหาชื่อสินค้า"
        value={searchText}
        onChangeText={(text) => {
          onSearch(text);
          setSearchText(text);
        }}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:10
  },
  input: {
    flex:1,
    backgroundColor: '#fff',
  },
});

export default SearchBar;
