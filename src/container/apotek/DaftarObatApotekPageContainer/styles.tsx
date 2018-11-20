import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	header: {
		padding: 30,
		alignItems: "center",
		backgroundColor: "#00BFFF",
	},
	headerTitle: {
		fontSize: 30,
		color: "#696969",
		marginTop: 10,
	},
	name: {
		fontSize: 22,
		color: "#FFFFFF",
		fontWeight: "600",
	},
	postContent: {
		flex: 1,
		padding: 30,
	},
	postTitle: {
		fontSize: 26,
		fontWeight: "600",
	},
	postDescription: {
		fontSize: 16,
		marginTop: 10,
	},
	tags: {
		color: "#00BFFF",
		marginTop: 10,
	},
	date: {
		color: "#696969",
		marginTop: 10,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 35,
		borderWidth: 4,
		borderColor: "#00BFFF",
	},
	profile: {
		flexDirection: "row",
		marginTop: 20,
	},
	shareButton: {
		marginTop: 10,
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	shareButtonText: {
		color: "#FFFFFF",
		fontSize: 20,
	},
	view1: {
		flex: 1,
		// width: 500,
		height: 30,
		// alignItems: "flex-start",
		flexDirection: "row",
		margin: 10,
	},
	view2: {
		// flex: 1,
		width: 100,
		// height: 100,
		margin: 10,
	},
});
export default styles;
