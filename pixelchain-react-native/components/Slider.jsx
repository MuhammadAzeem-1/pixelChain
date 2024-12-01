import { View, Text, TouchableOpacity } from "react-native";

const Tabs = [
  {
    index: 1,
    title: "images",
  },
  {
    index: 2,
    title: "files",
  },
  {
    index: 3,
    title: "folders",
  },
];

const Slider = ({ setIsTabSelected, isTabSelected }) => {
  return (
    <View className="flex justify-between items-center flex-row gap-2 mx-4">
      {Tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab.index}
          onPress={() => setIsTabSelected(tab.title)}
          className={`flex justify-center items-center px-5 py-1 border border-blue-400 bg-blue-200 rounded-full ${isTabSelected === tab.title && "bg-blue-400"}`}
        >
          <Text className={`${isTabSelected === tab.title && "text-white" } font-medium text-sm capitalize`}>{tab.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Slider;
