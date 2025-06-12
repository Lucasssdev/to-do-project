import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "./style";

interface SearchBarProps {
  onSearch: (text: string) => void;
  placeholder?: string;
  extraInfo?: React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Pesquisar tarefas...",
  extraInfo,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {extraInfo && <View style={styles.extraInfoContainer}>{extraInfo}</View>}
    </View>
  );
};

export default SearchBar;
